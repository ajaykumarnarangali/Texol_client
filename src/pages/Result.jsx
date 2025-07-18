import { useState } from "react";
import check from '/check.png'
import Feedback from '../components/Feedback'
import { Link } from 'react-router-dom'

function Result() {

  const [result, setResult] = useState(localStorage.getItem('result') || '0')
  const [id, setId] = useState(localStorage.getItem('id') || '847233')

  return (
    <div className="h-full flex flex-col items-center justify-center px-4">

      <div className="flex flex-col items-center mt-4">
        <div className="text-5xl mb-4">
          <img src={check} alt="" className="w-16" />
        </div>
        <h1 className="text-lg sm:text-xl font-medium text-center">
          Congratulations you have Successfully Completed The Test
        </h1>
        <div className="flex items-center mt-2 text-lg font-semibold text-gray-700">
          Score :
          <span className="ml-2 bg-orangeButton px-4 py-1 rounded-full text-black font-bold">
            {result}/50
          </span>
        </div>
        <div className="mt-4 bg-buttonColor text-white font-semibold px-6 py-2 rounded-md text-lg">
          Your ID : {id}
        </div>
      </div>

      <div className="mt-10 w-full max-w-2xl bg-white rounded-md shadow p-6">
        <Feedback />
      </div>

      <Link to='/home'>
        <div className="md:mt-6 flex items-center text-sm text-gray-700 cursor-pointer hover:text-black gap-2">
          <span className='text-lg'>
            <i className="fa-solid fa-house-chimney"></i>
          </span>
          Back to home
        </div>
      </Link>
    </div>
  );
};

export default Result