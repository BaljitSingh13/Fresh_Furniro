import React from 'react'
import BreadCrumbs from './BreadCrumbs'
import Image from 'next/image'

type props={
  pageTitle:string,
  crumbs:string,
}
const Shared_Section = ({pageTitle ,crumbs}:props) => {
  return (
    <div className="bg-no-repeat object-fill bg-[url('/images/blur_breadcrumb.png')] w-auto md:h-[316px] sm:h-[280px] xs:h-[230px] flex flex-col items-center text-center justify-center " >
       <div className='flex flex-col items-center text-center justify-center'>
       <img src='/images/Meubel House_Logos-05.png' alt='Logo' height={32} width={50} className='md:h-8 md:w-12 sm:h-6 sm:w-10 xs:h-5 xs:w-9 '/>
        <p className='lg:text-5xl lg:leading-[72px] md:text-4xl md:leading-[55px] sm:text-3xl sm:leading-[45px] xs:text-2xl xs:leading-[40px] font-medium '>{pageTitle}</p>
        <BreadCrumbs crumbs={crumbs} />
       </div>
    </div>
  )
}

export default Shared_Section
