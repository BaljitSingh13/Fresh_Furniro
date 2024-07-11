import React from 'react'
// import spinner from '@/assets/spinner.gif'
import Image from 'next/image'
const Spinner = () => {
  return (
    <div className='mt-20'>
      <Image src="/assets/spinner.gif" alt={"spinner"} height={180} width={180} className="text-center text-dark mx-auto"></Image>
    </div>
  )
}

export default Spinner
