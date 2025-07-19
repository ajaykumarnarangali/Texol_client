import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '/logo.png'
import { useAuth } from '../context/AuthContex'
import { toast } from 'react-toastify';

function MainLayout() {

    const { user, clear } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/log-out`, {
                credentials: 'include'
            });
            const data = await res.json()
            if (data.success) {
                clear();
                toast.success('logged out successfully');
                navigate('/sign-in')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-full h-full relative bg-bodyColor'>
            <div>
                <img src={Logo} className='w-44 md:w-52 absolute -top-3 left-2 z-50' />
            </div>
            {user && <div className="w-full flex justify-end items-center px-6 py-10 absolute">
                <div className='w-14 h-14 bg-black rounded-full relative'>
                    <img src={user?.image} alt="User" className="w-full h-full rounded-full" />
                    <div className='absolute bg-[#FFEAEA] bottom-10 md:-bottom-5 -left-20 w-fit text-[#E40000] font-poppins py-2 px-4 rounded-sm text-sm flex gap-2 cursor-pointer'
                        onClick={handleLogout}>
                        <span><i className="fa-solid fa-right-from-bracket"></i></span>
                        Logout
                    </div>
                </div>
            </div>}
            <main className='w-full h-screen'>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout