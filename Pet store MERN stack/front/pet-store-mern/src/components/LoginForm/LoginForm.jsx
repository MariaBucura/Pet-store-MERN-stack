import { useState } from 'react';
import './LoginForm.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth", {
                email,
                password
            }, {
                withCredentials: true
            });

            window.location.href = '/';
        } catch (err) {
            setError('Login failed. please check your email and password');
        }
    }

    const navigate = useNavigate();

    const HandleClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-area">
            <form onSubmit={handleLogin}>
                <div className="login-section">
                    <h1 className="pet-header welcome-header">
                        Welcome back!
                    </h1>
                    <div className="login-container">
                        {error && <p className="login-error">{error}</p>}
                        <div className="login-input">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-text-area" placeholder='email' required />
                        </div>
                        <div className="login-input">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-text-area" placeholder='password' />
                        </div>
                        <div className="login-button">
                            <button type="submit" className="form-btn"> Log in</button>
                        </div>
                    </div>
                    <div className="sign-in-option-container">
                        <p className="no-account">
                            No account yet?
                        </p>
                        <div className="create-account-button" onClick={HandleClick}>
                            Create your account
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm