import './AccountOptions.css';
import AccountInformation from '../AccountInformation/AccountInformation'
import axios from 'axios';
import { useAuth } from '../../Context';
import { useState } from 'react';
import DeleteAccount from '../DeleteAccount/DeleteAccount';

const AccountOptions = () => {

    const [activeTab, setActiveTab] = useState("Personal information");

    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/logout", {}, {
                withCredentials: true
            });

            localStorage.clear();

            window.location.href = '/';
        }
        catch (error) {
            console.error("logout failed", error);
        }
    };

    const toggleDeleteAccountTab = () => {
        setActiveTab("Delete account");
    }

    const togglePersonalInformationTab = () => {
        setActiveTab("Personal information");
    }

    if (!user) {
        return <p className='header-name'>Loading user information...</p>;
    }

    return (
        <div className="account">
            <div className="account-area">
                <div className="header-name">
                    <p className="user-full-name user-display-name"> {user.firstName} {user.lastName}</p>
                </div>
                <a href='#' className="user-full-name" onClick={togglePersonalInformationTab}>Personal information</a>
                <a href='#' className="user-full-name">Order history</a>
                <button className='logout-button' onClick={handleLogout}> Log out</button>
                <a href='#' className="user-full-name delete-button" onClick={toggleDeleteAccountTab}>Delete account</a>
            </div>
            {activeTab == "Personal information" ?
                <AccountInformation />
                : activeTab == "Delete account" ?
                    <DeleteAccount />
                    :
                    <div></div>
            }
        </div>
    )
}

export default AccountOptions