import Router from 'express-promise-router';
import userRoutes from './user.route';

const router = new Router();

router.use('/users', userRoutes);

export default router;
