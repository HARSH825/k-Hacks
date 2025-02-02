pragma solidity ^0.8.0;

contract LoanFunding {
    address public borrower; // The borrower receiving the loan
    uint256 public totalLoanAmount; // The total loan amount requested
    uint256 public totalContributed; // Total amount contributed by all lenders
    mapping(address => uint256) public lenderContributions; // Lender address => Contribution amount
    address[] public lenders; // List of all lenders

    // Event emitted when a lender funds the loan
    event LoanFunded(address indexed lender, uint256 amount);

    // Event emitted when the loan is disbursed to the borrower
    event LoanPaidOut(address indexed borrower, uint256 amount);

    constructor(address _borrower, uint256 _totalLoanAmount) {
        borrower = _borrower;
        totalLoanAmount = _totalLoanAmount;
        totalContributed = 0;
    }

    // Function for lenders to contribute to the loan
    function fundLoan() public payable {
        require(msg.value > 0, "Lender must contribute more than zero");
        require(totalContributed < totalLoanAmount, "Loan already fully funded");

        if (lenderContributions[msg.sender] == 0) {
            lenders.push(msg.sender);  // Record new lender
        }

        lenderContributions[msg.sender] += msg.value;
        totalContributed += msg.value;

        emit LoanFunded(msg.sender, msg.value);
    }

    // Function for the borrower to withdraw the loan when it's fully funded
    function disburseLoan() public {
        require(msg.sender == borrower, "Only the borrower can disburse the loan");
        require(totalContributed >= totalLoanAmount, "Loan is not fully funded");

        // Transfer the total loan amount to the borrower
        payable(borrower).transfer(totalLoanAmount);

        // Emit the loan paid-out event
        emit LoanPaidOut(borrower, totalLoanAmount);

        // Reset the loan amount after disbursement
        totalContributed = 0;
    }

    // Function to check how much a lender has contributed
    function getLenderContribution(address lender) public view returns (uint256) {
        return lenderContributions[lender];
    }

    // Function to get the total contributions so far
    function getTotalContributed() public view returns (uint256) {
        return totalContributed;
    }

    // Function to get the list of all lenders
    function getLenders() public view returns (address[] memory) {
        return lenders;
    }
}
