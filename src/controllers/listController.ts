import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ListService from 'src/services/listService';
import { AppError } from '../models/appError';

export default class ListController {

    constructor( public router: Router, private listService: ListService ) {
        this.registerRoutes();
    }

    private registerRoutes () {
        this.router.post( '/', ( req: express.Request, res: express.Response ) => this.createList( req, res ) );
        this.router.get( '/:id', ( req: express.Request, res: express.Response ) => this.getList( req, res ) );
    }

    public async createList ( req: express.Request, res: express.Response ) {
        res.send( {
            message: 'testing'
        } );
    }

    public async getList ( req: express.Request, res: express.Response ) {
        if ( !req.params.id ) {
            throw new AppError( 'Unable to find list.', StatusCodes.UNPROCESSABLE_ENTITY );
        }

        try {
            const list = await this.listService.getList( parseInt( req.params.id ) );

            res.json( list );
        } catch ( err ) {
            res.status( err.statusCode ).json( { message: err.message } );
        }
    }
}