import React from "react";
import { NavLink} from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import AppLogo from "../../assets/logo.png";
import { Image } from "react-bootstrap";
import axios from "axios";
import { priceAbbr } from "../priceAbbr";

const Logo = styled((props) => <Box {...props} />)(({ theme }) => ({
  width: 162,
  "& img": {
    width: "inherit",
    objectFit: "cover",
    aspectRatio: "5 / 1",
  },
}));

const NavButton = styled((props) => (
  <NavLink {...props} variant="outlined" sx={{ whiteSpace: "nowrap" }} />
))(({ theme }) => ({
  color: "black",
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: "1rem",
  border: `2px solid rgba(0,0,0,0)`,
  borderRadius: "8px",
  padding: "0px 8px !important",
  "&.active, :hover": {
    border: `2px solid ${theme.palette.common.black}`,
  },
}));

const LinkButton = styled((props) => (
  <Link {...props} variant="outlined" sx={{ whiteSpace: "nowrap" }} />
))(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: "1rem",
  border: `2px solid rgba(0,0,0,0)`,
  borderRadius: "8px",
  padding: "0px 8px !important",
  "&.active, :hover": {
    border: `2px solid ${theme.palette.common.black}`,
  },
}));

export const SearchBar = styled((props) => (
  <TextField
    {...props}
    hiddenLabel
    size="small"
    color="error"
    // variant='filled'
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    inputProps={{
      style: {
        padding: 7,
        fontFamily: "inherit",
      },
    }}
  />
))(({ theme }) => ({
  width: "50vw",
  backgroundColor: "#F3F3F3",
  borderRadius: "7px",
  "& .MuiInputBase-root": {
    paddingRight: "0px",
    borderRadius: "inherit",
  },
  "& input::placeholder": {
    fontWeight: 500,
    color: "rgba(0,0,0,)",
  },
}));

const SearchResultItem = styled((props) => <Stack {...props} />)(
  ({ theme }) => ({
    color: "black",
    textTransform: "capitalize",
    fontFamily: "inherit",
    padding: "10px !important",
    borderRadius: "10px",
  })
);

function Navbar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);

  const handleSearchClose = (id) => {   
    // navigate("/car/detail",{ state:{ _id: id }});
    setSearchOpen(false);
    setSearchData([]);
    setSearchValue("");
  };

  const getData = async (enteredValue) => {
    const responseData = await axios.get(
      `https://carosiast-backend.onrender.com/cars/getSearchResult/${enteredValue}`
    );
    // console.log(responseData?.data?.cars);
    setSearchData(responseData?.data?.cars);
    setSearchOpen(true);
  };
  const searchCars = (event) => {
    let searchKey = event.target.value;
    setSearchValue(event.target.value);
    if (searchKey.length > 0) {
      getData(searchKey);
    } else {
        setSearchValue("");
        setSearchOpen(false);
        setSearchData([]);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        px={3}
        py={2}
        sx={{ borderBottom: `3px solid ${grey[400]}` }}
      >
        <NavLink to="/">
          <Logo>
            <Image src={AppLogo} rounded />
          </Logo>
        </NavLink>
        <SearchBar
          value={searchValue}
          placeholder="Search Cars or Brands eg. Tiago, or Tata"
          onChange={searchCars}
        //   onBlur={handleSearchClose}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              color: "white",
              backgroundColor: "error.main",
              fontWeight: "bold",
              fontFamily: "inherit",
            }}
          >
            Login
          </Button>
        </Stack>
      </Stack>
      <Stack px={1} py={0.5}>
        <Stack direction="row" spacing={2} py={1} justifyContent="center">
          <NavButton to="/">Home</NavButton>
          <LinkButton href="https://blog.carosiast.com/" target="_blank">Blogs</LinkButton>
          <LinkButton href="#brands">Brands</LinkButton>
          <LinkButton href="#category">Category</LinkButton>
          <NavButton to="/about">About Us</NavButton>
          <NavButton to="/contact">Contact</NavButton>
        </Stack>
      </Stack>

      {searchOpen && (
        <Stack
          direction="column"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 5px 8px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            width: "44vw",
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            margin: "0px auto !important",
            zIndex: 999,
          }}
        >
          {searchData && searchData.length > 0 ? (
            searchData.map((item, index) => {
              return (
                <NavLink
                  to="/car/detail"
                  state={{ _id: item?._id }}
                  key={index}
                >
                  <SearchResultItem
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => handleSearchClose(item?._id)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(24, 22, 71, 0.1)",
                      },
                    }}
                  >
                    {/* {index === 0 ? ( */}
                      <Stack direction="row" gap={2}>
                        <img
                          src={item.images}
                          alt={item?.name}
                          style={{
                            width: "120px",
                            aspectRatio: 3 / 2,
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                        <Stack direction="column" justifyContent="space-between" sx={{padding: "5px 0px"}}>
                        <Typography fontWeight={500} fontSize="1.5rem" sx={{textTransform: "capitalize"}}>
                          {item?.company} {item?.name}
                        </Typography>
                        <Typography fontWeight={500} fontSize="1.2rem">
                          Rs. {priceAbbr(item?.minPrice)} - Rs. {priceAbbr(item?.maxPrice)}
                        </Typography>
                      </Stack>
                      </Stack>
                    {/* ) : (
                      <Typography fontWeight={500} fontSize="1.2rem">
                        {item?.company} {item?.name}
                      </Typography>
                    )} */}
                  </SearchResultItem>
                </NavLink>
              );
            })
          ) : (
            <SearchResultItem
              justifyContent="center"
              alignItems="center"
              sx={{ pointerEvents: "none", padding: "14px 20px !important" }}
            >
              <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: 500 }}>
                Nothing found
              </p>
              <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 400 }}>
                Try searching for something else
              </p>
            </SearchResultItem>
          )}
        </Stack>
      )}
    </AppBar>
  );
}
export default Navbar;
