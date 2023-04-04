import Router from 'express-promise-router';
import userController from '../controllers/user-controller';
import { authenticate } from '../middlewares/authentication';

const router = new Router();

router.get('/', userController.getUsers);
router.get('/me', authenticate, userController.getMe);

export default router;
