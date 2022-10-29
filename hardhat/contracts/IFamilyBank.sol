// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

interface IFamilyBank is ERC20, AccessControl {
    bytes32 public constant PARENT_ROLE = keccak256("PARENT");

    address public parent;
    address public child;
    mapping(address => uint256) accounts;

    mapping(address => uint256) invested;
    mapping(address => uint256) borrowed;

    uint256 public investmentInterest;
    uint256 public borrowInterest;
    uint256 public weeklyPayoutAmount = 2000;
}
