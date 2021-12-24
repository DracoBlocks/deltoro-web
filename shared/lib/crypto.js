import Web3 from "web3";
import { Contract } from "../../constants/contract";

const getContract = () => {
  const web3 = new Web3(Contract.rpcUrls[0]);
  return new web3.eth.Contract(Contract.abi, Contract.address);
};

/**
 * @returns Number of NFTs sold to date
 */
const getTotalNFTSold = async () => {
  const contract = getContract();
  return (await contract.methods.lastTokenId().call()) - 1; //The original is not sold, so we discount it
};

const getTotalMoneyRaisedEuros = async () => {
  return +(await getTotalNFTSold()) * 0.8 * 20;
};

/**
 * Get all the NFTs owned by an account
 * @address string
 * @returns array of NFT objects with their properties (imgUrl, rarity, etc.)
 */
const getNFTsFromAddress = async (address) => {
  const contract = getContract();
  const tokenCount = await contract.methods.balanceOf(address).call();

  const tokenIds = [];
  for (let i = 0; i < tokenCount; i++) {
    tokenIds.push(
      await contract.methods.tokenOfOwnerByIndex(address, i).call(),
    );
  }

  return tokenIds.map(async (id) => {
    return await getNFTProperties(id);
  });
};

/**
 * @returns A unix timestamp with the NFT sale end time (UTC time)
 */
const getNFTSaleFinishTime = async () => {
  const contract = getContract();
  return await contract.methods.saleFinishTime().call();
};

const getPricePerNFT = async () => {
  return (await getPricePerNFTInWei()) / 10 ** Contract.nativeCurrency.decimals;
};

const getPricePerNFTInWei = async () => {
  const contract = getContract();
  return await contract.methods.NFT_PRICE().call();
};

/**
 * Gets the properties of the NFT with a given ID (or null if it has not been revealed)
 * @returns an object with the following properties:
 * "rarity" (as an int), "color1", "color2", "color3",
 * "cid" (the ipfs hash of the image), "imgUrl" (a renderizable img url)
 * @see getRarityLevel(rarity: int) to retrieve rarity as a string
 */
const getNFTProperties = async (nftId) => {
  const contract = getContract();
  const properties = await contract.methods.tokenProperties(nftId).call();
  if (properties.cid === "") {
    return null;
  } else {
    properties.imgUrl = "https://ipfs.io/ipfs/" + properties["cid"];
    return properties;
  }
};

/**
 * @returns The UNIX timestamp of the last minted NFT
 */
const lastNFTMintedTime = async () => {
  const contract = getContract();
  return await contract.methods.lastMinted().call();
};

const getMintData = (address, amount) => {
  const contract = getContract();
  return contract.methods.mint(address, amount).encodeABI();
};

export {
  getTotalNFTSold,
  getTotalMoneyRaisedEuros,
  getNFTsFromAddress,
  getNFTSaleFinishTime,
  getPricePerNFT,
  getPricePerNFTInWei,
  getNFTProperties,
  lastNFTMintedTime,
  getMintData,
};
