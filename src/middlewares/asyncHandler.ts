export const asyncHandler = ( fn: any ) =>
    ( req: Express.Request, res: Express.Response, next: any ) => {
        Promise.resolve( fn( req, res, next ) )
            .catch( next );
    };