import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { priceAbbr } from "../priceAbbr";

// const emiCalculate = (loanAmount, rate, years) => {
//     const monthlyInterestRatio = rate / 100 / 12;
//     const month = years * 12;
//     var top = Math.pow(1 + monthlyInterestRatio, month);
//     var sp = top / (top - 1);
//     return (loanAmount * monthlyInterestRatio * sp).toFixed();
// }

function EmiCalculator(props) {
  const [emiData, setEmiData] = useState({
    price: props.price,
    min_down_payment: props.price * 0.1,
    down_payment: props.price * 0.1,
    max_down_payment: props.price * 0.9,
    tenure: 5,
    interest_rate: 9,
  });

  const handleSliderChange = (key) => (event, newVal) => {
    setEmiData({ ...emiData, [key]: newVal });
  };
  const handleInputChange = (event) => {
    setEmiData({ ...emiData, down_payment: event.target.value });
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleEmiBoxClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "15px",
          bgcolor: "#EFEFEF",
          minWidth: "580px",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "2px solid grey" }}>
        <Typography fontWeight={600} fontSize={32}>
          EMI Calculator
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "20px 40px", width: "100%" }}>
        <Stack spacing={4} mt={3}>
          <Typography
            fontSize={24}
            fontWeight={500}
            sx={{ color: "var(--primary-color)" }}
          >
            Down Payment : ₹{priceAbbr(emiData.down_payment)}
          </Typography>
          <Slider
            value={emiData.down_payment}
            step={5000}
            min={emiData.min_down_payment}
            max={emiData.price * 0.9}
            valueLabelDisplay="on"
            onChange={handleSliderChange("down_payment")}
            marks={[
              {
                value: emiData.min_down_payment,
                label: `₹${priceAbbr(emiData.min_down_payment)}`,
              },
              {
                value: emiData.max_down_payment,
                label: `₹${priceAbbr(emiData.max_down_payment)}`,
              },
            ]}
            sx={{
              color: "black",
              "& .MuiSlider-valueLabel": {
                fontSize: "0.65rem",
                bgcolor: "black",
                borderRadius: 5,
              },
              '& .MuiSlider-markLabel[data-index="0"]': {
                left: "2% !important",
              },
              '& .MuiSlider-markLabel[data-index="1"]': {
                left: "94% !important",
              },
            }}
          />
          <Stack spacing={1} sx={{ width: "100%" }}>
            <TextField
              value={emiData.down_payment}
              size="small"
              onChange={handleInputChange}
              sx={{
                width: "60%",
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
            <Typography fontWeight={500} fontSize={14}>
              Your loan amount will be:{" "}
              <span style={{ color: "var(--primary-color)" }}>
                ₹{priceAbbr(emiData.price - emiData.down_payment)}
              </span>
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Stack spacing={4} sx={{ width: "40%" }}>
              <Typography
                fontSize={24}
                fontWeight={500}
                sx={{ color: "var(--primary-color)", whiteSpace: "nowrap" }}
              >
                Tenure : {emiData.tenure} years
              </Typography>
              <Slider
                value={emiData.tenure}
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="on"
                onChange={handleSliderChange("tenure")}
                marks={[
                  { value: 1, label: "1 year" },
                  { value: 10, label: "10 years" },
                ]}
                sx={{
                  color: "black",
                  "& .MuiSlider-valueLabel": {
                    fontSize: "0.65rem",
                    bgcolor: "black",
                    borderRadius: 5,
                  },
                  '& .MuiSlider-markLabel[data-index="0"]': {
                    left: "10% !important",
                  },
                  '& .MuiSlider-markLabel[data-index="1"]': {
                    left: "86% !important",
                  },
                }}
              />
            </Stack>
            <Stack spacing={4} sx={{ width: "40%" }}>
              <Typography
                fontSize={24}
                fontWeight={500}
                sx={{ color: "var(--primary-color)", whiteSpace: "nowrap" }}
              >
                Interest: {emiData.interest_rate}%
              </Typography>
              <Slider
                value={emiData.interest_rate}
                step={0.5}
                min={1}
                max={20}
                valueLabelDisplay="on"
                onChange={handleSliderChange("interest_rate")}
                marks={[
                  { value: 1, label: "1 %" },
                  { value: 20, label: "20 %" },
                ]}
                sx={{
                  color: "black",
                  "& .MuiSlider-valueLabel": {
                    fontSize: "0.65rem",
                    bgcolor: "black",
                    borderRadius: 5,
                  },
                  '& .MuiSlider-markLabel[data-index="0"]': {
                    left: "8% !important",
                  },
                  '& .MuiSlider-markLabel[data-index="1"]': {
                    left: "92% !important",
                  },
                }}
              />
            </Stack>
          </Stack>
          <Typography fontSize={24} fontWeight={500} pt={2}>
            <li>
              ₹
              {priceAbbr(
                props.emiCalculate(
                  emiData.price - emiData.down_payment,
                  emiData.interest_rate,
                  emiData.tenure
                )
              )}{" "}
              EMI fo r {emiData.tenure} years at {emiData.interest_rate}%
              interest
            </li>
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default EmiCalculator;
