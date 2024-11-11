import express from 'express'
import { authenticateUser, loginUser , logoutUser, registerUser} from '../controllers/auth.js'
import { User } from '../Models/User.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authenticateUser, async (request, response) => {
    const user = await User.findById(request.userId);
    if(!user) return response.status(404).json({error: 'User not found'});

    response.json(user);
});

export default router