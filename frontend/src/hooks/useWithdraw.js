import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

import { getContract, CONTRACT_ADDRESS } from "../constants/contracts";

const useWithdraw = (amount) => {
  //   const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  //const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return useCallback(async () => {
    if (!walletProvider || !amount) {
      setError("Please connect your wallet and enter an amount");
      return;
    }

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    try {
      const contract = getContract(signer);
      const tx = await contract.withdraw(amount);
      await tx.wait();
      console.log("Withdraw successful");
      alert("Withdraw successful");
    } catch (error) {
      console.error("Error withdrawing", error);
    }
  }, [amount]);
};

export default useWithdraw;
