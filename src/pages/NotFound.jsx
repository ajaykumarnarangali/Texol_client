import { useNavigate } from 'react-router-dom'
import NOT_FOUND from '/not_found.jpg'

function NotFound() {
    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/home')
    }
    return (
        <div className='w-full h-full flex items-center justify-center p-2'>
            <div className='max-w-2xl flex flex-col gap-10'>
                <div>
                    <img src={NOT_FOUND} className='w-full' />
                </div>
                <div className='flex flex-col gap-6 items-center'>
                    <h1 className='font-poppins text-xl md:text-4xl text-center font-light'>Sorry, it looks like the page get</h1>
                    <button className='bg-buttonColor text-white rounded-md w-44 py-2' onClick={gotoHome}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound