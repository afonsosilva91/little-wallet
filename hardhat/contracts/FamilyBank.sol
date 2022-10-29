// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract FamilyBank is ERC20, AccessControl {
    bytes32 public constant PARENT_ROLE = keccak256("PARENT");

    address public parent;

    struct Person {
        string name;
    }

    mapping(address => Person) children;

    mapping(address => uint256) invested;
    mapping(address => uint256) borrowed;

    uint256 public investmentInterest;
    uint256 public borrowInterest;
    uint256 public weeklyPayoutAmount = 2000;

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    constructor(address _parent) ERC20("Dollar", "USD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PARENT_ROLE, _parent);
        parent = _parent;
        
        _mint(_parent, 6000);

        weeklyPayout();
    }

    function addChild(address _child, string memory name) onlyRole(PARENT_ROLE) {
        children[_child] = true;
    }

    function removeChild(address _child) onlyRole(PARENT_ROLE) {
        children[_child] = false;
    }

    function weeklyPayout() public onlyRole(DEFAULT_ADMIN_ROLE) {
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
