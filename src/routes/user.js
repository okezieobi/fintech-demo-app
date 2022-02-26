import { Router } from 'express';

import Controller from '../controllers/User';

const { signup, setJWT, dispatchResponse } = new Controller();

const router = Router();

router.post('/signup', [signup, setJWT], dispatchResponse);

export default { router };
