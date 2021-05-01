import express from 'express';
import Controller from '../controllers/index';

const router = express.Router();

router.get('/', Controller.getAll);
router.get('/:id', Controller.getOne);
router.post('/', Controller.createOne);
router.put('/:id', Controller.updateOne);
router.delete('/:id', Controller.removeOne);

export default router;
