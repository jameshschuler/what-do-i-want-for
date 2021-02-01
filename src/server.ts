import app from './app';

const port = process.env.PORT || 5000;
app.listen( port, () => {
    console.info( `Listening at http://localhost:${port}` );
} );