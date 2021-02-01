import { createClient } from '@supabase/supabase-js';
import path from 'path';

require( 'dotenv' ).config( { path: path.resolve( __dirname, '../../.env' ) } );

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient( supabaseUrl!, supabaseKey! );

export default supabase;