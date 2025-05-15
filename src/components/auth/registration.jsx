import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { RegistrationRequest } from "../../APIRequest/APIRequest.jsx";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        // Validate username
        if (!username) {
            setUsernameError('Username is required');
            isValid = false;
        } else if (username.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            isValid = false;
        }

        // Validate email
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        }

        // Validate password
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            setLoading(true);  // Set loading to true when the form is submitted

            const result = await RegistrationRequest(username, email, password);
            if (result === true) {
                navigate("/home");
            }
            setLoading(false);  // Reset loading state after the request is completed
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-10 rounded-xl shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign in
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="username" className="block text-sm font-bold text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={`block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${
                                        usernameError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="Username"
                                />
                                {usernameError && <p className="mt-1 text-sm text-red-600">{usernameError}</p>}
                            </div>
                        </div>

                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${
                                        emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="Email"
                                />
                                {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${
                                        passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="Password"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                                </div>
                                {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading} // Disable the button when loading is true
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div> // Loader
                            ) : (
                                'Create account'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
