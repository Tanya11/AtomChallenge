import { Router } from 'express';
import { getUserByEmail, createUser } from '../controllers/user.controller';


const router = Router();

router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);

export default router;
