// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20Token {
    string public name;
    uint8 public decimals;
    uint256 public totalSupply;
    mapping(address => uint256) public balances;

    constructor(string memory _name, uint8 _decimals) {
        name = _name;
        decimals = _decimals;
        totalSupply = 1000000 * (10 ** _decimals); // 1 million tokens
        balances[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public {
        require(balances[msg.sender] >= _value, "Insufficient balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}
