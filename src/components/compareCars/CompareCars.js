/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router";
import {
  OptionBox,
  SpecificationAccordionSummary,
} from "../carDetail/CarDetail";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  getCompareData,
  getSelectedVariantData,
} from "../../store/CompareAction";
import { useDispatch, useSelector } from "react-redux";
import { CarItemImage } from "../carList/CarList";
import { LoadingScreen } from "../Loading/Loading";
import { priceAbbr } from "../priceAbbr";
import axios from "axios";
import { SearchBar } from "../navbar/Navbar";

function CompareCars() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { loading, carOne, variantOne, carTwo, variantTwo } = useSelector(
    (state) => state?.compare
  );

  const [searchData, setSearchData] = React.useState([]);

  const getData = async (enteredValue) => {
    const responseData = await axios.get(
      `https://carosiast-backend.onrender.com/cars/getSearchResult/${enteredValue}`
    );
    // console.log(responseData?.data?.cars);
    setSearchData(responseData?.data?.cars);
  };
  const searchCars = (event) => {
    let searchKey = event.target.value;
    if (searchKey.length > 0) {
      getData(searchKey);
    } else {
      setSearchData([]);
    }
  };

  const [carOneData, setCarOneData] = React.useState(state?.carOneData ?? []);
  const [carTwoData, setCarTwoData] = React.useState(state?.carOneData ?? []);
  const [openVariantBoxOne, setOpenVariantBoxOne] = React.useState(false);
  const [openVariantBoxTwo, setOpenVariantBoxTwo] = React.useState(false);
  const [openModelBoxOne, setOpenModelBoxOne] = React.useState(false);
  const [openModelBoxTwo, setOpenModelBoxTwo] = React.useState(false);

  //   model box one
  const handleModelBoxOneClose = () => {
    setOpenModelBoxOne(false);
    setSearchData([]);
  };

  const handleModelOneClick = (event, carId) => {
    dispatch(getCompareData(carId, 1));
    handleModelBoxOneClose();
  };

  //   Model box two
  const handleModelBoxTwoClose = () => {
    setOpenModelBoxTwo(false);
    setSearchData([]);
  };

  const handleModelTwoClick = (event, carId) => {
    dispatch(getCompareData(carId, 2));
    handleModelBoxTwoClose();
  };

  //   variant box one
  const handleVariantBoxOneClose = () => {
    setOpenVariantBoxOne(false);
  };

  const handleVariantOneClick = (event, variantId) => {
    handleVariantBoxOneClose();
    dispatch(getSelectedVariantData(variantId, carOne?._id, 1));
  };

  //   variant box two
  const handleVariantBoxTwoClose = () => {
    setOpenVariantBoxTwo(false);
  };

  const handleVariantTwoClick = (event, variantId) => {
    handleVariantBoxTwoClose();
    dispatch(getSelectedVariantData(variantId, carTwo?._id, 2));
  };

  //   UseEffects
  React.useEffect(() => {
    state && dispatch(getCompareData(carOneData?._id, 1));
    // dispatch(getCompareData(carOneData?._id, 2));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Stack direction="column" alignItems="center" width="100%">
          <Stack
            direction="row"
            mt={3}
            justifyContent="space-around"
            alignItems="center"
            width="80%"
          >
            <Stack direction="column" gap={2}>
              {carOne ? (
                <>
                  <CarItemImage
                    onClick={() => setOpenModelBoxOne(true)}
                    sx={{ width: 480, borderRadius: "10px", cursor: "pointer" }}
                  >
                    <img
                      className="car-image"
                      src={carOne?.images[0]}
                      alt={carOne?.name}
                    />
                  </CarItemImage>
                  <OptionBox
                    sx={{ width: "100%" }}
                    onClick={() => setOpenVariantBoxOne(true)}
                  >
                    <Box className="option-detail">
                      <Typography sx={{ textTransform: "capitalize" }}>
                        {carOne?.company} {carOne?.name}
                      </Typography>
                      <Typography>{variantOne?.name}</Typography>
                    </Box>
                    <Stack justifyContent="center" className="align-middle">
                      <ChevronRightRoundedIcon fontSize="large" />
                    </Stack>
                  </OptionBox>
                </>
              ) : (
                <>
                <CarItemImage
                    onClick={() => setOpenModelBoxOne(true)}
                    sx={{
                      width: 480,
                      aspectRatio: "1.6",
                      borderRadius: "10px",
                      cursor: "pointer",
                      border: "2px dashed black",
                      backgroundColor: "rgba(24, 22, 71, 0.1)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AddCircleOutlineRoundedIcon sx={{ fontSize: "40px" }} />
                  </CarItemImage>
                  <OptionBox sx={{ width: "100%" }}>
                    <Box className="option-detail">
                      <Typography sx={{ textTransform: "capitalize" }}>
                        Select Variant
                      </Typography>
                      <Typography>
                        Select a car to select the variant
                      </Typography>
                    </Box>
                    <Stack justifyContent="center" className="align-middle">
                      <ChevronRightRoundedIcon fontSize="large" />
                    </Stack>
                  </OptionBox>
                </>
              )}
            </Stack>
            <Stack direction="column" gap={2}>
              {carTwo ? (
                <>
                  <CarItemImage
                    onClick={() => setOpenModelBoxTwo(true)}
                    sx={{ width: 480, borderRadius: "10px", cursor: "pointer" }}
                  >
                    <img
                      className="car-image"
                      src={carTwo?.images[0]}
                      alt={carTwo?.name}
                    />
                  </CarItemImage>
                  <OptionBox
                    sx={{ width: "100%" }}
                    onClick={() => setOpenVariantBoxTwo(true)}
                  >
                    <Box className="option-detail">
                      <Typography sx={{ textTransform: "capitalize" }}>
                        {carTwo?.company} {carTwo?.name}
                      </Typography>
                      <Typography>{variantTwo?.name}</Typography>
                    </Box>
                    <Stack justifyContent="center" className="align-middle">
                      <ChevronRightRoundedIcon fontSize="large" />
                    </Stack>
                  </OptionBox>
                </>
              ) : (
                <>
                  <CarItemImage
                    onClick={() => setOpenModelBoxTwo(true)}
                    sx={{
                      width: 480,
                      aspectRatio: "1.6",
                      borderRadius: "10px",
                      cursor: "pointer",
                      border: "2px dashed black",
                      backgroundColor: "rgba(24, 22, 71, 0.1)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AddCircleOutlineRoundedIcon sx={{ fontSize: "40px" }} />
                  </CarItemImage>
                  <OptionBox sx={{ width: "100%" }}>
                    <Box className="option-detail">
                      <Typography sx={{ textTransform: "capitalize" }}>
                        Select Variant
                      </Typography>
                      <Typography>
                        Select a car to select the variant
                      </Typography>
                    </Box>
                    <Stack justifyContent="center" className="align-middle">
                      <ChevronRightRoundedIcon fontSize="large" />
                    </Stack>
                  </OptionBox>
                </>
              )}
            </Stack>
          </Stack>
          <Box
            my={3}
            sx={{
              width: {
                xs: "100%",
                md: "80vw",
              },
            }}
          >
            <Paper elevation={5}>
              {variantOne?.specs?.map((row, index) => (
                <Accordion
                  key={`specification-${row.title}-${index}`}
                  disableGutters
                >
                  <SpecificationAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>{row.title}</Typography>
                  </SpecificationAccordionSummary>
                  <AccordionDetails>
                    <Table
                      sx={{
                        padding: 50,
                        [`& .MuiTableRow-root:last-child td`]: {
                          borderBottomWidth: "0px !important",
                        },
                      }}
                    >
                      <TableBody>
                        {row.data.map((spec, spec_index) => (
                          <TableRow key={`spec-${spec.key}`}>
                            <TableCell
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.1rem",
                                textAlign: "right",
                              }}
                            >
                              {spec.value}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                textAlign: "center",
                                padding: "0px 28px",
                                minWidth: "400px",
                                maxWidth: "max-content",
                              }}
                            >
                              {spec.key}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: 500,
                                fontSize: "1.1rem",
                                textAlign: "left",
                              }}
                            >
                              {
                                variantTwo?.specs[index]?.data[spec_index]
                                  ?.value
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Box>

          {/* model One Box */}
          <Dialog
            open={openModelBoxOne}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "15px",
                bgcolor: "#EFEFEF",
              },
            }}
            onClose={handleModelBoxOneClose}
          >
            <DialogTitle>
              <Typography
                sx={{ textTransform: "capitalize" }}
                fontWeight={600}
                fontSize={28}
              >
                Select Car One
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ padding: "0 !important", width: "fit-content" }}
            >
              <SearchBar
                placeholder="Search Cars"
                onChange={searchCars}
                sx={{ margin: "0px 24px 24px", width: "550px !important" }}
              />
              {searchData &&
                searchData?.map((item) => (
                  <List
                    component="nav"
                    disablePadding
                    key={item._id}
                    sx={{ borderTop: "1px solid #4D4C4C", minWidth: "100%" }}
                  >
                    <ListItemButton
                      selected={(carOne?._id === item._id) ?? null}
                      onClick={(event) => handleModelOneClick(event, item._id)}
                    >
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
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          sx={{ padding: "5px 0px" }}
                        >
                          <Typography fontWeight={500} fontSize="1.5rem" sx={{textTransform: "capitalize"}}>
                            {item?.company} {item?.name}
                          </Typography>
                          <Typography fontWeight={500} fontSize="1.2rem">
                            Rs. {priceAbbr(item?.minPrice)} - Rs.{" "}
                            {priceAbbr(item?.maxPrice)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </ListItemButton>
                  </List>
                ))}
            </DialogContent>
          </Dialog>

          {/* variant One Box */}
          <Dialog
            open={openVariantBoxOne}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "15px",
                bgcolor: "#EFEFEF",
              },
            }}
            onClose={handleVariantBoxOneClose}
          >
            <DialogTitle>
              <Typography
                sx={{ textTransform: "capitalize" }}
                fontWeight={600}
                fontSize={28}
              >
                Select Variant
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: "0 !important" }}>
              {carOne &&
                carOne?.variants?.map((variant) => (
                  <List
                    component="nav"
                    disablePadding
                    key={variant._id}
                    sx={{ borderTop: "1px solid #4D4C4C", minWidth: 420 }}
                  >
                    <ListItemButton
                      selected={variantOne._id === variant._id}
                      onClick={(event) =>
                        handleVariantOneClick(event, variant._id)
                      }
                    >
                      <Stack
                        direction="row"
                        spacing={10}
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ width: "100%" }}
                      >
                        <Stack direction="column" sx={{ minWidth: 164 }}>
                          <Typography
                            fontWeight={500}
                            fontSize={20}
                            sx={{
                              flex: "1 1 100%",
                              color: "var(--primary-color) !important",
                            }}
                          >
                            {variant.name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="space-between"
                            sx={{ width: 164 }}
                          >
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              sx={{
                                color: "#4D4C4C !important",
                                textTransform: "capitalize",
                              }}
                            >
                              {variant.fuel}
                            </Typography>
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              sx={{
                                color: "#4D4C4C !important",
                                textTransform: "capitalize",
                              }}
                            >
                              {variant.transmission}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                          <Typography
                            fontWeight={500}
                            fontSize={20}
                            sx={{ color: "#4D4C4C !important" }}
                          >
                            ₹ {priceAbbr(variant.price)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </ListItemButton>
                  </List>
                ))}
            </DialogContent>
          </Dialog>

          {/* model Two Box */}
          <Dialog
            open={openModelBoxTwo}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "15px",
                bgcolor: "#EFEFEF",
              },
            }}
            onClose={handleModelBoxTwoClose}
          >
            <DialogTitle>
              <Typography
                sx={{ textTransform: "capitalize" }}
                fontWeight={600}
                fontSize={28}
              >
                Select Car Two
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ padding: "0 !important", width: "fit-content" }}
            >
              <SearchBar
                placeholder="Search Cars"
                onChange={searchCars}
                sx={{ margin: "0px 24px 24px", width: "550px !important" }}
              />
              {searchData &&
                searchData?.map((item) => (
                  <List
                    component="nav"
                    disablePadding
                    key={item._id}
                    sx={{ borderTop: "1px solid #4D4C4C", minWidth: "100%" }}
                  >
                    <ListItemButton
                      selected={(carTwo?._id === item._id) ?? null}
                      onClick={(event) => handleModelTwoClick(event, item._id)}
                    >
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
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          sx={{ padding: "5px 0px" }}
                        >
                          <Typography fontWeight={500} fontSize="1.5rem" sx={{textTransform: "capitalize"}}>
                            {item?.company} {item?.name}
                          </Typography>
                          <Typography fontWeight={500} fontSize="1.2rem">
                            Rs. {priceAbbr(item?.minPrice)} - Rs.{" "}
                            {priceAbbr(item?.maxPrice)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </ListItemButton>
                  </List>
                ))}
            </DialogContent>
          </Dialog>

          {/* variant Two Box */}
          <Dialog
            open={openVariantBoxTwo}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "15px",
                bgcolor: "#EFEFEF",
              },
            }}
            onClose={handleVariantBoxTwoClose}
          >
            <DialogTitle>
              <Typography
                sx={{ textTransform: "capitalize" }}
                fontWeight={600}
                fontSize={28}
              >
                Select Variant
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: "0 !important" }}>
              {carTwo &&
                carTwo?.variants?.map((variant) => (
                  <List
                    component="nav"
                    disablePadding
                    key={variant._id}
                    sx={{ borderTop: "1px solid #4D4C4C", minWidth: 420 }}
                  >
                    <ListItemButton
                      selected={variantTwo._id === variant._id}
                      onClick={(event) =>
                        handleVariantTwoClick(event, variant._id)
                      }
                    >
                      <Stack
                        direction="row"
                        spacing={10}
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ width: "100%" }}
                      >
                        <Stack direction="column" sx={{ minWidth: 164 }}>
                          <Typography
                            fontWeight={500}
                            fontSize={20}
                            sx={{
                              flex: "1 1 100%",
                              color: "var(--primary-color) !important",
                            }}
                          >
                            {variant.name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="space-between"
                            sx={{ width: 164 }}
                          >
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              sx={{
                                color: "#4D4C4C !important",
                                textTransform: "capitalize",
                              }}
                            >
                              {variant.fuel}
                            </Typography>
                            <Typography
                              fontWeight={600}
                              fontSize={14}
                              sx={{
                                color: "#4D4C4C !important",
                                textTransform: "capitalize",
                              }}
                            >
                              {variant.transmission}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                          <Typography
                            fontWeight={500}
                            fontSize={20}
                            sx={{ color: "#4D4C4C !important" }}
                          >
                            ₹ {priceAbbr(variant.price)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </ListItemButton>
                  </List>
                ))}
            </DialogContent>
          </Dialog>
        </Stack>
      )}
    </>
  );
}

export default CompareCars;
