import { ethers } from "ethers";
import Abi from "./abi.json";

export const getContract = (providerOrSigner) =>
  new ethers.Contract(
    import.meta.env.VITE_vestingDApp_contract_address,
    Abi,
    providerOrSigner
  );

// import { ethers } from "ethers";
// import Abi from "./abi.json";
// import { CHAIN_ID } from "./chains";
// import { PROVIDER_URL } from "./providers";

// const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

// export const getContract = (address) => {
//   return new ethers.Contract(address, Abi, provider.getSigner());
// };

export const CONTRACT_ADDRESS = "0x23ab58e681BB084256B71e8c5E77910E7bcb0372";
