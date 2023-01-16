import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Home from '../components/Home'
import CarDetail from '../components/carDetail/CarDetail'
import CompareCars from '../components/compareCars/CompareCars'
import Filter from '../components/filter/Filter'
import Footer from '../components/footer/Footer'

function Routing() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/car/detail" element={<CarDetail />} />
                <Route path="/car/compare" element={<CompareCars />} />
                <Route path="/filter" element={<Filter />} />

                {/* Wildcard Route */}
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Routing