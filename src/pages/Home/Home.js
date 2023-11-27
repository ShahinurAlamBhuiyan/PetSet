import React from 'react'

import HomeCarousel from '../../components/Home/HomeCarousel'
import AboutUs from '../../components/Home/AboutUs'
import WhyChooseUs from '../../components/Home/WhyChooseUs'
import PopularSpecialist from '../../components/Home/PopularSpecialist'
import MemoryHigh from '../../components/Home/MemoryHigh'
import OurFeatures from '../../components/Home/OurFeatures'

const Home = () => {
    return (
        <div>
            <HomeCarousel />
            <AboutUs />
            <OurFeatures />
            <WhyChooseUs />
            <PopularSpecialist />
            <MemoryHigh />
        </div>
    )
}

export default Home