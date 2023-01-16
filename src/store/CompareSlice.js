import { createSlice } from "@reduxjs/toolkit";

const initialCompareState = {
  loading: false,
  carOne: null,
  variantOne: null,
  carTwo: null,
  variantTwo: null,
};

const compareSlice = createSlice({
  name: "compare",
  initialState: initialCompareState,
  reducers: {
    replaceCarOneData(state, action) {
      state.carOne = action.payload;
    },
    replaceVariantOneData(state, action) {
      state.variantOne = {
        ...action.payload,
        specs: [
          {
            title: "Engine & Transamission",
            data: [
              {
                key: "Engine",
                value: "2487 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
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
              {
                key: "Length",
                value: "3995 mm",
              },
              { key: "Width", value: "1770 mm" },
              { key: "Height", value: "1617 mm" },
              { key: "Wheelbase", value: "2500 mm" },
              { key: "Ground Clearance", value: "195 mm" },
            ],
          },
          {
            title: "Capacity",
            data: [
              {
                key: "Doors",
                value: "5 Doors",
              },
              { key: "No of Seating Rows", value: "2 Rows" },
              { key: "Fuel Tank Capacity", value: "45 Litres" },
            ],
          },
          {
            title: "Suspensions, Brakes, Steering & Tyres",
            data: [
              {
                key: "Front Suspension",
                value: "McPherson Strut with Coil Spring",
              },
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
              {
                key: "Anti-Lock Braking System (ABS)",
                value: "Yes",
              },
              {
                key: "Electronic Brake-force Distribution (EBD)",
                value: "Yes",
              },
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
              {
                key: "Engine immobilizer",
                value: "Yes",
              },
              { key: "Central Locking", value: "With Key" },
              { key: "Speed Sensing Door Lock", value: "Yes" },
              { key: "Child Safety Lock", value: "Yes" },
            ],
          },
          {
            title: "Comfort & Convenience",
            data: [
              {
                key: "Air Conditioner",
                value: "Yes (Manual)",
              },
              {
                key: "Front AC",
                value: "Single Zone, Common Fan Speed Control",
              },
              { key: "Rear AC", value: "-" },
              { key: "Heater", value: "Yes" },
              { key: "Vanity Mirrors on Sun Visors", value: "No" },
              { key: "Cabin-Boot Access", value: "Yes" },
              { key: "Hill Descent Control", value: "No" },
            ],
          },
          {
            title: "Braking & Traction",
            data: [
              {
                key: "Anti-Lock Braking System (ABS)",
                value: "Yes",
              },
              {
                key: "Electronic Brake-force Distribution (EBD)",
                value: "Yes",
              },
              { key: "Brake Assist (BA)", value: "No" },
              { key: "Electronic Stability Program (ESP)", value: "No" },
              { key: "Hill Hold Control", value: "No" },
              { key: "Traction Control System (TC/TCS)", value: "No" },
              { key: "Hill Descent Control", value: "No" },
            ],
          },
        ],
      };
    },
    replaceVariantTwoData(state, action) {
      state.variantTwo = {
        ...action.payload,
        specs: [
          {
            title: "Engine & Transamission",
            data: [
              {
                key: "Engine",
                value: "2487 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
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
              {
                key: "Length",
                value: "3995 mm",
              },
              { key: "Width", value: "1770 mm" },
              { key: "Height", value: "1617 mm" },
              { key: "Wheelbase", value: "2500 mm" },
              { key: "Ground Clearance", value: "195 mm" },
            ],
          },
          {
            title: "Capacity",
            data: [
              {
                key: "Doors",
                value: "5 Doors",
              },
              { key: "No of Seating Rows", value: "2 Rows" },
              { key: "Fuel Tank Capacity", value: "45 Litres" },
            ],
          },
          {
            title: "Suspensions, Brakes, Steering & Tyres",
            data: [
              {
                key: "Front Suspension",
                value: "McPherson Strut with Coil Spring",
              },
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
              {
                key: "Anti-Lock Braking System (ABS)",
                value: "Yes",
              },
              {
                key: "Electronic Brake-force Distribution (EBD)",
                value: "Yes",
              },
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
              {
                key: "Engine immobilizer",
                value: "Yes",
              },
              { key: "Central Locking", value: "With Key" },
              { key: "Speed Sensing Door Lock", value: "Yes" },
              { key: "Child Safety Lock", value: "Yes" },
            ],
          },
          {
            title: "Comfort & Convenience",
            data: [
              {
                key: "Air Conditioner",
                value: "Yes (Manual)",
              },
              {
                key: "Front AC",
                value: "Single Zone, Common Fan Speed Control",
              },
              { key: "Rear AC", value: "-" },
              { key: "Heater", value: "Yes" },
              { key: "Vanity Mirrors on Sun Visors", value: "No" },
              { key: "Cabin-Boot Access", value: "Yes" },
              { key: "Hill Descent Control", value: "No" },
            ],
          },
          {
            title: "Braking & Traction",
            data: [
              {
                key: "Anti-Lock Braking System (ABS)",
                value: "Yes",
              },
              {
                key: "Electronic Brake-force Distribution (EBD)",
                value: "Yes",
              },
              { key: "Brake Assist (BA)", value: "No" },
              { key: "Electronic Stability Program (ESP)", value: "No" },
              { key: "Hill Hold Control", value: "No" },
              { key: "Traction Control System (TC/TCS)", value: "No" },
              { key: "Hill Descent Control", value: "No" },
            ],
          },
        ],
      };
    },
    replaceCarTwoData(state, action) {
      state.carTwo = action.payload;
    },
    setCompareLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const compareActions = compareSlice.actions;

export default compareSlice;
