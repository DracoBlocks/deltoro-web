import { Container } from "react-bootstrap";
import FeaturesData from "../../components/FeaturesList/featuresData";
import FeatureCard from "./FeatureCard";

const FeaturesList = (props) => {
  const features = FeaturesData[props.data];

  return (
    <Container>
      {features.map((entry, index) => {
        return (
          <FeatureCard
            header={entry.header}
            content={entry.content}
            footer={entry.footer}
            imgSrc={entry.imgSrc}
            invertCols={index % 2 === 0 ? true : false}
            key={"featureCard" + index}
          ></FeatureCard>
        );
      })}
    </Container>
  );
};

export default FeaturesList;
