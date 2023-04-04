import Router from 'express-promise-router';
import userRoutes from './user.route';
import uploadRoutes from './other.route';

const router = new Router();

router.use('/users', userRoutes);
router.use('/', uploadRoutes);

export default router;
