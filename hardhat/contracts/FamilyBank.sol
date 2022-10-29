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

    mapping(address => Person) public children;

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

        //weeklyPayout();
    }

    function addChild(address _child, string memory name) external onlyRole(PARENT_ROLE) {
        children[_child].name = name;
    }

    function removeChild(address _child) external onlyRole(PARENT_ROLE) {
        delete children[_child];
    }

    function getChild(address _child) external view returns(string memory) {
        return children[_child].name;
    }

    // function invest() {
    //     // locks the money for 1 week
    // }

    // function buyItem() {
    //     // 
    // }
}
