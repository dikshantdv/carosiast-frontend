import React from 'react'
import { Stack } from "@mui/material"
import News from '../components/news/News'
import BrandsSlider from '../components/brands/BrandsSlider'
import CategorySlider from '../components/category/CategorySlider'
import CarListTrending from './carList/CarList'
import { useSelector } from 'react-redux'

function Home() {
    const menu = useSelector(state => state.menu.menus)
    return (
        <>
            <News />
            <Stack spacing={4} mx={10}>
                <BrandsSlider />
                <CategorySlider />
                {menu.map(item => <CarListTrending key={item.title} title={item.title} url={item.url} />)}
            </Stack>
        </>
    )
}

export default Home