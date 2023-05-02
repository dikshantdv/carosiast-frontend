/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Button, Fab, Rating, Stack, Tooltip, Typography, } from "@mui/material"
import { styled } from "@mui/material/styles"
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCarListData } from '../../store/CarListAction'
import { LoadingScreen } from '../Loading/Loading';
import { priceAbbr } from '../priceAbbr';
// import Carousel from 'react-material-ui-carousel';
import Carousel from 'react-bootstrap/Carousel';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const CarItem = styled((props) => (
    <Stack {...props} />
))(({ theme }) => ({
    width: 'fit-content',
    height: 'fit-content',
    background: '#F3F3F3',
    boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.25)',
    borderRadius: 15,
    padding: 7,
    cursor: 'default',
}))

const CarItemImage = styled((props) => (
    <Box {...props} />
))(({ theme }) => ({
    width: 288,
    height: 192,
    borderRadius: 'inherit',
    '& .car-image': {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover',
        borderRadius: 'inherit',
    }
}))

const CarItemSummary = styled((props) => (
    <Stack direction='column' spacing={0.5} {...props} />
))(({ theme }) => ({
    width: 'initial',
    height: 'inherit',
    padding: '16px 8px 8px 8px',
}))

// Custom Fab
const CustomFab = styled((props) => (
    <Fab {...props} />
))(({ theme }) => ({
    color: 'white',
    backgroundColor: '#000',
    width: 24,
    height: 24,
    minHeight: 0,
    // top: '10%',
    '& :hover': {
        color: 'black'
    },
}))

function CarSummaryCard(props) {
    return (
        <CarItem direction={props.direction}>
            <CarItemImage>
                <img className='car-image' src={props.data.image} alt="" />
            </CarItemImage>
            <CarItemSummary>
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, textTransform: 'capitalize' }}>{props.data.name}</Typography>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 500, }}>{props.data.price_range}</Typography>
                <Typography className='d-flex align-items-center'>
                    Rating -
                    <Rating
                        name="read-only-rating"
                        value={props.data.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                        icon={<StarRoundedIcon fontSize='inherit' color='warning' />}
                    />
                </Typography>
                <Carousel
                    indicators={false}
                    touch={true}
                    prevIcon={<CustomFab size="small" sx={{ left: -10 }}>
                        <KeyboardArrowLeftRoundedIcon />
                    </CustomFab>}
                    nextIcon={<CustomFab size="small" sx={{ right: -10 }}>
                        <KeyboardArrowRightRoundedIcon />
                    </CustomFab>}
                    className="mt-2"
                    style={{ width: '100%', }}
                >
                    {props.data.variants.map(variant =>
                        <Carousel.Item key={`variant-carousel-${variant._id}`} className="py-1 px-4">
                            <Tooltip title={variant.name} arrow>
                                <NavLink to="/car/detail" state={{ _id: props.data.carId, variant: variant._id }}>
                                    <Button
                                        color="error"
                                        fontSize={18}
                                        fontWeight={600}
                                        fullWidth
                                        sx={{
                                            maxWidth: '220px',
                                            textTransform: 'initial',
                                            color: "var(--primary-color)",
                                            bgcolor: 'rgba(24, 22, 71, 0.1)',
                                        }}
                                    >
                                        <span style={{
                                            maxwidth: "180px",
                                            whiteSpace: 'nowrap',
                                            overflowX: "hidden",
                                            textOverflow: "ellipsis",
                                        }}>{variant.name}</span>
                                    </Button>
                                </NavLink>
                            </Tooltip>
                        </Carousel.Item>
                    )}
                </Carousel>
            </CarItemSummary>
        </CarItem>
    )
}


// Rendered component
export default function Filter() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.carList.loading)
    const data = useSelector(state => state.carList.cars)
    const {state} = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        state.company && dispatch(setCarListData(`company=${state.company}`))
        state.category && dispatch(setCarListData(`category=${state.category}`))
    }, [])
    return (
        <>{(loading) ? <LoadingScreen />
            :
            <Stack direction="column" gap={4} alignItems="center" className='mx-auto my-5' pb={3} sx={{ width: '85vw' }} >
                <Typography className="text-center" fontSize={28} fontWeight={600}>
                    {/* Filter:&nbsp;s */}
                    {state?.company ? <span className='text-capitalize text-decoration-underline'>Brand- {state.company}</span>
                    : state?.category ? <span className='text-decoration-underline'>Category- {state.name}</span>
                    :<span className='text-decoration-underline'>Filtered Data</span>}
                </Typography>
                <Box className='d-grid' sx={{ gridTemplateColumns: 'repeat(auto-fill,minmax(288px,288px))', gap: 5, width: "100%", }}>
                    {data.map(car =>
                        <CarSummaryCard
                            key={`car-${car._id}`}
                            direction="column"
                            data={{
                                image: car.images[0],
                                name: `${car.company} ${car.name}`,
                                price_range: `Rs. ${priceAbbr(car.minPrice)} - ${priceAbbr(car.maxPrice)}`,
                                rating: 4.5,
                                carId: car._id,
                                variants: car.variants
                            }}
                        />
                    )}
                </Box>
            </Stack>
        }
        </>
    )
}