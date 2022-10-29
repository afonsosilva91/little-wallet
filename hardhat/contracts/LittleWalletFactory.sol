// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import ".FamilyBank.sol";

contract LittleWalletFactory is AccessControl {
    bytes32 public constant CRON_ROLE = keccak256("CRON");

    FamilyBank[] private _families;

    address public currentFamily;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createAccount() external onlyRole(DEFAULT_ADMIN_ROLE) {
        FamilyBank family = new FamilyBank(name, msg.sender);
        _families.push(family);
    }

    function setCurrentFamily(address _currentFamily) external onlyRole(DEFAULT_ADMIN_ROLE) {
        currentFamily = _currentFamily;
    }

    function checkAccount(address wallet) external view returns (bool existingAccount, string name, string role) {
        IFamilyBank _familyBank = IFamilyBank(currentFamily);
        
        if (_familyBank.hasRole(_familyBank.PARENT_ROLE, wallet)) {
            return (true, "", "PARENT");
        } else if(children[wallet]) {
            return (true, children[wallet].name, "CHILD");
        }

        return (false, "", "");
    }
}