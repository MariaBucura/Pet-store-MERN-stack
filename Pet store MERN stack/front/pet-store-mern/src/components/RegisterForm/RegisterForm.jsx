import './RegisterForm.css'
import logo from '../../images/critter-corner-high-resolution-logo-black-transparent.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const RegisterForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();

    const handleRegister = async (e) => {
        e.preventDefault();

        if(password != confirmPassword){
            throw new Error("Passwords don't match!");
        }

        try{
            const response = await axios.post("http://localhost:8080/register", {
                email, 
                password
            }, {
                withCredentials: true
            });

            const res = await axios.post("http://localhost:8080/auth", {
                email,
                password
            }, {
                withCredentials: true
            });

            window.location.href = '/';
        }catch(err){
            setError('Registration failed!');
        }
    }

    const navigate = useNavigate();

    const HandleClick = () => {
        navigate('/auth');
    };

    return(
        <div className="register-area">
            <form className="register-container" onSubmit={handleRegister}>
                <img src={logo} alt="logo" className="register-logo" />
                <h2 className="form-text">
                    Create your account!
                </h2>
                <div className="login-input">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="login-text-area" placeholder='email'/>
                    </div>
                    <div className="login-input">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-text-area" placeholder='password'/>
                    </div>
                    <div className="login-input">
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="login-text-area" placeholder='confirm password'/>
                    </div>
                    <button className="login-button submit-button" type='submit'>
                        Create account
                    </button>
                    <div className="go-to-login">
                <div className="no-account">
                    Already an user? 
                </div>
                <div className="create-account-button" onClick={HandleClick}>
                    Log in
                </div>
            </div>
            </form>
        </div>
    )
}

export default RegisterForm