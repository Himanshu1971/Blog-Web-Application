import { config } from 'dotenv';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import {main} from './server/routes/main.js';
import connectDB from './server/config/db.js';

const app = express();
const port = 3000;

connectDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

app.use(expressEjsLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',main);


app.listen(port,()=>{
    console.log("The server is running on port 3000")
})