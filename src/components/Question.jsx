import { useState, useEffect } from 'react'


function Question({ qn, currentQn, setCurrentQn, selectedAns, setSelectedAns,handleScore }) {
    const [selected, setSelected] = useState(selectedAns[currentQn] || "");

    //change selected option based on qn
    useEffect(() => {
        setSelected(selectedAns[currentQn] || "");
    }, [currentQn]);


    //select options 
    const handleSelect = (value) => {
        setSelected(value);
        setSelectedAns((prev) => ({
            ...prev,
            [currentQn]: value
        }));
    };

    return (
        <div className="p-6 w-full h-full bg-qnsBgC shadow rounded-md gap-3 flex flex-col">
            <div className='flex items-center gap-2'>
                <div className='w-12 h-12 rounded-full bg-buttonColor text-white flex items-center justify-center'>
                    {currentQn+1}
                </div>
                <p className="font-medium text-sm lg:text-lg">
                    {
                        qn?.question
                    }
                </p>
            </div>
            <div className='max-w-[847px] w-full h-[391px] bg-bodyColor rounded-lg px-8 py-6'>
                {qn?.answers?.map((option, i) => (
                    <label
                        key={i}
                        className={`flex items-center text-sm lg:text-base p-3 mb-2 w-56 rounded cursor-pointer transition
                    ${selected === option?.value
                                ? "bg-attended font-medium"
                                : "bg-notAttend hover:bg-gray-100 border-gray-300"
                            }`}
                        onClick={() => { handleSelect(option?.value) }}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value={option?.value}
                            checked={selected === option?.value}
                            onChange={() => setSelected(option.value)}
                            className="mr-3 accent-attended"
                        />
                        {option?.value}
                    </label>
                ))}
            </div>
            <div className="flex justify-between mt-4 px-3">
                <span className='text-xl'>
                    <i className="fa-regular fa-bookmark"></i>
                </span>
                <div className='flex gap-2'>
                    {
                        currentQn > 0 &&
                        < button className="bg-buttonColor text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                            onClick={() => { setCurrentQn(prev => prev - 1) }}>
                            ← Prev
                        </button>
                    }
                    {
                        currentQn < 9 &&
                        <button className="bg-buttonColor text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                            onClick={() => { setCurrentQn(prev => prev + 1) }}>
                            Next →
                        </button>
                    }
                    {
                        currentQn == 9 &&
                        <button className="bg-buttonColor text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                            onClick={handleScore}
                        >
                            submit
                        </button>
                    }
                </div>
            </div>
        </div >
    )
}

export default Question