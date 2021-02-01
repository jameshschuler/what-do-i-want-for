import express from 'express';
import ListService from '../services/listService';
import ListController from './ListController';

const listService = new ListService();

const router = express.Router();
router.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Welcome! 👻',
    } );
} );


router.use( '/list', new ListController( router, listService ).router );

export default router;