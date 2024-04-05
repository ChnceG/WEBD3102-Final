import { useState } from 'react';
import InfoBox from '../components/Infobox';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Auth(): JSX.Element {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <div className="w-[600px] mx-auto">
            <InfoBox>
                {isLoginForm ? (
                    <div>
                        <Login className="p-4" />
                        <p className="text-center mt-4">
                            Don't have an account?{' '}
                            <button className="text-blue-500 underline" onClick={toggleForm}>
                                Register here
                            </button>
                        </p>
                    </div>
                ) : (
                    <div>
                        <Register className="p-4" />
                        <p className="text-center mt-4">
                            Already have an account?{' '}
                            <button className="text-blue-500 underline" onClick={toggleForm}>
                                Login here
                            </button>
                        </p>
                    </div>
                )}
            </InfoBox>
        </div>
    );
}