// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract LoanContract {
    struct Loan {
        uint loanAmount;
        uint interestRate;
        uint tenure;
        string purpose;
        uint createdAt;
        address borrower;
        bool isActive;
    }

    Loan public loan;

    event LoanCreated(
        uint loanAmount,
        uint interestRate,
        uint tenure,
        string purpose,
        uint createdAt,
        address indexed borrower
    );

    constructor(
        uint _loanAmount,
        uint _interestRate,
        uint _tenure,
        string memory _purpose
    ) {
        loan = Loan({
            loanAmount: _loanAmount,
            interestRate: _interestRate,
            tenure: _tenure,
            purpose: _purpose,
            createdAt: block.timestamp,
            borrower: msg.sender,
            isActive: true
        });

        emit LoanCreated(_loanAmount, _interestRate, _tenure, _purpose, block.timestamp, msg.sender);
    }

    function getLoanDetails() public view returns (Loan memory) {
        return loan;
    }

    function closeLoan() public {
        require(msg.sender == loan.borrower, "Only borrower can close loan");
        require(loan.isActive, "Loan is already closed");

        loan.isActive = false;
    }
}
