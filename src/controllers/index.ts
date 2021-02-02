import express from 'express';
import ListService from '../services/listService';
import ListController from './listController';

const listService = new ListService();

const router = express.Router();

router.use( '/list', new ListController( router, listService ).registerRoutes() );

export default router;