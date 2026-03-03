import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', response.data.token);

            alert("Registration successful! You can now log in.");
            navigate('/login');
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }

    return (
        <div className="p-9 bg-gray-100 min-h-screen font-sans flex flex-col items-center justify-center gap-10">
            <h1 className="text-3xl font-bold text-center">AI Fraud Detection Dashboard</h1>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Register</h2>
                <div className="mb-4">  
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
                <p>Already registered?<span className="ml-2 text-blue-500"><Link to="/login">Login</Link></span></p>
            </form>
        </div>
    )
}