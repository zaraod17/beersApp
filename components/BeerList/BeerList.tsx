import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Grid,
  Pagination,
  PaginationItem,
  CircularProgress,
} from "@mui/material";

import { Beer } from "./BeerList.types";
import { StyledBox } from "./BeerList.styled";

import BeerCard from "../BeerCard/BeerCard";

const BeerList: React.FC = () => {
  const router = useRouter();

  const { query } = router;
  const page: number = +query.page! ?? 1;


  const {
    data,
    error,
    isLoading,
  }: {
    data: Beer[];
    error: any;
    isLoading: boolean;
  } = useSWR(
    `https://api.punkapi.com/v2/beers?page=${query.page ?? 1}&per_page=12`,
    (apiUrl: string) => fetch(apiUrl).then((res) => res.json())
  );
  console.log(page);

  return (
    <>
      {!isLoading ? (
        <StyledBox>
          <Grid sx={{ paddingInline: 10 }} container spacing={2}>
            {data.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Link
                  href={{ pathname: `details/${item.id}`}}
                  style={{ textDecoration: "none" }}
                >
                  <BeerCard
                    image={item.image_url}
                    name={item.name}
                    tagline={item.tagline}
                    title={item.name}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
          <Pagination
            sx={{ marginTop: 5 }}
            count={5}
            page={isNaN(page) ? 1 : page}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                href={{ pathname: "/", query: { page: `${item.page}` } }}
                {...item}
              />
            )}
          />
        </StyledBox>
      ) : (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      )}
    </>
  );
};

export default BeerList;
