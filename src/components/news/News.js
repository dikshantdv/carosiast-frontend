import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const ImageBox = styled((props) => <Box {...props} />)(({ theme }) => ({
  width: "100%",
  height: "360px",
  "& .home-img": {
    width: "inherit",
    height: "inherit",
    objectFit: "cover",
  },
}));

const PriceText = styled((props) => <Typography {...props} />)(({ theme }) => ({
  display: "block",
  fontWeight: 600,
  fontFamily: "inherit",
}));

function News() {
  return (
    <Box>
      <ImageBox>
        <img
          className="home-img"
          src="https://ib.dk/wp-content/uploads/2022/05/sven-d-a4S6KUuLeoM-unsplash-scaled.jpg"
          alt="home page news"
        />
      </ImageBox>
      {/* <Stack
                direction="row"
                justifyContent='space-around'
                py={1}
                sx={{
                    bgcolor: '#F3F3F3',
                    width: '100%'
                }}>
                <PriceText>Today's Fuel Prices:</PriceText>
                <PriceText color={grey[700]}>Diesel price - 100.20</PriceText>
                <PriceText color={grey[700]}>Petrol price - 100.20</PriceText>
            </Stack> */}
    </Box>
  );
}

export default News;
