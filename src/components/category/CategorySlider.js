import React from 'react'
import { Box, Fab, Stack, Typography, } from '@mui/material'
import { styled } from "@mui/material/styles"
import { useSelector } from 'react-redux'
import Carousel from 'react-grid-carousel'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { NavLink } from 'react-router-dom'

const CategoryContainer = styled((props) => (
    <Stack direction='column' {...props} />
))(({ theme }) => ({
    width: 'fit-content',
    height: 'fit-content',
    cursor: 'pointer',
}))

const CategoryBox = styled((props) => (
    <Box {...props} />
))(({ theme }) => ({
    width: 216,
    height: 216,
    borderRadius: 15,
    '& .category-image': {
        height: 'inherit',
        width: 'inherit',
        objectFit: 'cover',
        borderRadius: 'inherit',
        filter: 'drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.25))',
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

function CategorySlider() {
    const categoryData = useSelector((state) => state.category.categories)

    return (
        <Box my={4}>
            <Typography variant="h4">
                <b>Category</b>
            </Typography>
            <Box className='w-100' my={3}>
                {/* <Box my={3} className='mx-auto d-grid' sx={{ gridTemplateColumns: 'repeat(auto-fill,minmax(244px,1fr))', gap: 2, }}>
                    {categoryData.map(category => (
                        <CategoryContainer key={`category - ${ category._id } `}>
                            <CategoryBox>
                                <img className='category-image' src={category.categoryUrl} alt="" />
                            </CategoryBox>
                            <Typography className='text-center' variant="h6" p={1}>
                                <b>{category._id}</b>
                            </Typography>
                        </CategoryContainer>
                    ))}
                </Box> */}
                <Carousel
                    cols={5}
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
                    {categoryData.map(category => (
                        <Carousel.Item key={`category-${category._id}`} style={{ width: '100%' }}>
                            <NavLink to='/filter' state={{ category: category._id, name: category.name }}>
                                <CategoryContainer>
                                    <CategoryBox>
                                        <img className='category-image' src={category.categoryUrl} alt="" />
                                    </CategoryBox>
                                    <Typography className='text-center' variant="h6" p={1}>
                                        <b>{category.name}</b>
                                    </Typography>
                                </CategoryContainer>
                            </NavLink>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Box>
        </Box>
    )
}

export default CategorySlider