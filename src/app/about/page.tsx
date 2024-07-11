import React from 'react'
import Banner from '@/components/shared/Banner'

const About = () => {
   
  return (
    <div>
      <div className="xl:pl-[57px] xl:pr-[102px] lg:pl-[57px] lg:pr-[102px] md:pl-[47px] md:pr-[102px] sm:pl-[20px] sm:pr-[28px] xs:px-[18px]">

        <div>
          <h1 className=" font-semibold text-center py-2 xl:text-[24px] lg:text-[28px] md:text-[24px] sm:text-[22px] xs:text-[18px]">About Furniro</h1>
          <p  className='lg:text-base md:text-base sm:text-sm xs:text-xs text-justify'>Welcome to Furniro, your ultimate destination for high-quality furniture. We are passionate about providing our customers with the best in furniture design, craftsmanship, and service.</p>
        </div>
   
        <div>  
          <h2 className="font-semibold text-center py-2 xl:text-[24px] lg:text-[28px] md:text-[24px] sm:text-[22px] xs:text-[18px]">Our Mission</h2>
          <p className='lg:text-base md:text-base sm:text-sm xs:text-xs text-justify'>At Furniro, our mission is to make your home furnishing dreams a reality. We strive to offer a wide range of furniture options to suit every style and budget, ensuring that you find the perfect pieces to create your ideal living space.</p>
        </div>

        <div>
          <h2 className="font-semibold text-center py-2 xl:text-[24px] lg:text-[28px] md:text-[24px] sm:text-[22px] xs:text-[18px]">Our Values</h2>
         

          <ul className="xl:grid xl:grid-cols-4 xl:gap-8 lg:grid lg:grid-cols-3 lg:gap-6 md:grid md:grid-cols-2 md:gap-6 sm:grid sm:grid-cols-2 sm:gap-4 xs:grid xs:grid-cols-2 xs:gap-4 lg:text-base lg:leading-7 md:text-sm md:leading-6 sm:text-sm sm:leading-6 xs:text-xs xs:leading-5 text-justify">

            <li className='bg-skincolor xl:p-5 lg:p-4 md:p-3 sm:p-2 xs:p-2 flex flex-col'>
              <span className='text-center font-semibold lg:text-lg md:text-base sm:text-base xs:text-sm'>Quality</span>
              <span>We source our furniture from trusted manufacturers known for their craftsmanship and attention to detail.</span>
            </li>

            <li className='bg-skincolor xl:p-5 lg:p-4 md:p-3 sm:p-2 xs:p-2 flex flex-col'>
              <span className='text-center font-semibold lg:text-lg md:text-base sm:text-base xs:text-sm'>Customer Satisfaction</span>
              <span>Your satisfaction is our top priority. We are dedicated to providing exceptional service and support throughout your shopping experience.</span>
            </li>

            <li className='bg-skincolor xl:p-5 lg:p-4 md:p-3 sm:p-2 xs:p-2 flex flex-col'>
              <span className='text-center font-semibold lg:text-lg md:text-base sm:text-base xs:text-sm'>Style</span>
              <span>From classic designs to modern trends, we curate our collection to offer a diverse selection of furniture styles to complement any home.</span>
            </li>
            <li className='bg-skincolor xl:p-5 lg:p-4 md:p-3 sm:p-2 xs:p-2 flex flex-col'>
              <span className='text-center font-semibold lg:text-lg md:text-base sm:text-base xs:text-sm'>Sustainability</span>
              <span>We are mindful of our environmental impact and strive to offer eco-friendly furniture options whenever possible.</span>
            </li>
          </ul>
        </div>

        <div className='flex flex-col justify-center text-center md:py-5 sm:py-3 xs:py-3'>
          <span className="font-medium xl:text-2xl lg:text-2xl md:text-xl sm:text-lg xs:text-base">Visit Us</span>
          <span className="xl:text-base lg:text-base md:text-sm sm:text-xs xs:text-xs xl:py-3 lg:py-2 xs:py-1">We invite you to visit our showroom located at</span>
          <span className="xl:text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">Furniro - Furniture Store in Sector 17C, Chandigarh</span>
        </div>

      </div>
      <Banner />
    </div>
  )
}

export default About;
