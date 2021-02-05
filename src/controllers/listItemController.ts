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

        router.post( '/:id/item', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.createListItem( req, res ) ) );
        router.get( '/:id/item', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.getListItems( req, res ) ) );

        router.post( '/:id/item/:itemId', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.getListItems( req, res ) ) );

        return router;
    }

    public async createListItem ( req: express.Request, res: express.Response ) {
        const request = req.body as CreateListItemRequest;

        if ( !validateRequestModel( request, res, createListItemRequestSchema ) ) {
            return;
        }

        const listId = parseInt( req.params.id );
        await this.listItemService.createListItem( listId, request );
        res.statusCode = StatusCodes.CREATED;
        res.json();
    }

    public async getListItems ( req: express.Request, res: express.Response ) {
        const listId = +req.params.id;

        const listItems = await this.listItemService.getListItems( listId );

        res.statusCode = StatusCodes.OK;
        res.json( listItems );
    }

    public async claimListItem ( req: express.Request, res: express.Response ) {
        // TODO: 
    }
}