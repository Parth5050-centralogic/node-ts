import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

router.get('/', apiController.health);
router.get('/split/:text', apiController.split);
router.get('/concat/:first/:second', apiController.concatParams);
router.get('/concat-query', apiController.concatQuery);
router.get('/leap/:year', apiController.leap);
router.get('/handshake/:number', apiController.handshake);
router.use(apiController.notFound);

export default router;
