// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import ".FamilyBank.sol";

contract LittleWalletFactory is AccessControl {
    bytes32 public constant CRON_ROLE = keccak256("CRON");

    FamilyBank[] private _families;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createAccount() external onlyRole(DEFAULT_ADMIN_ROLE) {
        FamilyBank family = new FamilyBank(
            name,
            msg.sender
        );
        _families.push(family);
    }

    // items to buy

    function runAllowences() external onlyRole(CRON_ROLE) {
        require(condition);
       
       //.safeTransferFrom(msg.sender, address(this), _amount);
    }
}