import dynamic from "next/dynamic";

const BeerDetail = dynamic(() => import("@/components/BeerDetails/BeerDetails"), {
  ssr: false,
});

const DetailsPage: React.FC = () => {
  return (
    <>
      <BeerDetail />
    </>
  );
};

export default DetailsPage;
