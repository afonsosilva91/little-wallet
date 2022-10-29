// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract FamilyBank is ERC20, AccessControl {
    bytes32 public constant PARENT_ROLE = keccak256("PARENT");
    bytes32 public constant CHILD_ROLE = keccak256("CHILD");

    address public parent;

    struct Person {
        string name;
    }

    struct Investment {
        uint256 principal;
        uint256 interest;
        uint256 unlockTime;
        bool isPaidOut;
    }

    struct Loan {
        uint256 principal;
        uint256 interest;
        uint256 dueTime;
        bool isRepaid;
    }

    mapping(address => Person) children;

    mapping(address => mapping(uint256 => Investment)) investments;
    mapping(address => uint256) investmentCounter;

    mapping(address => mapping(uint256 => Loan)) loans;
    mapping(address => uint256) loanCounter;

    mapping(address => uint256) nextPayoutTime;

    uint256 public investmentInterest = 20;
    uint256 public borrowInterest = 20;
    uint256 public weeklyPayoutAmount = 2000;

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    constructor(address _parent) ERC20("Dollar", "USD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PARENT_ROLE, _parent);
        parent = _parent;
        
        _mint(_parent, 7500);
    }

    function addChild(address _child, string memory name) external onlyRole(PARENT_ROLE) {
        children[_child] = Person(name);
        _grantRole(CHILD_ROLE, _child);
        nextPayoutTime[_child] = block.timestamp;
    }

    function removeChild(address _child) external onlyRole(PARENT_ROLE) {
        delete children[_child];
    }

    function triggerWeeklyPayout(address _child) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || (hasRole(CHILD_ROLE, msg.sender) && msg.sender == _child),
            "Family Bank: Access Denied"
        );
        require(nextPayoutTime[_child] <= block.timestamp, "FamilyBank: Too soon");
        require(balanceOf(parent) >= weeklyPayoutAmount, "FamilyBank: Not enough funds for the payout");

        uint256 payout = weeklyPayoutAmount;
        nextPayoutTime[_child] += 1 weeks;

        _transfer(parent, _child, payout);
    }

    function calculateInvestmentInterest(uint256 _sum) public view returns (uint256) {
        return _sum * investmentInterest / 100;
    }

    function invest(uint256 _sum) external onlyRole(CHILD_ROLE) {
        address child = msg.sender;
        require(balanceOf(child) >= _sum, "FamilyBank: Not enough funds for investment");
        uint256 interest = calculateInvestmentInterest(_sum);
        uint256 unlockDate = block.timestamp + 1 weeks;

        _transfer(child, parent, _sum);

        investments[child][investmentCounter[child]] = Investment(
            _sum,
            interest,
            unlockDate,
            false
        );

        investmentCounter[child]++;
    }

    function withdrawInvestment(address _child, uint256 _investmentId) internal {
        Investment memory investment = investments[_child][_investmentId];
        uint256 sumToPayOut = investment.principal + investment.interest;

        _transfer(parent, _child, sumToPayOut);
    }

    function withdrawInvestments() external onlyRole(CHILD_ROLE) {
        address child = msg.sender;

        for (uint i = 0; i < investmentCounter[child]; i++) {
            if(investments[child][i].isPaidOut == false && investments[child][i].unlockTime <= block.timestamp) {
                withdrawInvestment(child, i);
            } 
        }
    }

    function calculateLoanInterest(uint256 _sum) public view returns (uint256) {
        return _sum * borrowInterest / 100;
    }

    function borrow(uint256 _sum) external onlyRole(CHILD_ROLE) {
        address child = msg.sender;
        uint256 interest = calculateLoanInterest(_sum);
        uint256 repaymentDate = block.timestamp + 1 weeks;

        _transfer(parent, child, _sum);

        loans[child][loanCounter[child]] = Loan(
            _sum,
            interest,
            repaymentDate,
            false
        );

        loanCounter[child]++;
    }
}
