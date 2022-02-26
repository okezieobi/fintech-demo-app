import { Router } from 'express';

import userRoutes from './routes/user';

const router = Router();

router.use('/auth', userRoutes.router);

export default router;
