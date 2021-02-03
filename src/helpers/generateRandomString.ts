export function generateRandomString () {
    return Math.random().toString( 36 ).replace( '0.', '' );
}