import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

export default function Login({ className }: { className: string }) : JSX.Element {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <div>Loading...</div>;
    }

    const { login, setUserId } = authContext;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { username, password });

            if (response.status === 200) {
                login();
                const userId = response.data;
                setUserId(userId); // Set userId after successful login
                navigate('/dashboard');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className={`${className}`}>
            <div className="flex flex-col gap-2">
                <h2 className='text-center text-2xl'>Login</h2>
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
                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto'>Login</button>
                </form>
            </div>
        </div>
    );
}