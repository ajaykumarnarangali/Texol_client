import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Onboard() {

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleOnboard = () => {
    navigate('/sign-in');
  }

  return (
    <div className="h-screen flex flex-col px-4 bg-white py-5 md:py-10 lg:py-20">

      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="text-center mt-12 sm:mt-0">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
            Welcome to{" "}
            <span className="text-gray-900 relative inline-block">
              <span className="z-10 relative">TSEEP Mastery Box</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400 -z-0"></span>
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-500">
            Unlock your potential with{" "}
            <span className="font-semibold text-gray-700">AI inspired tool</span>
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <hr className="border-gray-200" />

        <div className="mt-6 px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <label className="flex items-start gap-2 text-gray-800 max-w-xl leading-snug font-poppins">
            <input
              type="checkbox"
              className="mt-1 accent-blue-600"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span className="text-sm sm:text-base">
              I confirm that I have read and accept the terms and conditions and privacy policy.
            </span>
          </label>

          <button
            disabled={!isChecked}
            onClick={handleOnboard}
            className="px-6 py-2 rounded-md text-white font-semibold bg-buttonColor cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboard