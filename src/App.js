import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { useAccount, useContract, useSigner } from "wagmi";
import {
  getContract,
  getProvider,
  getAccount,
  getSigner,
  readContract,
} from "@wagmi/core";
import { Contract, ethers } from "ethers";

const ERC = require("./ERC20_ABI.json");
const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = "6f3fecf13270f680e07b34ac73092aa6";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  //const { isAccount } = useAccount();
  const contractaddress = "0xfe9eE1E1B5807dD7988C4eeADb85E0F476eEC9A0";
  const provider = getProvider();
  const contract = getContract({
    address: contractaddress,
    abi: ERC,
    signerOrProvider: provider,
  });
  const account = getAccount().address;
  const signer = provider.getSigner();

  console.log({ account });
  //console.log({ contract });

  const Readcontract = async () => {
    // const Conncted = await signer.getAddress();
    const contractEthers = new ethers.Contract(contractaddress, ERC, signer);
    //console.log({ Conncted });

    //const totalsupply = await contractEthers.totalsupply();
    // console.log({ contractEthers });
    // const total = await contractEthers.isAdmin(
    //   "0x5d21B70da363B8cc8b89d93fBF46cDdd527Fb245"
    // );
    // console.log({ total });

    const data = await readContract({
      address: contractaddress,
      abi: ERC,
      functionName: "totalSupply",
    });
    console.log({ data });
  };

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

      <button className="btn" onClick={Readcontract}>
        Readcontract
      </button>
    </>
  );
}
export default App;
