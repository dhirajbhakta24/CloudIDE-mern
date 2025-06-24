import express, { urlencoded } from 'express'
import cors from 'cors'
import{createServer} from 'node:http'
import { Server } from 'socket.io'
import chokidar from 'chokidar';
import {PORT} from './src/config/serverConfig.js'
import apiRouter from './src/routes/index.js'
import {handleEditorSocketEvents} from ''
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin :'*',
        methods:['GET','POST'],
    }
});

app.use(express.json());
app.use(urlencoded());
app.use(cors());

app.use('/api',apiRouter);

app.get('/ping',(req,res)=>{
    return res.json({message : 'pong'});
})

const editorNamespace = io.of('/editor');
editorNamespace.on("connection" , (socket)=>{
    console.log("editor connected");

    let projectId = socket.handshake.query['projectId'];
    console.log("Project id recieved after connection",projectId);

    if(projectId){
        var watcher = chokidar.watch(`./projects/${projectId}`,{
            ignored :(path) => path.includes("node_modules"),
            persistent: true , /**keeps the watcher in running state till the time app is running */
            awaitWriteFinish:{
                stabilityThreshold:2000 /**Ensures stabilty of files before triggering event */
            },
            ignoreInitial:true /**ignores the initial file in the directory */
        });

        watcher.on("all" , (event,path)=>{
            console.log(event,path);
        });
    }
    handleEditorSocketEvents(socket);
})

server.listen(PORT , ()=>{
    console.log(`Server is up and running at ${PORT}`);
})