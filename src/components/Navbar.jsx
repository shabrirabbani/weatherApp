import React from 'react'

export default function Navbar() {
  return (
    <div className="bg-gray-900 rounded-lg shadow m-4">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className='flex items-center md:ms-4'>
            <img src="/logo.svg" alt="" className='w-16 h-16' />
            <p className='font-bold text-xl text-white ms-1 pb-3 pt-3'>Weather App</p>
        </div>
        <hr className="border-gray-700 mx-auto pb-5" />
      </div>
    </div>
  );
}
