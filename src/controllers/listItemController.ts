import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateRequestModel } from '../helpers/validation';
import { asyncHandler } from '../middlewares/asyncHandler';
import { CreateListItemRequest, createListItemRequestSchema } from '../models/request/createListItemRequest';
import ListItemService from '../services/listItemService';

export default class ListItemController {

    constructor( private listItemService: ListItemService ) { }

    public registerRoutes () {
        let router = express.Router();

        router.post( '/', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.createListItem( req, res ) ) );
        router.get( '/:id', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.getListItems( req, res ) ) );

        return router;
    }

    public async createListItem ( req: express.Request, res: express.Response ) {
        const request = req.body as CreateListItemRequest;

        if ( !validateRequestModel( request, res, createListItemRequestSchema ) ) {
            return;
        }

        await this.listItemService.createListItem( request );
        res.statusCode = StatusCodes.CREATED;
        res.json();
    }

    public async getListItems ( req: express.Request, res: express.Response ) {
        // const list = await this.listService.getList( req.params.id );
        // res.json( list );
    }
}