import React from "react";
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import { setCarListData } from "../../store/CarListAction";
import { useDispatch } from "react-redux";

function FilterDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFilterBox, setOpenFilterBox] = React.useState(false);
  const [filterData, setFilterData] = React.useState({
    minPrice: null,
    maxPrice: null,
    transmission: [],
    fuelType: [],
  });

  const handleFilterBoxOpen = () => {
    setOpenFilterBox(true);
  };

  const handleFilterBoxClose = () => {
    setOpenFilterBox(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterData({ ...filterData, [name]: value });
  };

  //   Transmission checkbox handler
  const handleTransmissionCheckbox = (e) => {
    const index = filterData.transmission.indexOf(e.target.value);
    if (index === -1) {
      setFilterData({
        ...filterData,
        transmission: [...filterData.transmission, e.target.value],
      });
    } else {
      setFilterData({
        ...filterData,
        transmission: filterData.transmission.filter(
          (key) => key !== e.target.value
        ),
      });
    }
  };

  //   Fuel checkbox handler
  const handleFuelCheckbox = (e) => {
    const index = filterData.fuelType.indexOf(e.target.value);
    if (index === -1) {
      setFilterData({
        ...filterData,
        fuelType: [...filterData.fuelType, e.target.value],
      });
    } else {
      setFilterData({
        ...filterData,
        fuelType: filterData.fuelType.filter((key) => key !== e.target.value),
      });
    }
  };

  //   Apply filter
  const handleApplyFilters = () => {
    let query = null;
    if (filterData.maxPrice) {
      query = `price[lte]=${+filterData.maxPrice}`;
    }
    if (filterData.minPrice) {
      query = query
        ? query + `&price[gte]=${+filterData.minPrice}`
        : `price[gte]=${+filterData.minPrice}`;
    }
    if (filterData.fuelType.length > 0) {
      if (query) {
        query = query + "&";
      }
      filterData.fuelType.forEach((el) => {
        query = query ? query + `fuel=${el}` : `fuel=${el}`;
        if (filterData.fuelType.slice(-1) !== el) {
          query = query + "&";
        }
      });
    }
    if (filterData.transmission.length > 0) {
      if (query) {
        query = query + "&";
      }
      filterData.transmission.forEach((el) => {
        if (el === "Manual") {
          query = query ? query + `transmission=${el}` : `transmission=${el}`;
        } else {
          query = query
            ? query + `transmission[$ne]=${el}`
            : `transmission[$ne]=${el}`;
        }

        if (filterData.transmission.slice(-1) !== el) {
          query = query + "&";
        }
      });
    }
    handleFilterBoxClose();
    dispatch(setCarListData(query));
    navigate("/filter");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="error"
        size="small"
        startIcon={<FilterListIcon />}
        sx={{
          color: "white",
          backgroundColor: "error.main",
          fontWeight: "bold",
          fontFamily: "inherit",
        }}
        onClick={handleFilterBoxOpen}
      >
        Filter
      </Button>

      <Dialog
        open={openFilterBox}
        onClose={handleFilterBoxClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "15px",
            bgcolor: "#EFEFEF",
            minWidth: "580px",
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: "2px solid grey" }}>
          <Typography fontWeight={600} fontSize={28}>
            Filter Options
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Table
              size="small"
              sx={{
                width: "100%",
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
            >
              <TableBody>
                <TableRow sx={{ height: "56px" }}>
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      fontSize="18px"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Min Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      color="error"
                      type="number"
                      name="minPrice"
                      value={filterData.minPrice ?? ""}
                      size="small"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <strong>₹</strong>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ min: 0 }}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          fontWeight: "600",
                          fontSize: "1.2rem !important",
                          bgcolor: "#FFFFFF",
                          "& *": {
                            borderWidth: "0px",
                          },
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: "56px" }}>
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      fontSize="18px"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Max Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      color="error"
                      type="number"
                      name="maxPrice"
                      value={filterData.maxPrice ?? ""}
                      size="small"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <strong>₹</strong>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ min: 0 }}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          fontWeight: "600",
                          fontSize: "1.2rem !important",
                          bgcolor: "#FFFFFF",
                          "& *": {
                            borderWidth: "0px",
                          },
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: "56px" }}>
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      fontSize="18px"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Transmission
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormGroup sx={{ flexDirection: "row", gap: 2, ml: 2 }}>
                      <FormControlLabel
                        label={
                          <Chip
                            label="Automatic"
                            variant={
                              filterData.transmission.includes("Automatic")
                                ? "contained"
                                : "outlined"
                            }
                            sx={{ width: "100px", cursor: "pointer" }}
                          />
                        }
                        control={
                          <Checkbox
                            value="Automatic"
                            hidden
                            checked={filterData.transmission.includes(
                              "Automatic"
                            )}
                            onChange={handleTransmissionCheckbox}
                          />
                        }
                      />
                      <FormControlLabel
                        label={
                          <Chip
                            label="Manual"
                            variant={
                              filterData.transmission.includes("Manual")
                                ? "contained"
                                : "outlined"
                            }
                            sx={{ width: "100px", cursor: "pointer" }}
                          />
                        }
                        control={
                          <Checkbox
                            value="Manual"
                            hidden
                            checked={filterData.transmission.includes("Manual")}
                            onChange={handleTransmissionCheckbox}
                          />
                        }
                      />
                    </FormGroup>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: "56px" }}>
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      fontSize="18px"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Fuel
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormGroup sx={{ flexDirection: "row", gap: 2, ml: 2 }}>
                      <FormControlLabel
                        label={
                          <Chip
                            label="Petrol"
                            variant={
                              filterData.fuelType.includes("Petrol")
                                ? "contained"
                                : "outlined"
                            }
                            sx={{ width: "100px", cursor: "pointer" }}
                          />
                        }
                        control={
                          <Checkbox
                            value="Petrol"
                            hidden
                            checked={filterData.fuelType.includes("Petrol")}
                            onChange={handleFuelCheckbox}
                          />
                        }
                      />
                      <FormControlLabel
                        label={
                          <Chip
                            label="Diesel"
                            variant={
                              filterData.fuelType.includes("Diesel")
                                ? "contained"
                                : "outlined"
                            }
                            sx={{ width: "100px", cursor: "pointer" }}
                          />
                        }
                        control={
                          <Checkbox
                            value="Diesel"
                            hidden
                            checked={filterData.fuelType.includes("Diesel")}
                            onChange={handleFuelCheckbox}
                          />
                        }
                      />
                    </FormGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Stack direction="row" gap={3} alignContent="center" pt={2}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  color: "white",
                  backgroundColor: "var(--secondary-color)",
                  borderRadius: "15px",
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                    filter: "contrast(1.5)",
                  },
                }}
                onClick={handleFilterBoxClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  color: "white",
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "15px",
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                    filter: "brightness(1.5)",
                  },
                }}
                onClick={handleApplyFilters}
              >
                Apply
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export default FilterDialog;
