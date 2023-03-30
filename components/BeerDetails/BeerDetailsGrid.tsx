import { Grid, Box, ListItem, List, ListItemText, Typography } from "@mui/material";
import { Beer } from "../BeerList/BeerList.types";

const BeerDetailsGrid: React.FC<{beer: Beer}> = ({beer}) => {
  return (
    <>
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
            <ListItem sx={{ paddingLeft: 5 }}>* ABV: {beer.abv}%</ListItem>
            <ListItem sx={{ paddingLeft: 5 }}>* IBU: {beer.ibu}%</ListItem>
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
          <Typography sx={{ paddingInline: 5 }} variant="body2">
            {beer.brewers_tips}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default BeerDetailsGrid;
