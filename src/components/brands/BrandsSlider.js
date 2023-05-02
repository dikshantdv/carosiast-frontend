import React from 'react'
import { Box, Fab, Typography, } from '@mui/material'
import { styled } from "@mui/material/styles"
import Carousel from 'react-grid-carousel'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

const BrandBox = styled((props) => (
    <Box {...props} />
))(({ theme }) => ({
    width: 96,
    height: 96,
    cursor: 'pointer',
    border: `2px solid ${theme.palette.common.black}`,
    borderRadius: 15,
    boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.25)',
    '& .brand-image': {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'contain',
        borderRadius: 'inherit',
        padding: 7,
    }
}))

const CustomFab = styled((props) => (
    <Fab {...props} />
))(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    width: 28,
    height: 28,
    minHeight: 0,
    position: 'absolute',
    top: '40%',
    '& :hover': {
        color: 'black'
    },
}))

function BrandsSlider() {
    const brandData = useSelector(state => state.brand.brands)
    return (
        <Box my={4} id="brands">
            <Typography variant="h4">
                <b>Brands</b>
            </Typography>
            {/* <Box my={3} className='d-grid' sx={{ gridTemplateColumns: 'repeat(auto-fill,minmax(96px,1fr))', gap: 5, }}>
                {brandData.map(brand => (
                    <BrandBox key={`brand-${brand._id}`}>
                        <img className='brand-image' src={brand.logoUrl} alt="" />
                    </BrandBox>
                ))}
            </Box> */}
            <Box className='w-100' my={3}>
                <Carousel
                    cols={10}
                    rows={1}
                    loop
                    arrowLeft={
                        <CustomFab size="small" sx={{ left: -24, right: 'unset' }}>
                            <KeyboardArrowLeftRoundedIcon />
                        </CustomFab>}
                    arrowRight={
                        <CustomFab size="small" sx={{ left: 'unset', right: -24 }}>
                            <KeyboardArrowRightRoundedIcon />
                        </CustomFab>}
                    style={{
                        width: 'fit-content'
                    }}
                >
                    {brandData.map(brand =>
                        <Carousel.Item key={`brand-${brand._id}`}>
                            <NavLink to='/filter' state={{ company: brand._id, }}>
                                <BrandBox>
                                    <img className='brand-image' src={brand.logoUrl} alt="" />
                                </BrandBox>
                            </NavLink>
                        </Carousel.Item>
                    )}
                </Carousel>
            </Box>
        </Box>
    )
}

export default BrandsSlider