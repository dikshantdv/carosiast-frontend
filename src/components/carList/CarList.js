/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Fab, Rating, Skeleton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Carousel from "react-grid-carousel";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { priceAbbr } from "../priceAbbr";

const CarItem = styled((props) => <Stack {...props} />)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  background: "#F3F3F3",
  boxShadow: "1px 2px 5px 1px rgba(0, 0, 0, 0.25)",
  borderRadius: 15,
  padding: 7,
  cursor: "pointer",
}));

export const CarItemImage = styled((props) => <Box {...props} />)(
  ({ theme }) => ({
    width: 288,
    apectRatio: "3/2",
    borderRadius: "inherit",
    "& .car-image": {
      height: "inherit",
      width: "inherit",
      objectFit: "cover",
      borderRadius: "inherit",
    },
  })
);

const CarItemSummary = styled((props) => (
  <Stack direction="column" spacing={0.5} {...props} />
))(({ theme }) => ({
  width: "initial",
  height: "inherit",
  padding: "16px 8px 8px 8px",
}));

export function CarSummaryCard(props) {
  return (
    <CarItem direction={props.direction}>
      <CarItemImage>
        <img className="car-image" src={props.data.image} alt="" />
      </CarItemImage>
      <CarItemSummary>
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {props.data.name}
        </Typography>
        <Typography sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
          {props.data.price_range}
        </Typography>
        <Typography className="d-flex align-items-center">
          Rating -
          <Rating
            name="read-only-rating"
            value={props.data.rating}
            precision={0.1}
            readOnly
            size="small"
            icon={<StarRoundedIcon fontSize="inherit" color="warning" />}
          />
        </Typography>
      </CarItemSummary>
    </CarItem>
  );
}

const CustomFab = styled((props) => <Fab {...props} />)(({ theme }) => ({
  color: "white",
  backgroundColor: "black",
  width: 28,
  height: 28,
  minHeight: 0,
  position: "absolute",
  top: "40%",
  "& :hover": {
    color: "black",
  },
}));

export default function CarList(props) {
  const [carsData, setCarsData] = useState([]);
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setCarsData(response.data.cars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Box my={4}>
      <Typography variant="h4">
        <b>{props.title}</b>
      </Typography>
      {/* <Box my={3} className='d-grid' sx={{ gridTemplateColumns: 'repeat(auto-fill,minmax(288px,1fr))', gap: 5, }}>
                {trendingCars.length !== 0 ?
                    trendingCars.map((item) =>
                        <NavLink
                            key={`car-${item}`}
                            to="/car/detail"
                            state={{ _id: item._id }}
                            style={{ width: "fit-content" }}
                        >
                            <CarSummaryCard
                                data={{
                                    image: item.images[0],
                                    name: `${item.company} ${item.name}`,
                                    price_range: `Rs. ${item.minPrice} - ${item.maxPrice}`,
                                    rating: 4.5,
                                }}
                            />
                        </NavLink>
                    )
                    :
                    <CarItem>
                        <Skeleton variant="rounded" width={288} height={192} sx={{ borderRadius: 'inherit !important' }} />
                        <CarItemSummary>
                            <Skeleton variant="rounded" width={180} height={30} />
                            <Skeleton variant="rounded" width={200} height={30} />
                            <Skeleton variant="rounded" width={260} height={24} />
                        </CarItemSummary>
                    </CarItem>
                }
            </Box> */}

      <Box
        className="w-100"
        my={3}
        sx={{ '& div[rows="1"]': { height: "328px" } }}
      >
        <Carousel
          cols={4}
          rows={1}
          loop
          arrowLeft={
            <CustomFab size="small" sx={{ left: -24, right: "unset" }}>
              <KeyboardArrowLeftRoundedIcon />
            </CustomFab>
          }
          arrowRight={
            <CustomFab size="small" sx={{ left: "unset", right: -24 }}>
              <KeyboardArrowRightRoundedIcon />
            </CustomFab>
          }
          style={{
            width: "100%",
            height: "100%",
            border: "10px solid red",
          }}
        >
          {carsData.length !== 0
            ? carsData.map((item) => (
                <Carousel.Item key={`list-${item._id}`}>
                  <NavLink
                    to="/car/detail"
                    state={{ _id: item._id }}
                    // style={{ width: "fit-content" }}
                  >
                    <CarSummaryCard
                      direction="column"
                      data={{
                        image: item.images[0],
                        name: `${item.company} ${item.name}`,
                        price_range: `Rs. ${priceAbbr(
                          item.minPrice
                        )} - ${priceAbbr(item.maxPrice)}`,
                        rating: 4.5,
                      }}
                    />
                  </NavLink>
                </Carousel.Item>
              ))
            : [0, 1, 2, 3].map((skeleton) => (
                <Carousel.Item key={`trending-skeleton-${skeleton}`}>
                  <CarItem>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={288}
                      height={192}
                      sx={{ borderRadius: "inherit !important" }}
                    />
                    <CarItemSummary>
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={180}
                        height={30}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={200}
                        height={30}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={260}
                        height={24}
                      />
                    </CarItemSummary>
                  </CarItem>
                </Carousel.Item>
              ))}
        </Carousel>
      </Box>
    </Box>
  );
}
