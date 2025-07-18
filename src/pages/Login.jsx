import { useState } from 'react';
import { countries, handleCountry } from '../utils/handleCountry'
import { signFormValidation } from '../utils/validations'
import useForm from '../hooks/useForm'
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { useAuth } from '../context/AuthContex'

function Login() {

    //
    const { Login } = useAuth();

    //for selecting country code
    const [selectedCounty, setSelectedCountry] = useState(countries[0]);

    const navigate = useNavigate();

    //setup initial form field
    const initialValue = {
        phone: '', password: '', countryCode: selectedCounty.code
    };

    //validation error state
    const [vError, setvError] = useState(null);

    //custom hook for user login and formdata management
    const { handleChange, formData } = useForm(initialValue);
    const { login, loading, error, data } = useLogin();

    //for submit form
    const handleForm = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            countryCode: selectedCounty.code,
        };

        //field validation
        if (!signFormValidation(payload, setvError)) {
            return;
        }
        const response = await login(payload);

        if (response.success) {
            Login(response?.access_token)
            navigate('/home')
        }
    }

    return (
        <div className="h-full flex items-center justify-center px-4 font-poppins">
            <div className='max-w-formWidth w-full flex flex-col items-center'>
                <div className='relative w-fit'>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 mt-5">
                        Login
                    </h2>
                    <div className="left-0 right-0 h-1 bg-yellow-400 mt-1 mx-auto rounded absolute bottom-2"></div>
                </div>
                <form className="space-y-5 w-full max-w-xl bg-white p-8 rounded-md shadow-lg"
                    onSubmit={handleForm}>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Mobile Number</label>
                        <div className="flex gap-2">
                            <div className='border-2 border-borderColor flex items-center rounded-md px-4 py-3 text-sm'>
                                <img src={selectedCounty.flag} className='w-4 h-4' />
                                <select className='bg-transparent outline-none text-sm'
                                    onChange={(e) => { handleCountry(setSelectedCountry, e.target.value) }}>
                                    {countries.map((c) => (
                                        <option value={c.code} key={c.code} className='px-2'>
                                            {c.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                name='phone'
                                onChange={handleChange}
                                value={formData.phone}
                                className={`w-full border-2  ${vError?.phone ? 'border-red-600' : 'border-borderColor'}  text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-borderColor`}
                            />
                            {vError?.phone && <p className="text-red-500 text-sm">{vError.phone}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className={`w-full border-2  ${vError?.password ? 'border-red-600' : 'border-borderColor'} text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-borderColor`}
                        />
                        {vError?.password && <p className="text-red-500 text-sm">{vError.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-buttonColor text-white py-3 text-sm rounded-md hover:bg-slate-700 transition"
                    >
                        Login
                    </button>
                    {error && <p className="text-center text-red-500 text-sm">{error}</p>}
                    <p className="text-center text-sm mt-4">
                        Don't have an account?{' '}
                        <Link to="/sign-up" className="text-blue-600 hover:underline">
                            Register Now
                        </Link>
                    </p>
                </form>
            </div >
        </div >
    )
}

export default Login