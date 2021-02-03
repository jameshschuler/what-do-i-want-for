import express from 'express';
import ListItemService from '../services/listItemService';
import ListService from '../services/listService';
import ListController from './listController';
import ListItemController from './listItemController';

const listService = new ListService();
const listItemService = new ListItemService();

const router = express.Router();

router.use( '/list', new ListController( listService ).registerRoutes() );
router.use( '/item', new ListItemController( listItemService ).registerRoutes() );

export default router;