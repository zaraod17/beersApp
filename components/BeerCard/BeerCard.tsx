import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

import { BeerCardType } from "./BeerCard.types";

const BeerCard: React.FC<BeerCardType> = ({ image, name, tagline, title }) => {
  return (
    <Card
      sx={{
        height: 500,
        padding: "30px",
        borderRadius: 10,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 0 10px #e3a217",
        },
      }}
    >
      <Box sx={{ height: 300 }}>
        <CardMedia
          sx={{ height: "100%", objectFit: "contain" }}
          image={image}
          title={title}
          component="img"
        ></CardMedia>
      </Box>
      <CardContent sx={{ marginTop: "10px", textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">{tagline}</Typography>
      </CardContent>
    </Card>
  );
};

export default BeerCard;
