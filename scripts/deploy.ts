import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    // Deploy the OrganizationRegistry contract
    const OrganizationRegistry = await ethers.getContractFactory("OrganizationRegistry");
    const organizationRegistry = await OrganizationRegistry.deploy();
    await organizationRegistry.waitForDeployment();
    console.log(`OrganizationRegistry deployed to: ${organizationRegistry.target}`);
}


// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
