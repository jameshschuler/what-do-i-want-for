import express, { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import ListService from '../services/listService';

export default class ListController {

    constructor( private router: Router, private listService: ListService ) {
    }

    public registerRoutes () {
        this.router.post( '/', ( req: express.Request, res: express.Response ) => this.createList( req, res ) );
        this.router.get( '/:id', asyncHandler(
            async ( req: express.Request, res: express.Response ) => this.getList( req, res ) ) );

        return this.router;
    }

    public async createList ( req: express.Request, res: express.Response ) {
        res.send( {
            message: 'testing'
        } );
    }

    public async getList ( req: express.Request, res: express.Response ) {
        const list = await this.listService.getList( req.params.id );

        res.json( list );
    }
}