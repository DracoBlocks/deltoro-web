import { useState } from "react";
import { Row } from "react-bootstrap";
import MetamaskConnection from "../../components/MetamaskConnection";
import NFTSaleItem from "../../components/NFTSale/NFTSaleItem";
import OpenseaButton from "../../components/OpenseaButton";
import { getNFTsFromAddress } from "../../shared/lib/Crypto";
import Footer from "../../widgets/Footer";
import Header from "../../widgets/Header";
import style from "./micuenta.module.scss";

export default function MyAccount() {
  const [userWallet, setUserWallet] = useState("");
  const [NFTsInWallet, setNFTsInWallet] = useState([]);

  const isConnected = () => {
    return userWallet !== "";
  };

  const handleAccountsChanged = async (accounts) => {
    const userAccount = accounts.length > 0 ? accounts[0] : "";
    setUserWallet(userAccount);
    setNFTsInWallet(await Promise.all(await getNFTsFromAddress(userAccount)));
  };

  return (
    <main>
      <Header />
      <section className={style.section}>
        <div className={"text-center" + " " + style.paddings}>
          <h1>Tu cuenta</h1>
          <h4>
            {userWallet
              ? "Accede a tu colección en Opensea: "
              : "Por favor, conecta tu monedero primero."}
          </h4>
          {!isConnected() && (
            <div className={"btn " + style.social}>
              <MetamaskConnection onAccountsChanged={handleAccountsChanged} />
              {/* <Container>Iconos Sociales</Container> */}
            </div>
          )}
          {isConnected() && (
            <div>{<OpenseaButton wallet={userWallet}></OpenseaButton>}</div>
          )}
        </div>
      </section>
      <section className={style.section + " white_background"}>
        <div className={"text-center"}>
          {isConnected() && (
            <div className={"text-center" + " " + style.paddings}>
              <h2>
                Actualmente tienes {NFTsInWallet.length} NFTs en tu monedero
              </h2>
              <hr className={style.sep_line}></hr>
              <div className={style.grid_container}>
                <Row>
                  {NFTsInWallet.map((nft, index) => {
                    return (
                      <NFTSaleItem
                        imageUrl={nft.image}
                        rarity={nft.rarity / 10000}
                        rarityStr={nft.rarityStr}
                        key={index}
                      ></NFTSaleItem>
                    );
                  })}
                </Row>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
