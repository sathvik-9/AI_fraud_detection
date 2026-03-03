import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <div className="p-9 bg-gray-100 min-h-screen font-sans flex flex-col items-center justify-center gap-10">
            <h1 className="text-3xl font-bold text-center">AI Fraud Detection Dashboard</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                <div className="mb-4">  
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
            </form>
        </div>
    )
}