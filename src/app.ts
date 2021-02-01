import express from 'express';

const app = express();

// app.use( morgan( 'tiny' ) );
// app.use( compression() );
// app.use( helmet() );
// app.use( express.json( { type: 'application/json' } ) );
// app.use( cors() );
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
} )

app.use( '/api/v1', () => {
    console.log( 'hello' );
} );

// app.use( notFound );
// app.use( errorHandler );

export default app;