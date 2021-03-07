import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateRequestModel } from '../helpers/validation';
import { asyncHandler } from '../middlewares/asyncHandler';
import { CreateListRequest, createListRequestSchema } from '../models/request/createListRequest';
import { UpdateListRequest, updateListRequestSchema } from '../models/request/updateListRequest';
import ListService from '../services/listService';

export default class ListController {

    constructor( private listService: ListService ) {

    }

    public registerRoutes () {
        let router = express.Router();
        router.post( '/', asyncHandler(
            async ( req: express.Request, res: express.Response, next: any ) => this.createList( req, res ) ) );

        router.get( '/:id', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.getList( req, res ) ) );

        router.post( '/:id/publish', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.publishList( req, res ) ) );

        router.put( '/:id', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.updateList( req, res ) ) );

        return router;
    }

    public async createList ( req: express.Request, res: express.Response ) {
        const request = req.body as CreateListRequest;
        if ( !validateRequestModel( request, res, createListRequestSchema ) ) {
            return;
        }

        const listId = await this.listService.createList( request );

        res.location( '/api/v1/list/' + listId );
        res.status( StatusCodes.CREATED ).json();
    }

    public async getList ( req: express.Request, res: express.Response ) {
        const list = await this.listService.getList( req.params.id );
        res.status( StatusCodes.OK ).json( list );
    }

    public async publishList ( req: express.Request, res: express.Response ) {
        await this.listService.publishList( +req.params.id );
        res.status( StatusCodes.NO_CONTENT ).json();
    }

    public async updateList ( req: express.Request, res: express.Response ) {
        const request = req.body as UpdateListRequest;
        if ( !validateRequestModel( request, res, updateListRequestSchema ) ) {
            return;
        }

        const listId = await this.listService.updateList( +req.params.id, request );

        res.location( '/api/v1/list/' + listId )
        res.status( StatusCodes.NO_CONTENT ).json();
    }
}