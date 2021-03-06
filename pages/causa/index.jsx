import PaymentSection from "../../components/PaymentSection";
import TeamGrid from "../../components/TeamGrid";
import Image from "../../components/Image";
import FeatureCard from "../../components/FeaturesList/FeatureCard";
import style from "./causa.module.scss";
import { Col, Row } from "react-bootstrap";

const Causa = () => {
  const card_content = (
    <div className={style.align_text_left + " " + style.card_content}>
      <p className={style.card_title}>
        Los objetivos del proyecto “Estrella sobre un volcán dormido” son:
      </p>
      <p> Promover el arte local canario mediante la tecnología blockchain.</p>
      <p>
        Democratizar el acceso a la compra de una obra digital a usuarios que
        nunca han comprado un NFT.
      </p>
      <p>
        Gamificar la venta y apremiar a los compradores con versiones físicas y
        digitales limitadas de la colección.
      </p>
      <p>
        Visibilizar y apoyar acciones solidarias para los afectados por el
        volcán de La Palma.
      </p>
    </div>
  );

  return (
    <>
      <section className={style.section + " " + style.paddings}>
        <div className={"text-center"}>
          <h1>UNA BUENA CAUSA</h1>
        </div>
        <div className={style.introduction_container}>
          <div className={style.introduction}>
            <FeatureCard content={card_content}></FeatureCard>
          </div>
        </div>
        <div className={"text-center"}>
          <h3>
            El 80% de la recaudación irá destinada a acciones solidarias para
            los afectados por el volcán de La Palma.
          </h3>
        </div>
      </section>

      <section className={style.section}>
        <div className={`text-center white_background ${style.padding}`}>
          <h2 className={style.section_title}>NUESTRO EQUIPO</h2>
          <TeamGrid />
        </div>
      </section>

      <section>
        <div
          className={
            "text-center white_background " +
            style.discover +
            " " +
            style.paddings_plus
          }
        >
          <Row>
            <Col xs={12} md={4}>
              <h2>CON EL APOYO DE:</h2>
            </Col>
            <Col xs={12} md={4}>
              <div>
                <span>
                  <Image
                    src="/images/lecover_abogados.PNG"
                    width="90%"
                    height="auto"
                  />
                </span>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div>
                <span>
                  <Image
                    src="/images/fotoarte_black.png"
                    width="90%"
                    height="auto"
                  />
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className={"text-center " + style.paddings_plus}>
        <PaymentSection />
      </section>
    </>
  );
};

export default Causa;
