import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './controllers';
import { AppError } from './models/appError';

const app = express();

app.use( morgan( 'tiny' ) );
app.use( compression() );
app.use( helmet() );
app.use( express.json( { type: 'application/json' } ) );
app.use( cors() );
// const limiter = rateLimit( {
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 50
// } );

//  apply to all requests
// app.use( limiter );

app.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Hello, mate! 🦘'
    } );
} );

// Router
app.use( '/api/v1', router );

app.use( ( req: express.Request, res: express.Response, next: any ) => {
    const error = new Error( `Not found - ${req.originalUrl}` );
    res.status( 404 );
    next( error );
} );

app.use( ( error: AppError, req: express.Request, res: express.Response, next: any ) => {
    res.status( error.statusCode ).json( {
        status: error.statusCode,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🤷🏻‍♂️' : error.stack,
        errors: error.message,
    } );
} );

export default app;