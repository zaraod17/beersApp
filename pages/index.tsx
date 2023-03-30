import { Box, styled } from "@mui/material";

import BeerList from "@/components/BeerList/BeerList";

const StyledBox = styled(Box)(() => ({
  height: "200px",
  textAlign: "center",
  background: "#736d94",
  color: "#e3a217",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  clipPath: `polygon(0 0, 100% 0, 100% 76%, 52% 87%, 0 100%, 0% 50%);`,
}));

export default function HomePage() {
  return (
    <>
      <StyledBox sx={{}}>
        <h1>Beers</h1>
      </StyledBox>
      <BeerList />
    </>
  );
}
