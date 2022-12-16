
// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
// Openzepplin library for creating and transfering ERC20 tokens

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StreaxCoin", "STX") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
  return 16;
}
}

// CONTRACT ADDRESS - 0x900CEF0ECbdd267d8E959C91aA5bF0Bd1b3ae578
// TRANSACTION HASH - 0x33cc38b5ee5d07096c46847b322b9f32ebeaa77e1371f9b56debe051ee9974b1