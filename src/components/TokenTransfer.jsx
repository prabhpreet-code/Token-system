import { React, useState } from "react";
import "../styles/TokenTransfer.css";

export default function TokenTransfer(props) {
  const { contract } = props; // destructuring

  const [transferHash, setTransferHash] = useState();

  // Transfering STX tokens from the contract to the reciever address
  const transferHandler = async (e) => {
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    let recieverAddress = e.target.recieverAddress.value;

    let txt = await contract.transfer(recieverAddress, transferAmount);
    console.log(txt);
    setTransferHash("Transfer confirmation hash: " + txt.hash);
  };

  return (
    <div className="TokenTransfer">
      <form onSubmit={transferHandler}>
        <h1> Transfer Coins </h1>
        <p> Reciever Address </p>
        <input type="text" id="recieverAddress" className="" />

        <p> Send Amount </p>
        <input type="number" id="sendAmount" min="0" step="1" />

        <button type="submit" className="buttonSubmit">
          Send
        </button>
        <div>{transferHash}</div>
      </form>
    </div>
  );
}
