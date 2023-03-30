import { useRouter } from "next/router";
import UseSWR from "swr";

import { Beer } from "../BeerList/BeerList.types";

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";
import BeerDetailsGrid from "./BeerDetailsGrid";

import { StyledImg } from "./BeerDetails.styled";

const BeerDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = UseSWR(
    `https://api.punkapi.com/v2/beers/${id}`,
    (apiUrl: string) => fetch(apiUrl).then((data) => data.json())
  );

  console.log(data);
  const beer: Beer = !isLoading ? data[0] : null;

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "inherit",
          padding: 5,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBlock: 5,
            borderRadius: 10,
          }}
        >
          {!isLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <StyledImg src={beer.image_url} />
              <Typography
                sx={{ marginTop: 2, textAlign: "center" }}
                variant="h4"
              >
                {beer.name}
              </Typography>
              <Typography sx={{ marginTop: 0.5 }} variant="caption">
                {beer.tagline}
              </Typography>
              <Typography
                sx={{ marginInline: 5, marginTop: 2 }}
                variant="body1"
              >
                {beer.description}
              </Typography>
              <BeerDetailsGrid beer={beer} />
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default BeerDetails;
