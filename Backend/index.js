import express, { urlencoded } from 'express'
import cors from 'cors'
import {PORT} from './src/config/serverConfig.js'
import apiRouter from './src/routes/index.js'

const app = express();

app.use(express.json());
app.use(urlencoded());
app.use(cors());

app.use('/api',apiRouter);

app.get('/ping',(req,res)=>{
    return res.json({message : 'pong'});
})

app.listen(PORT , ()=>{
    console.log(`Server is up and running at ${PORT}`);
})