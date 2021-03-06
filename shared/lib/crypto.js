import Web3 from "web3";
import { Contract } from "../../constants/contract";

const web3 = new Web3(Contract.rpcUrls[0]);
const contract = new web3.eth.Contract(Contract.abi, Contract.address);

const getIPFSGateway = (url) => {
  return url.replace("ipfs://", "https://ipfs.io/ipfs/");
};

const getTotalMoneyRaisedEuros = (nftsSold) => {
  return nftsSold * 0.8 * 20;
};

/**
 * Get all the NFTs owned by an account
 * @address string
 * @returns array of NFT objects with their properties (id, imgUrl, rarity, etc.)
 */
const getNFTsFromAddress = async (address) => {
  if (!address) {
    return [];
  }

  return Promise.all(
    await contract.methods
      .getAllOwnedNFTs(address)
      .call()
      .then((response) => {
        return response
          .map((result) => {
            return {
              ...{
                tokenId: result.id,
                tokenURI: result.tokenURI,
                pendingReveal: false,
              },
              ...result.properties,
            };
          })
          .map((nft) => getNFTProperties(nft));
      }),
  );
};

/**
 * 
 * @returns An object with the public information
  struct PublicInfo {
    uint256 lastTokenId;
    uint256 lastMinted;
    uint256 tokensBurned;
    uint256 nftPrice;
    uint256 saleFinishTime;
    bool nftSaleFinished;
    string baseURI;
  }
 */
const getPublicInfo = async () => {
  return await contract.methods.getPublicInfo().call();
};

const calculatePricePerNFT = (priceInWei) => {
  return priceInWei / 10 ** Contract.nativeCurrency.decimals;
};

/**
 * Gets the properties of the NFT with a given ID (or null if it has not been revealed)
 * @returns an object with the following properties:
 * "rarity" (as an int), "color1", "color2", "color3",
 * "imgUrl" (a renderizable img url), "rarityStr" (as a string),
 * "pendingReveal" (as a boolean)
 * @see getRarityLevel(rarity: int) to retrieve rarity as a string
 */
const getNFTProperties = async (properties) => {
  if (!properties || (properties.rarity == 0 && properties.tokenId !== 1)) {
    return { pendingReveal: true };
  } else {
    const tokenMetadata = await fetch(getIPFSGateway(properties.tokenURI))
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          return {
            image: getIPFSGateway(responseJson.image),
            rarityStr: responseJson.name,
          };
        } catch (error) {
          console.log(error); //not fatal, just image not shown
          return {};
        }
      })
      .catch((error) => {
        console.log(error); //not fatal, just image not shown
        return {};
      });
    return { ...properties, ...tokenMetadata };
  }
};

const getMintData = (address, amount) => {
  if (!address || !amount) {
    return null;
  }

  return contract.methods.mint(address, amount).encodeABI();
};

export {
  getNFTsFromAddress,
  getPublicInfo,
  getMintData,
  getTotalMoneyRaisedEuros,
  calculatePricePerNFT,
};
