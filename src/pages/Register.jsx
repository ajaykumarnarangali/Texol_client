import { useState } from 'react'
import { countries, handleCountry } from '../utils/handleCountry'
import { regFormValidation } from '../utils/validations'
import useRegister from '../hooks/useRegister';
import useForm from '../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    //for selecting country code
    const [selectedCounty, setSelectedCountry] = useState(countries[0]);

    const navigate = useNavigate();

    //setup initial form field
    const initialValue = {
        username: '', email: '', phone: '', password: '', role: 'student', countryCode: selectedCounty.code
    };

    //validation error state
    const [vError, setvError] = useState(null);

    //custom hook for user registration and formdata management
    const { register, loading, error } = useRegister();
    const { handleChange, formData } = useForm(initialValue)

    //for submit form
    const handleForm = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            countryCode: selectedCounty.code,
        };

        //field validation
        if (!regFormValidation(payload, setvError)) {
            return;
        }
        
        const success = await register(payload);
        if (success) {
            navigate('/sign-in')
        }
    }

    return (
        <div className="h-full flex items-center justify-center px-4 font-poppins">
            <div className='max-w-formWidth w-full flex flex-col items-center'>
                <div className='relative w-fit'>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 mt-5">
                        Register
                    </h2>
                    <div className="w-28 h-1 bg-yellow-400 mt-1 mx-auto rounded absolute bottom-2"></div>
                </div>
                <form className="space-y-5 w-full max-w-xl bg-white p-8 rounded-md shadow-lg"
                    onSubmit={handleForm}>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name='username'
                            value={formData?.username}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className={`w-full border-2 ${vError?.name ? 'border-red-600' : 'border-borderColor'} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-borderColor`}
                        />
                        {vError?.name && <p className="text-red-500 text-sm">{vError.name}</p>}
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={formData?.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`w-full border-2 ${vError?.email ? 'border-red-600' : 'border-borderColor'} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-borderColor`} />
                        {vError?.email && <p className="text-red-500 text-sm">{vError.email}</p>}
                    </div>
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
                                name='phone'
                                autoComplete="tel"
                                value={formData?.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className={`w-full border-2 ${vError?.phone ? 'border-red-600' : 'border-borderColor'} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-borderColor`}
                            />
                        </div>
                        {vError?.phone && <p className="text-red-500 text-sm">{vError.phone}</p>}
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Current Status</label>
                        <div className="flex items-center gap-6 text-sm">
                            <label className="flex items-center gap-1">
                                <input type="radio" name="role" value="student" className='cursor-pointer' checked={formData?.role == 'student'}
                                    onChange={handleChange} />
                                <span>Student</span>
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="radio" name="role" value="employee" className='cursor-pointer' checked={formData?.role == 'employee'}
                                    onChange={handleChange} />
                                <span>Employee</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name='password'
                            autoComplete="current-password"
                            value={formData?.password}
                            onChange={handleChange}
                            className={`w-full border-2 ${vError?.password ? 'border-red-600' : 'border-borderColor'} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-borderColor`}
                        />
                        {vError?.password && <p className="text-red-500 text-sm">{vError.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-buttonColor text-white py-3 text-sm rounded-md hover:bg-slate-700 transition"
                    >
                        {loading ? 'Submitting...' : 'Save'}
                    </button>
                    {error && <p className="text-center text-red-500 text-sm">{error}</p>}
                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <Link to="/sign-in" className="text-blue-600 hover:underline">
                            Login Now
                        </Link>
                    </p>
                </form>
            </div >
        </div >
    )
}

export default Register