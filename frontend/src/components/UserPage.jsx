import React, { useState } from "react";
import useClaimTokens from "../hooks/useClaimTokens"
import useWithdrawTokens from "../hooks/useWithdrawTokens";

const UserPage = () => {
  const [orgOwner, setOrgOwner] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState(0);


  const claimTokens = useClaimTokens(orgOwner);
  const withdrawTokens = useWithdrawTokens(amount)

  
  // const connectWallet = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const contractAddress = CONTRACT_ADDRESS;
  //   const organizationRegistryContract = new ethers.Contract(
  //     contractAddress,
  //     OrganizationRegistryABI,
  //     signer
  //   );
  //   setContract(organizationRegistryContract);
  // };

  // const claimTokens = async () => {
  //   if (!contract) return;
  //   try {
  //     const tx = await contract.claimTokens(orgOwner);
  //     await tx.wait();
  //     alert("Tokens claimed successfully");
  //   } catch (error) {
  //     console.error("Error claiming tokens:", error);
  //   }
  // };

  // const withdrawTokens = async (amount) => {
  //   if (!contract) return;
  //   try {
  //     const tx = await contract.withdraw(
  //       ethers.utils.parseUnits(amount, "wei")
  //     );
  //     await tx.wait();
  //     alert("Tokens withdrawn successfully");
  //   } catch (error) {
  //     console.error("Error withdrawing tokens:", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">User Page</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Claim Tokens</h2>
        <input
          type="text"
          placeholder="Organization Owner Address"
          value={orgOwner}
          onChange={(e) => setOrgOwner(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={claimTokens}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Claim
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Withdraw</h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-4 hover:bg-blue-700"
          onClick={() => setIsDialogOpen(true)}
        >
          Withdraw
        </button>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded max-w-md w-full">
              <h2 className="text-xl font-bold mb-2">Withdraw Funds</h2>
              <p className="mb-4">Withdraw funds from the contract</p>

              <div className="flex flex-col gap-3">
                <label>
                  <div className="text-sm font-bold mb-1">Amount</div>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </label>
              </div>

              <div className="flex gap-3 mt-4 justify-end">
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={withdrawTokens}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
