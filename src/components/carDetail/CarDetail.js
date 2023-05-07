/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Rating,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemButton,
  List,
  Link,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LaunchIcon from "@mui/icons-material/Launch";
import { Image } from "react-bootstrap";
import Engine from "../../assets/engine.png";
import Transmission from "../../assets/manual-transmission.png";
import Power from "../../assets/thunderbolt.png";
import Gear from "../../assets/gear.png";
import Mileage from "../../assets/speedometer.png";
import Seat from "../../assets/car-seat.png";
import CarLength from "../../assets/length.png";
import Fuel from "../../assets/gasoline-pump.png";
import googleMapImage from "../../assets/google-maps.png";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingScreen } from "../Loading/Loading";
import Carousel from "react-material-ui-carousel";
import { Circle } from "@mui/icons-material";
import EmiCalculator from "./EmiCalculator";
import {
  setDetailData,
  setSelectedCarAndVariantData,
} from "../../store/DetailAction";
import { setSelectedVariantData } from "../../store/DetailAction";
import { priceAbbr } from "../priceAbbr";

const keySpecification = [
  { name: "Engine", image: Engine, value: "2.7 L" },
  { name: "Transmission", image: Transmission, value: "Manual" },
  { name: "BHP", image: Power, value: "201.15" },
  { name: "Torque", image: Gear, value: "500Nm" },
  { name: "Mileage", image: Mileage, value: "10.0 kmpl" },
  { name: "Seats", image: Seat, value: "7" },
  { name: "Length", image: CarLength, value: "4795mm" },
  { name: "Fuel", image: Fuel, value: "Petrol" },
];

// STYLED COMPONENTS
const CarDetailImage = styled((props) => <Box {...props} />)(({ theme }) => ({
  width: "100%",
  padding: 0,
  minWidth: 600,
  height: 400,
  borderRadius: 30,
  filter: "dropshadow(1px 3px 10px rgba(0, 0, 0, 0.5))",
  "& .car-image": {
    margin: "auto",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: "4px solid black",
    borderRadius: 30,
  },
}));

const ColourSelector = styled((props) => (
  <Box
    {...props}
    sx={{
      backgroundColor: props.colour,
    }}
  />
))(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 5,
  // backgroundColor: '#868897',
  boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
}));

export const OptionBox = styled((props) => (
  <Stack direction="row" justifyContent="space-between" {...props} />
))(({ theme }) => ({
  width: 200,
  padding: "16px 10px ",
  backgroundColor: "#EFEFEF",
  borderRadius: 10,
  boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
  "& *": {
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis",
  },
  "& :first-of-type": {
    fontSize: 18,
    fontWeight: 500,
  },
}));

const KeySpecificationBox = styled((props) => (
  <Stack direction="row" {...props} />
))(({ theme }) => ({
  width: "100%",
  padding: 16,
  backgroundColor: "#EFEFEF",
  borderRadius: 30,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(128px,1fr))",
  gap: 16,
}));

const KeySpecificationItem = styled((props) => (
  <Stack flexWrap spacing={0.5} {...props} />
))(({ theme }) => ({
  minWidth: 128,
  minHeight: 150,
  padding: 16,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 30,
  boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.25) inset",
}));

export const SpecificationAccordionSummary = styled((props) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  "*": {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  ".MuiAccordionSummary-root.Mui-expanded": {
    borderTop: "1px solid red",
  },
}));

const ShowroomCard = styled((props) => <Stack {...props} />)(({ theme }) => ({
  width: "100%",
  padding: 16,
  backgroundColor: "#EFEFEF",
  borderRadius: 30,
  boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.25) inset",
}));

// Emi calculator function
const emiCalculate = (loanAmount, rate, years) => {
  const monthlyInterestRatio = rate / 100 / 12;
  const month = years * 12;
  var top = Math.pow(1 + monthlyInterestRatio, month);
  var sp = top / (top - 1);
  return (loanAmount * monthlyInterestRatio * sp).toFixed();
};

function CarDetail() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.detail.loading);
  const [lat, long] = useSelector((state) => state.detail.coordinates);
  const detailData = useSelector((state) => state.detail.car);
  const selectedVariantData = useSelector(
    (state) => state.detail.selectedVariant
  );
  const allVariantsData = useSelector((state) => state.detail.car.variants);
  const { showrooms, showroomLoading, cityName } = useSelector(
    (state) => state.detail
  );

  // Variant Box
  const [openVariantBox, setVariantBoxOpen] = useState(false);

  const handleVariantBoxOpen = () => {
    setSelectedVariantIndex(selectedVariantId);
    setVariantBoxOpen(true);
  };

  const handleVariantBoxClose = () => {
    setVariantBoxOpen(false);
  };

  // Emi Box
  const [openEmiBox, setEmiBoxOpen] = useState(false);

  const handleEmiBoxOpen = () => {
    setEmiBoxOpen(true);
  };
  const handleEmiBoxClose = () => {
    setEmiBoxOpen(false);
  };

  // Select variant
  const selectedVariantId = useSelector(
    (state) => state.detail.selectedVariant._id
  );
  const [selectedVariantIndex, setSelectedVariantIndex] = useState();

  const handleVariantClick = (event, variant) => {
    setSelectedVariantIndex(variant);
    dispatch(setSelectedVariantData(variant, state._id));
    setVariantBoxOpen(false);
  };

  const onLoadData = async () => {
    if (state?.variant) {
      dispatch(
        setSelectedCarAndVariantData(state._id, state.variant, lat, long)
      );
    } else dispatch(setDetailData(state._id, lat, long));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    onLoadData();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    onLoadData();
  }, [state, lat]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box className="mx-auto" pb={3} sx={{ width: "85vw" }}>
          <Stack direction="row" my={4} spacing={5} flexWrap>
            <CarDetailImage>
              <Carousel
                autoPlay={true}
                duration={1000}
                animation={"fade"}
                swipe={true}
                navButtonsAlwaysVisible={true}
                fullHeightHover={false}
                indicators={true}
                IndicatorIcon={<Circle sx={{ fontSize: 10 }} />}
                indicatorIconButtonProps={{
                  style: {
                    margin: "0px 2px",
                    color: "var(--primary-color)",
                    opacity: 0.6,
                  },
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    color: "var(--secondary-color)",
                    fontSize: "14px !important",
                    opacity: 1,
                  },
                }}
                indicatorContainerProps={{
                  style: {
                    marginTop: "3px",
                  },
                }}
                sx={{ width: "100%", height: "calc(100% + 9px)" }}
              >
                {detailData.images &&
                  detailData.images.map((image, index) => (
                    <img
                      key={`carousel-image-${index}`}
                      className="car-image"
                      src={image}
                      alt=""
                    />
                  ))}
              </Carousel>
            </CarDetailImage>
            <Stack spacing={1} py={2}>
              <Typography
                className="text-capitalize"
                fontSize={36}
                fontWeight={600}
                sx={{ color: "var(--primary-color) !important" }}
              >
                {detailData.company} {detailData.name}
              </Typography>
              <Typography
                className="text-capitalize"
                fontSize={32}
                fontWeight={600}
                sx={{ color: "var(--secondary-color) !important" }}
              >
                {selectedVariantData.name}
              </Typography>
              <div>
                <Typography fontSize={28} fontWeight={500}>
                  Rs. {priceAbbr(selectedVariantData.price)}*
                </Typography>
                <Typography fontSize={12}>*Ex-showroom Price</Typography>
              </div>
              {/* <Typography variant="h6" className='d-flex align-items-center'>
                                Rating - &nbsp;<Rating
                                    name="read-only-rating"
                                    value={4.5}
                                    precision={0.1}
                                    readOnly
                                    icon={<StarRoundedIcon fontSize='inherit' color='warning' />}
                                />
                            </Typography> */}
              <Typography fontSize={24} fontWeight={500}>
                Colours
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {["black", "grey", "white", "#2c387e", "#b52a2a", "orange"].map(
                  (colour) => (
                    <ColourSelector key={colour} colour={colour} />
                  )
                )}
              </Stack>
              <Stack direction="row" spacing={3} pt={2}>
                <OptionBox onClick={handleVariantBoxOpen}>
                  <Box className="option-detail">
                    <Typography>Variants</Typography>
                    <Typography>{selectedVariantData.name}</Typography>
                  </Box>
                  <Stack justifyContent="center" className="align-middle">
                    <ChevronRightRoundedIcon fontSize="large" />
                  </Stack>
                </OptionBox>
                <OptionBox onClick={handleEmiBoxOpen}>
                  <Box className="option-detail">
                    <Typography className="text-capitalize">
                      {detailData.name} EMI
                    </Typography>
                    <Typography>
                      Rs.
                      {priceAbbr(
                        emiCalculate(selectedVariantData.price * 0.9, 9, 5)
                      )}{" "}
                      per month
                    </Typography>
                  </Box>
                  <Stack justifyContent="center" className="align-middle">
                    <ChevronRightRoundedIcon fontSize="large" />
                  </Stack>
                </OptionBox>
                <NavLink to="/car/compare" state={{ carOneData: detailData }}>
                  <OptionBox>
                    <Box className="option-detail">
                      <Typography>Compare Cars</Typography>
                      <Typography>Compare {detailData.name}</Typography>
                    </Box>
                    <Stack justifyContent="center" className="align-middle">
                      <ChevronRightRoundedIcon fontSize="large" />
                    </Stack>
                  </OptionBox>
                </NavLink>
              </Stack>
            </Stack>
          </Stack>
          <Box pl={1}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ color: "var(--secondary-color) !important" }}
              className="text-left"
            >
              Key Specifications
            </Typography>
          </Box>
          <Box>
            <KeySpecificationBox mt={3} sx={{ pointerEvents: "none" }}>
              {keySpecification.map((item) => (
                <KeySpecificationItem key={`specification-${item.name}`}>
                  <Image fluid rounded src={item.image} alt="" width={64} />
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    className="text-center"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    className="text-center"
                    color="#4D4C4C"
                  >
                    {item.value}
                  </Typography>
                </KeySpecificationItem>
              ))}
            </KeySpecificationBox>
          </Box>
          <Box pl={1} mt={3}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ color: "var(--secondary-color) !important" }}
              className="text-left"
            >
              All Specifications
            </Typography>
          </Box>
          <Box mt={3}>
            <Paper elevation={5}>
              {carData.map((row) => (
                <Accordion key={`specification-${row.title}`} disableGutters>
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
                        {row.data.map((spec) => (
                          <TableRow key={`spec-${spec.key}`}>
                            <TableCell
                              sx={{ fontWeight: 600, fontSize: "1.1rem" }}
                            >
                              {spec.key}
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: 500, fontSize: "1.1rem" }}
                            >
                              {spec.value}
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

          <Box pl={1} mt={3}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ color: "var(--secondary-color) !important" }}
              className="text-left"
            >
              Showrooms
            </Typography>
          </Box>
          <Box mt={3}>
            {showroomLoading ? (
              " Loading..."
            ) : showrooms?.length ? (
              showrooms?.map((showroom, index) => {
                return (
                  <ShowroomCard
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" gap={2}>
                      <Box width="32px" sx={{ aspectRatio: 1 }}>
                        <img
                          src={googleMapImage}
                          alt="map-icon"
                          width="32px"
                          style={{ aspectRatio: 1, objectFit: "cover" }}
                        />
                      </Box>
                      <Typography
                        fontSize="20px"
                        fontWeight={500}
                        className="text-left"
                        sx={{ color: "var(--primary-color)" }}
                      >
                        {showroom?.name}, {cityName}
                      </Typography>
                    </Stack>
                    <Link
                      href={showroom?.link}
                      target="_blank"
                      sx={{ textDecoration: "none" }}
                    >
                      <Button
                        size="large"
                        variant="text"
                        color="success"
                        sx={{
                          borderRadius: "15px",
                          textTransform: "none",
                        }}
                        startIcon={<LaunchIcon />}
                      >
                        Launch Google Map
                      </Button>
                    </Link>
                  </ShowroomCard>
                );
              })
            ) : (
              <Stack>
                <Typography
                  fontSize="20px"
                  fontWeight={500}
                  className="text-center"
                >
                  No Nearby Showrooms Found
                </Typography>
              </Stack>
            )}
          </Box>

          {/* Variant Box */}
          <Dialog
            open={openVariantBox}
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "15px",
                bgcolor: "#EFEFEF",
              },
            }}
            onClose={handleVariantBoxClose}
          >
            <DialogTitle>
              <Typography fontWeight={600} fontSize={32}>
                Variants
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: "0 !important" }}>
              {allVariantsData &&
                allVariantsData.map((variant) => (
                  <List
                    component="nav"
                    disablePadding
                    key={variant._id}
                    sx={{ borderTop: "1px solid #4D4C4C", minWidth: 420 }}
                  >
                    <ListItemButton
                      selected={selectedVariantIndex === variant._id}
                      onClick={(event) =>
                        handleVariantClick(event, variant._id)
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

          {/* Emi calculator */}
          <EmiCalculator
            open={openEmiBox}
            price={selectedVariantData.price}
            emiCalculate={emiCalculate}
            handleEmiBoxClose={handleEmiBoxClose}
          />
        </Box>
      )}
    </>
  );
}

export default CarDetail;

const carData = [
  {
    title: "Engine & Transamission",
    data: [
      {
        key: "Engine",
        value: "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      },
      { key: "Engine Type", value: "1.2 Kappa" },
      { key: "Fuel Type", value: "Petrol" },
      { key: "Max Power (bhp)", value: "82" },
      { key: "Max Torque (Nm)", value: "113.8" },
      { key: "Mileage (ARAI)", value: "17.5 kmpl" },
      { key: "Driving Range", value: "789 Km" },
      { key: "Drivetrain", value: "FWD" },
      { key: "Transmission", value: "Manual - 5 Gears" },
      { key: "Emission Standard", value: "BS 6" },
      { key: "Accelaration", value: "10.4 seconds" },
    ],
  },
  {
    title: "Dimensions & Weight",
    data: [
      { key: "Length", value: "3995 mm" },
      { key: "Width", value: "1770 mm" },
      { key: "Height", value: "1617 mm" },
      { key: "Wheelbase", value: "2500 mm" },
      { key: "Ground Clearance", value: "195 mm" },
    ],
  },
  {
    title: "Capacity",
    data: [
      { key: "Doors", value: "5 Doors" },
      { key: "No of Seating Rows", value: "2 Rows" },
      { key: "Fuel Tank Capacity", value: "45 Litres" },
    ],
  },
  {
    title: "Suspensions, Brakes, Steering & Tyres",
    data: [
      { key: "Front Suspension", value: "McPherson Strut with Coil Spring" },
      {
        key: "Rear Suspension",
        value: "Coupled Torsion Beam Axle with Coil Spring",
      },
      { key: "Front Brake Type", value: "Disc" },
      { key: "Rear Brake Type", value: "Drum" },
      { key: "Steering Type", value: "Power assisted (Electric)" },
      { key: "Wheels", value: "Steel Rims" },
      { key: "Spare Wheel", value: "Steel" },
      { key: "Front Tyres", value: "195 / 65 R15" },
      { key: "Rear Tyres", value: "195 / 65 R15" },
    ],
  },
  {
    title: "Safety",

    data: [
      {
        key: "Overspeed Warning",
        value: "1 beep over 80kmph, Continuous beeps over 120kmph",
      },
      { key: "Emergency Brake Light Flashing", value: "No" },
      { key: "Puncture Repair Kit", value: "No" },
      { key: "NCAP Rating", value: "Not Tested" },
      { key: "Airbags", value: "2 Airbags (Driver, Front Passenger)" },
      { key: "Middle rear three-point seatbelt", value: "No" },
      { key: "Middle Rear Head Rest", value: "No" },
      { key: "Tyre Pressure Monitoring System (TPMS)", value: "No" },
      { key: "Child Seat Anchor Points", value: "Yes" },
      { key: "Seat Belt Warning", value: "Yes" },
    ],
  },
  {
    title: "Braking & Traction",
    data: [
      { key: "Anti-Lock Braking System (ABS)", value: "Yes" },
      { key: "Electronic Brake-force Distribution (EBD)", value: "Yes" },
      { key: "Brake Assist (BA)", value: "No" },
      { key: "Electronic Stability Program (ESP)", value: "No" },
      { key: "Hill Hold Control", value: "No" },
      { key: "Traction Control System (TC/TCS)", value: "No" },
      { key: "Hill Descent Control", value: "No" },
    ],
  },
  {
    title: "Locks & Security",
    data: [
      { key: "Engine immobilizer", value: "Yes" },
      { key: "Central Locking", value: "With Key" },
      { key: "Speed Sensing Door Lock", value: "Yes" },
      { key: "Child Safety Lock", value: "Yes" },
    ],
  },
  {
    title: "Comfort & Convenience",
    data: [
      { key: "Air Conditioner", value: "Yes (Manual)" },
      { key: "Front AC", value: "Single Zone, Common Fan Speed Control" },
      { key: "Rear AC", value: "-" },
      { key: "Heater", value: "Yes" },
      { key: "Vanity Mirrors on Sun Visors", value: "No" },
      { key: "Cabin-Boot Access", value: "Yes" },
      { key: "Hill Descent Control", value: "No" },
    ],
  },
];
