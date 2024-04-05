import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

export default function Register({ className }: { className: string }): JSX.Element {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <div>Loading...</div>;
    }

    const { login } = authContext;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const user = { username, password };

            const response = await axios.post('/api/users/register', user);
            console.log(response.data);

            if (response.status === 200) {
                login(); 
                navigate('/'); 
            }
        } catch (error) {
            setError('Registration failed. Please try again.'); 
        }
    };

    return (
        <div className={`${className}`}>
            <div className="flex flex-col gap-2">
                <h2 className='text-center text-2xl'>Register</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='bg-white'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='bg-white'
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='bg-white'
                    />
                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto'>Register</button>
                </form>
            </div>
        </div>
    );
}