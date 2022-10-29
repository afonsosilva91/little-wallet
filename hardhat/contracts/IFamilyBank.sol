// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";

interface IFamilyBank is IERC20, IAccessControl {
    bytes32 public constant PARENT_ROLE = keccak256("PARENT");

    function addChild(address _child, string memory name) external;
    function removeChild(address _child) external;
    function getChild(address _child) external view returns(string memory);
}
