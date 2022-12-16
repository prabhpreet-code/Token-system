import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import MyTokenAbi from "../Contracts/MyTokenAbi.json";
import TokenTransfer from "./TokenTransfer";
import "../styles/TokenCard.css";

function TokenCard() {
  //Deployed contract
  const contractAddress = "0x900CEF0ECbdd267d8E959C91aA5bF0Bd1b3ae578";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [contract, setContract] = useState(null);
  const [tokenName, setTokenName] = useState("Token");
  const [balance, setBalance] = useState(null);

  // for connecting a wallet
  const connectWalletHandler = () => {
    console.log("Connected");
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // updating a newly connected account
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    console.log(newAccount);
    updateEthers();
  };

  // updating the balance of the user
  const updateBalance = async () => {
    let balanceBigN;

    try {
      balanceBigN = await contract.balanceOf(defaultAccount);
    } catch (error) {
      setErrorMessage(error.message);
    }

    let balanceNumber = balanceBigN.toNumber();
    let tokenDecimals;

    try {
      tokenDecimals = await contract.decimals();
    } catch (error) {
      setErrorMessage(error.message);
    }

    let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);
    console.log(balanceNumber);
    console.log(tokenBalance);

    setBalance(toFixed(tokenBalance));
  };

  // Rounding the balance in accordance to given decimal points
  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      let e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      let e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }

  // connecting the contract to frontend
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

    let tempContract = new ethers.Contract(
      contractAddress,
      MyTokenAbi,
      tempSigner
    );
    setContract(tempContract);
  };

  // updating the token name
  const updateTokenName = async () => {
    setTokenName(await contract.name());
  };

  useEffect(() => {
    if (contract != null) {
      updateBalance();
      updateTokenName();
    }
  }, [contract]);

  return (
    <div className="tokenCard">
      <div className="tokenCard__image">
        <div className="buttons">
          <button className="btn-hover color-10" onClick={connectWalletHandler}>
            {connButtonText}
          </button>
        </div>
      </div>
      <div className="tokenCard__copy">
        <h1>Address:</h1>
        <h2>{defaultAccount}</h2>
        <h3>
          {tokenName} Balance: {balance}
        </h3>
        {errorMessage}
        <TokenTransfer contract={contract} />
      </div>
    </div>
  );
}

export default TokenCard;
