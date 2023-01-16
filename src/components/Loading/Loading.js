import { Stack } from "@mui/material";
import React from "react";
import Lottie from 'react-lottie';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../../assets/car.json"),
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export const LoadingScreen = () => {
    return (
        <Stack>
            <Lottie options={defaultOptions}
                height={'auto'}
                width={'fit-content'}
                isStopped={false}
                isPaused={false}
            />
        </Stack>
    );
};