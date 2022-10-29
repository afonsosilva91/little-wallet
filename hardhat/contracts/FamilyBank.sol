// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FamilyBank is ERC20, Ownable {
    address public parent;
    address public child;

    mapping(address => uint256) invested;
    mapping(address => uint256) borrowed;

    uint256 public investmentInterest;
    uint256 public borrowInterest;
    uint256 public weeklyPayoutAmount = 2000;

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    constructor(address _parent, address _child) ERC20("Dollar", "USD") {
        parent = _parent;
        child = _child;

        _mint(_parent, 6000);

        weeklyPayout();
    }

    function weeklyPayout() public onlyOwner {
        // pay out the weekly allowance minus the debt and interest
        require(balanceOf(parent) >= weeklyPayoutAmount, "FamilyBank: Not enough funds for the payout");

        uint256 payout = weeklyPayoutAmount;
        if (borrowed[child] > 0) {
            payout = payout - investmentInterest * borrowed[child];
        }

        _transfer(parent, child, payout);
    }

    // function invest() {
    //     // locks the money for 1 week
    // }

    // function buyItem() {
    //     // 
    // }
}
