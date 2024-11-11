import express from 'express'
import { deleteUser, getUser, updateAddress, updateCity, updateName, updatePhoneNumber } from '../controllers/UserController.js';

const router = express.Router();

router.put('/name/:id', updateName);
router.get('/:id', getUser);
router.put('/city/:id', updateCity)
router.put('/address/:id', updateAddress);
router.put('/number/:id', updatePhoneNumber);
router.delete('/:id', deleteUser);

export default router