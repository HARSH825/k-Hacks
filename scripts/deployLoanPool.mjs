// scripts/deploy.js

async function main() {
    // Get the contract to deploy
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the LoanPool contract
    const LoanPool = await ethers.getContractFactory("LoanPooling");

    // Define the borrower and total loan amount (example data)
    const borrower = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";  // Replace with actual borrower's address
    const totalLoanAmount = ethers.utils.parseEther("100");  // Example loan amount in ETH

    // Deploy the contract
    const loanPool = await LoanPool.deploy(borrower, totalLoanAmount);

    console.log("LoanPool contract deployed to:", loanPool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
