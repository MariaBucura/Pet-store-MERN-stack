import { useAuth } from '../../Context'
import './DeleteAccount.css'
import axios from 'axios'

const DeleteAccount = () => {

    const {user} = useAuth();

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:8080/account/${user._id}`, {});
            await axios.post("http://localhost:8080/logout", {}, {
                withCredentials: true
            });

            localStorage.clear();

            window.location.href = '/';
        } catch(err){
            console.error("Failed to delete account")
        }
        
    }

    return(
        <div className="delete-area">
            <div className="delete-header">
                Delete your account
            </div>
            <div className="delete-text">
            We're sorry to see you go! Deleting your account is a permanent action and cannot be undone. By deleting your account:
            </div>
            <ul className="delete-bullet-points">
                <li>
                All your data, including personal information and settings, will be permanently erased.
                </li>
                <li>
                You will lose access to your account and any associated content.
                </li>
            </ul>
            <div className="delete-text">
            If you’re sure about deleting your account, please confirm below. Otherwise, feel free to return to your account settings if you need more time or if you have questions.
            </div>
            <div className="delete-account-button" onClick={handleDelete}>
                Delete my account
            </div>
        </div>
    )
}

export default DeleteAccount