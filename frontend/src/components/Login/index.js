import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        try {
            const res = await axios.post('https://blogapp-1249.onrender.com/api/user/login', userData);
            alert(res);
            navigate('/dashboard');
        } catch (err) {
            alert(err);
        }

        // if (email === 'test@test.com' && password === 'password') {
        //     alert('Login successful');
        //     navigate('/dashboard');
        // } else {
        //     alert('Invalid credentials');
        // }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
    );
};

export default Login;
