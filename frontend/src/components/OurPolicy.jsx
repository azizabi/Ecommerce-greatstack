import React from 'react'
import {assets} from '../assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5'/>
                <p className='font-semibold'>Easy Exhange Policy</p>
                <p className='text-gray-600'>We offer Hassele free Exhange policy</p>
            </div>
            <div>
                <img src={assets.quality_icon} className='w-12 m-auto mb-5'/>
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-600'>We provide 7 days free return policy</p>
            </div><div>
                <img src={assets.support_img} className='w-12 m-auto mb-5'/>
                <p className='font-semibold'>Best customer support</p>
                <p className='text-gray-600'>We provide 24/7 customer services</p>
            </div>
    </div>
  )
}

export default OurPolicy