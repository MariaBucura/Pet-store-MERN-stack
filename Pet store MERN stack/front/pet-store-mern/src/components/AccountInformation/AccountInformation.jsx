import './AccountInformation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faPenToSquare, faCity, faLocationDot, faPhone, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useAuth } from '../../Context'
import axios from 'axios'

const AccountInformation = () => {

    const { user } = useAuth();

    const [updateName, setUpdateName] = useState(false);
    const [updateCity, setUpdateCity] = useState(false);
    const [updateAddress, setUpdateAddress] = useState(false);
    const [updateNumber, setUpdateNumber] = useState(false);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [error, setError] = useState();

    const toggleUpdateCity = () => {
        setUpdateCity(!updateCity);
    }

    const toggleUpdateName = () => {
        setUpdateName(!updateName);
    }

    const toggleUpdateAddress = () => {
        setUpdateAddress(!updateAddress);
    }

    const toggleUpdateNumber = () => {
        setUpdateNumber(!updateNumber);
    }

    const handleUpdateName = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/account/name/${user._id}`, {
                firstName,
                lastName
            });
            window.location.href = '/account';
        } catch (err) {
            setError('Update failed');
        }
    }

    const handleUpdateCity = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/account/city/${user._id}`, {
                city
            });
            window.location.href = '/account';
        } catch (err) {
            setError('Update failed');
        }
    }

    const handleUpdateAddress = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/account/address/${user._id}`, {
                address
            });
            window.location.href = '/account';
        } catch(err) {
            setError('Update failed');
        }
    }

    const handleUpdatePhoneNumber = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/account/number/${user._id}`, {
                phoneNumber
            });
            window.location.href = '/account';
        } catch(err) {
            setError('Update failed');
        }
    }

    if (!user) {
        return <p>User info loading...</p>
    }

    return (
        <div className="information-area">
            <div className="info-header">
                Personal information
            </div>
            <div className="info-text">
                <p>Manage your personal information, including phone number and shipping address.</p>
            </div>
            <div className="info-tab">
                <div className="info-display">
                    <div className="info-item">
                        <div className="info-item-header">
                            <div className="info-label">
                                Name
                            </div>
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faCircleUser} />
                            </div>
                        </div>
                        {updateName ?
                            <form className="update-form" onSubmit={handleUpdateName}>
                                <div className="info-item-content">
                                    Enter your first and last name:
                                </div>
                                <div className="info-input">
                                    <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="info-input-field" placeholder='First name' />
                                    <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="info-input-field" placeholder='Last name' />
                                </div>
                                <div className="save">
                                    <button className="save-button" type="submit">
                                        Save changes
                                    </button>
                                </div>
                            </form> :
                            <div className="info-item-content">
                                {user.firstName} {user.lastName}
                            </div>}
                        <div className="edit-button" onClick={toggleUpdateName}>
                            {updateName ?
                                <FontAwesomeIcon icon={faCircleXmark} />
                                :
                                <FontAwesomeIcon icon={faPenToSquare} />}
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-header">
                            <div className="info-label">
                                City
                            </div>
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faCity} />
                            </div>
                        </div>
                        {updateCity ?
                            <form className="update-form" onSubmit={handleUpdateCity}>
                                <div className="info-item-content">
                                    Enter city:
                                </div>
                                <div className="info-input">
                                    <input type="firstName" value={city} onChange={(e) => setCity(e.target.value)} className="info-input-field" placeholder='City' />
                                    <button className="save-button" type="submit">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                            :
                            <div className="info-item-content">
                                {user.city ?
                                    <div>{user.city}</div> :
                                    <div>Add your city</div>
                                }
                            </div>}
                        <div className="edit-button" onClick={toggleUpdateCity}>
                            {updateCity ?
                                <FontAwesomeIcon icon={faCircleXmark} />
                                :
                                <FontAwesomeIcon icon={faPenToSquare} />}
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-header">
                            <div className="info-label">
                                Address
                            </div>
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                        </div>
                        {updateAddress ?
                            <form className="update-form" onSubmit={handleUpdateAddress}>
                                <div className="info-item-content">
                                    Enter address:
                                </div>
                                <div className="info-input">
                                    <input type="firstName" value={address} onChange={(e) => setAddress(e.target.value)} className="info-input-field" placeholder='Address' />
                                    <button className="save-button"type='submit' >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                            :
                            <div className="info-item-content">
                                {user.shippingAddress ?
                                    <div>{user.shippingAddress}</div> :
                                    <div>Add your address</div>
                                }
                            </div>}
                        <div className="edit-button" onClick={toggleUpdateAddress}>
                            {updateAddress ?
                                <FontAwesomeIcon icon={faCircleXmark} />
                                :
                                <FontAwesomeIcon icon={faPenToSquare} />}
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-header">
                            <div className="info-label">
                                Phone number
                            </div>
                            <div className="info-icon">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                        </div>
                        {updateNumber ?
                            <form className="update-form" onSubmit={handleUpdatePhoneNumber}>
                                <div className="info-item-content">
                                    Enter phone number:
                                </div>
                                <div className="info-input">
                                    <input type="firstName" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="info-input-field" placeholder='phone number' />
                                    <button className="save-button" type='submit' >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                            :
                            <div className="info-item-content">
                                {user.phoneNumber ?
                                    <div>{user.phoneNumber}</div> :
                                    <div>Add your phone number</div>
                                }
                            </div>}
                        <div className="edit-button" onClick={toggleUpdateNumber}>
                            {updateNumber ?
                                <FontAwesomeIcon icon={faCircleXmark} />
                                :
                                <FontAwesomeIcon icon={faPenToSquare} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInformation