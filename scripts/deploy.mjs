import hardhat from "hardhat"; // Import Hardhat as the default
const { ethers } = hardhat;   // Destructure `ethers` from Hardhat

async function main() {
    const LoanContract = await ethers.getContractFactory("LoanContract");

    // Deploy contract with example loan values
    const loanContract = await LoanContract.deploy(
        1000,         // Loan Amount
        10,           // Interest Rate (10%)
        12,           // Tenure (12 months)
        "Education"   // Purpose
    );

    await loanContract.waitForDeployment();

    console.log(`✅ Loan Contract deployed at: ${loanContract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
