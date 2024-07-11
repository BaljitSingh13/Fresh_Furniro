import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
const Footer = () => {
  return (
    <>
      <footer className='xl:mb-[20px] lg:mb-[10px] md:mb-[10px] sm:mb-[10px] xs:mb-[8px]'>  
      <div className='xl:flex xl:flex-col xl:pt-[48px] xl:px-[100px] xl:pb-[38px] xl:gap-[48px]  lg:flex lg:flex-col lg:pt-[48px] lg:px-[95px] lg:pb-[35px] lg:gap-[45px]  md:flex md:flex-col md:pt-[40px] md:px-[70px] md:pb-[20px] md:gap-[30px] sm:flex sm:flex-col sm:pt-[40px] sm:px-[70px] sm:pb-[20px] sm:gap-[30px]   xs:flex xs:flex-col xs:pt-[40px] xs:px-[40px] xs:pb-[20px] xs:gap-[30px]'>  
        
        {/* footer upper part */}
        <div className=' xl:flex xl:flex-row xl:gap-[5rem] lg:flex lg:flex-row lg:gap-[5rem] md:flex md:flex-col md:gap-[1rem] sm:flex sm:flex-col sm:gap-[1rem] xs:flex xs:flex-col xs:gap-[1rem]'>
          <div className='xl:flex-col xl:w-[25vw] lg:flex-col lg:w-[25vw] md:flex-col md:w-[100%] sm:flex-col sm:w-[100%]'>
            <h1 className='xl:font-bold xl:text-2xl xl:mb-[3rem] lg:font-bold lg:text-2xl lg:mb-[2.5rem]  md:font-bold md:text-2xl md:mb-[.5rem] sm:font-bold sm:text-xl sm:mb-[.5rem] xs:font-bold xs:text-xl xs:mb-[.5rem]'>Furniro.</h1>
            <p className='text-sm leading-6 font-normal text-light '>Furniro - Furniture Store in Sector 17C, Chandigarh</p>
          </div>

          {/* Left side whole part */}
            
          <div className='xl:flex xl:flex-nowrap xl:gap-16 lg:flex lg:flex-nowrap lg:gap-16 md:flex md:flex-nowrap md:gap-16 sm:flex sm:flex-wrap sm:gap-16 xs:flex xs:flex-wrap xs:gap-16'>   
      
            <div className='text-base '>
              <p className='text-light xl:mb-[3.4rem] lg:mb-[3rem] md:mb-[1rem] sm:mb-[.8rem] xs:mb-[.5rem] lg:text-base sm:text-md xs:text-sm'>Links</p>
              <ul className='xl:flex xl:flex-col xl:gap-[2.80rem] lg:flex lg:flex-col lg:gap-[2.2rem] md:flex md:flex-col md:gap-[1rem] sm:flex sm:flex-col sm:gap-[.5rem] xs:flex xs:flex-col xs:gap-[.5rem] md:font-semibold xs:font-medium lg:text-base sm:text-sm xs:text-xs '>
                <li><Link href='/home'>Home</Link></li>
                <li><Link href='/shop'>Shop</Link></li>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/contact'>Contact</Link></li>
              </ul>
            </div>

            <div className='text-base'>
              <p className='text-light xl:mb-[3.4rem] lg:mb-[3rem] md:mb-[1rem] sm:mb-[.8rem] xs:mb-[.5rem] lg:text-base sm:text-md xs:text-sm'>Help</p>
              <ul className='xl:flex xl:flex-col xl:gap-[2.80rem] lg:flex lg:flex-col lg:gap-[2.2rem]  md:flex md:flex-col md:gap-[1rem] sm:flex sm:flex-col sm:gap-[.5rem] xs:flex xs:flex-col xs:gap-[.5rem] md:font-semibold xs:font-medium lg:text-base sm:text-sm xs:text-xs'>
                <li><Link href='#'>Payment</Link></li>
                <li><Link href='#'>Returns</Link></li>
                <li><Link href='#'>Privacy Policies</Link></li>
              </ul>
            </div>

            <div className='text-base '>
              <p className=' text-light xl:mb-[3.4rem] lg:mb-[3rem] md:mb-[1rem] sm:mb-[.8rem]  xs:mb-[.5rem] xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 xs:mt-[-35px]'>Newsletter</p>
              <div className='sm:flex sm:flex-row xs:flex xs:flex-col'>
                <input type="email" name="email" id="email" placeholder='Enter Your Email Address' className='underline xl:border-black xl:mr-[1.5rem]  md:text-sm lg:border-black lg:mr-[1.2rem] md:border-black md:mr-[1.2rem] sm:border-black sm:mr-[1.2rem]  xs:border-black xs:mr-[1.2rem] text-sm'/>
                <Button variant="ghost" className='sm:justify-center xs:justify-normal xs:px-0 h-[1.4rem] rounded-none underline border-black hover:bg-white'>SUBSCRIBE</Button>
              </div>
            </div>
          </div>
        </div>

          {/* Footer lower part */}
          <div>
            <p className='xl:pt-[35px] lg:pt-[30px] md:pt-[20px] sm:pt-[15px] xs:pt-[10px] border-t-2 lg:text-base sm:text-sm xs:text-xs'>2023 furino.All rights reserved</p>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer
