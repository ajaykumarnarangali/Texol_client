import { useState } from 'react'
import Question from '../components/Question';
import ProgressBar from '../components/Progressbar';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { saveTestResult } from '../utils/saveTestResult'
import { useAuth } from '../context/AuthContex';

function Home() {

  const navigate = useNavigate();

  const { token } = useAuth();

  const url = `${import.meta.env.VITE_API_URL}/api/qns/get-questions`
  const [isOpen, setisOpen] = useState(true);
  //custom hook for qn fectching
  const { data: questions } = useFetch(url);

  //show qn based on page
  const [currentQn, setCurrentQn] = useState(0);

  //each qn selected ans 
  const [selectedAns, setSelectedAns] = useState({});

  //show sidebar based on click
  const handleSidebar = () => {
    setisOpen(prev => !prev);
  }

  const handleCurrentPage = (number) => {
    setCurrentQn(() => number)
  }


  //storing data in back end localstorage for showing total
  //calculating total score
  const handleScore = async () => {
    let score = 0;
    const answers = [];
    questions.forEach((qn, i) => {
      const selected = selectedAns[i];
      const correct = qn.answers.find(ans => ans.value === selected && ans.isTrue);
      if (correct) {
        score += 5;
      }

      answers.push({
        questionId: qn._id,
        selectedAnswer: selected,
        isCorrect: correct?.isTrue ? true : false
      });

    });
    localStorage.setItem('result', score);
    const id = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('id', id);
    const payLoad = {
      score,
      completedAt: Date.now(),
      answers
    }
    const success = await saveTestResult(payLoad, token);
    if (success) {
      navigate('/result')
    }
  };
  console.log(currentQn);

  return (
    <div className='w-full min-h-screen md:h-full flex flex-col md:flex-row  font-poppins'>

      <div className={`w-full h-64 border-r-2 md:h-full md:w-64 lg:w-72 ${isOpen ? '' : 'absolute sidebar-closed'} sidebar-transition flex items-end md:items-center lg:items-end`}
      >
        <div className='bg-white h-fit md:h-[608px] w-full py-8 px-4 flex flex-col justify-between'>

          <div className='py-4 grid grid-cols-5 md:grid-cols-4 md:grid-rows-3 gap-2'>
            {
              Array(10).fill(0).map((_, i) => (
                <div
                  key={i}
                  className=
                  {`w-14 h-11 bg-selectBtn border border-selectedBtn rounded-md cursor-pointer flex justify-center items-center shadow-lg font-poppins text-sm',
                    ${currentQn === i ? 'bg-gray-500' : ''}`}

                  onClick={() => handleCurrentPage(i)}
                >
                  {i + 1}
                </div>
              ))
            }
          </div>

          <div className="bg-white rounded-xl hidden md:block shadow-md px-4 py-2 w-full space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2BB673]"></span>
              <span>Attended</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A79E9E]"></span>
              <span>Not Attended</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-black bg-white"></span>
              <span>Yet to Attend</span>
            </div>
          </div>
        </div>

      </div>
      {
        questions?.length > 0 &&
        <div className={`flex-1 flex flex-col items-center ${isOpen ? 'lg:items-start' : 'items-center mt-20 sm:mt-0'} justify-center lg:justify-end gap-2 px-2 py-2 md:py-5`}>
          <div className='max-w-[908px] w-full relative '>
            <h1 className='text-xl text-buttonColor font-semibold text-center'>Asses Your
              <span className="text-buttonColor text-xl relative inline-block">
                <span className="z-10 relative ms-1">Intelligence</span>
                <span className="absolute bottom-1 left-0 w-full h-1 bg-yellow-400 -z-0"></span>
              </span>
            </h1>
            <ProgressBar currentQn={currentQn} />
            <span className={`lg:absolute top-16 z-50 text-2xl ${isOpen ? '-left-12' : '-left-64'} cursor-pointer`}
              onClick={handleSidebar}>
              <i className="fa-solid fa-table-columns"></i>
            </span>
          </div>
          <div className='max-w-[908px] w-full h-[563px] '>
            <Question qn={questions[currentQn]} currentQn={currentQn} setCurrentQn={setCurrentQn}
              setSelectedAns={setSelectedAns} selectedAns={selectedAns} handleScore={handleScore} />
          </div>
        </div>
      }
    </div>
  )
}

export default Home