// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";

contract Timelock {
    ERC20Token public token;
    address public beneficiary;
    uint256 public releaseTime;

    event TokensReleased(address indexed beneficiary, uint256 amount);

    constructor(
        ERC20Token _token,
        address _beneficiary,
        uint256 _vestingPeriod
    ) {
        require(
            _beneficiary != address(0),
            "Beneficiary cannot be zero address"
        );
        token = _token;
        beneficiary = _beneficiary;
        releaseTime = block.timestamp + _vestingPeriod;
    }

    function release() public {
        require(block.timestamp >= releaseTime, "Tokens are still locked");
        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "No tokens to release");

        token.transfer(beneficiary, amount);
        emit TokensReleased(beneficiary, amount);
    }
}
