# k-Hacks
# LendWise - P2P Lending Platform

**LendWise** is a decentralized Peer-to-Peer (P2P) lending platform built on the **Ethereum blockchain**, enabling borrowers and lenders to directly connect and transact with transparency, security, and low costs. The platform uses **smart contracts** to automate processes and ensure trust, while offering innovative features to benefit both lenders and borrowers.

---

### **Key Features**:
#### 1. **Cost-Effective**:
   - **Decentralized Nature**: Low gas fees and cost-effective processes, thanks to the decentralized blockchain structure.

#### 2. **Smart Contracts for Transparency**:
   - **Non-Breakable Promises**: Smart contracts enforce lending terms, ensuring transparency and trust between borrowers and lenders.

#### 3. **Thorough Validation**:
   - **Onboarding New Borrowers**: Deep validation of 70+ data points for new borrowers ensures fair and accurate credit assessments.

---

### **USPs of Our P2P Lending Platform**

#### **For Lenders**:
1. **Financial Tools**:
   - **Investment Diversification**: Helps lenders allocate funds across low, medium, and high-risk categories, visualized on a dashboard.
   - **Wealth Builder**: A calculator that projects potential returns, helping lenders with long-term wealth growth.
   - **Risk Tolerance**: Personalized risk assessments to help lenders choose optimal investment strategies.

2. **Reports Generation & Visualization**:
   - **Investment Summary, Earnings Report, EMI Statements, and Income Statement**: Detailed reports for lenders, with easy-to-read visualizations to help them interpret performance and optimize returns.

3. **Wallet with Smart Contract Integration**:
   - **Escrow Accounts**: Smart contracts ensure automated transfers, reducing risks and legal overhead.

4. **Advanced Loan Matching (Hungarian Algorithm)**:
   - **Optimal Loan Matching**: Efficiently allocates funds to borrowers, ensuring better returns and quicker funding.

#### **For Borrowers**:
1. **Alternative Credit Scoring System**:
   - **Inclusive & Transparent**: Based on 70+ data points, this scoring system helps borrowers with no traditional credit history access loans.

2. **Gamification**:
   - **Incentives for Timely Payments**: Points, badges, and rewards for responsible borrowing behavior, with social sharing options.

3. **AI Insights**:
   - **Personalized Financial Insights**: A credit simulator, risk of default percentage, and historical trends help borrowers understand their credit score impact.

4. **Credit Score Simulator**:
   - **Guiding Borrowers**: Borrowers can simulate changes to their credit score based on actions like timely payments, reducing debt, etc. It motivates borrowers by showing potential improvements in their credit score.

5. **Inclusion of Farmers & Villagers**:
   - **Empowering Unseen Communities**: Farmers and villagers, who may not have traditional documents like PAN cards or credit scores, can borrow small amounts by using their **ration card** as identification. This helps them avoid falling into the trap of **loan sharks** offering high-interest loans. The platform provides a **slow and steady repayment plan**, supporting these underserved communities by giving them access to fair credit.
   
---

## Table of Contents:
- [Installation](#installation)
- [Usage](#usage)
- [Contract Deployment](#contract-deployment)
- [Interacting with the Platform](#interacting-with-the-platform)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites:
- Node.js (version 14.x or higher)
- npm or yarn
- MetaMask browser extension (for connecting to the blockchain)

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/LendWise.git
cd LendWise

For the frontend:

cd frontend
npm install

For backend :
cd backend
npm install

 Install Hardhat dependencies for the smart contracts:

cd contracts
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

Set up your .env file:
Create a .env file in the root directory and set the following environment variables:

INFURA_PROJECT_ID=your_infura_project_id
MNEMONIC=your_wallet_mnemonic
MONGO_URI : your_mongo_url
PORT: 3000
