import { useRouter } from "next/router";
import UseSWR from "swr";

import { Beer } from "../BeerList/BeerList.types";

import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";

const StyledImg = styled("img")(() => ({
  width: "50%",
  height: "300px",
  objectFit: "contain",
}));

const BeerDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = UseSWR(
    `https://api.punkapi.com/v2/beers/${id}`,
    (apiUrl: string) => fetch(apiUrl).then((data) => data.json())
  );

  console.log(data);
  const beer: Beer = !isLoading ? data[0] : null;

  return (
    <>
      <Box
        sx={{
          width: "inherit",
          padding: 10,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBlock: 5,
            borderRadius: 10
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
                {data[0].name}
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
              <Grid container>
                <Grid
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={12}
                  md={4}
                >
                  <List>
                    <Box sx={{ textAlign: "center", marginBottom: 1 }}>
                      <h4>Beer info:</h4>
                    </Box>
                    <ListItem sx={{ paddingLeft: 5 }}>
                      * ABV: {beer.abv}%
                    </ListItem>
                    <ListItem sx={{ paddingLeft: 5 }}>
                      * IBU: {beer.ibu}%
                    </ListItem>
                    <ListItem sx={{ paddingLeft: 5 }}>* ph: {beer.ph}</ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <List
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h4>Ingredients:</h4>
                    <ListItem sx={{ textAlign: "center" }}>
                      <ListItemText primary="Malt" />
                    </ListItem>
                    {beer.ingredients.malt.map((malt) => (
                      <ListItem
                        sx={{ textAlign: "center" }}
                        key={Math.random().toString()}
                      >
                        <ListItemText
                          primary={`${malt.amount.value} ${malt.amount.unit} ${malt.name}`}
                        />
                      </ListItem>
                    ))}
                    <ListItem sx={{ textAlign: "center" }}>
                      <ListItemText primary="Hops" />
                    </ListItem>
                    {beer.ingredients.hops.map((hop) => (
                      <ListItem
                        sx={{ textAlign: "center" }}
                        key={Math.random().toString()}
                      >
                        <ListItemText
                          primary={`${hop.amount.value} ${hop.amount.unit} ${hop.name}`}
                          secondary={`${hop.add}, ${hop.attribute}`}
                        />
                      </ListItem>
                    ))}
                    <ListItem sx={{ textAlign: "center" }}>
                      <ListItemText
                        primary="Yeast"
                        secondary={beer.ingredients.yeast}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <List
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h4>Food Pairing</h4>
                    {beer.food_pairing.map((food) => (
                      <ListItem
                        sx={{ textAlign: "center" }}
                        key={Math.random().toString()}
                      >
                        <ListItemText primary={food} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                  item
                  xs={12}
                >
                  <h4>Brewers Tips</h4>
                  <Typography sx={{paddingInline: 5}} variant="body2">{beer.brewers_tips}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default BeerDetails;
