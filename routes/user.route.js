import Router from 'express-promise-router';
import { authenticate } from '../middlewares/authentication';
import { checkRoles } from '../middlewares/authorization';

const router = new Router();
router.get('/me', authenticate, checkRoles(['admin']), (req, res) => {
    // Handle request
    return res.json({
        ok: true,
        user: '222',
      })
  });
router.get('/', (req, res) => {
    // Handle request
    return res.json({
        ok: true,
        user: '22121222',
      })
});


export default router;
