pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20, ERC20Detailed {
    constructor(uint initialSupply) ERC20Detailed("Padma Aqua-Token", "MAA", 0) public {
        _mint(msg.sender, initialSupply);
    }
}
