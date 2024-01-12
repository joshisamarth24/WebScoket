import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";

const app = express();

const server = new createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
        
    }
});

const port=5000;

io.on("connection",(socket)=>{
    console.log("socket_ID->",socket.id);
    socket.on("disconnect",()=>{
        console.log("user disconnected, socket id->",socket.id);
    });
    socket.on("message",(msg)=>{
        console.log(msg);
        socket.to(msg.room).emit("recieve-message",msg.message);
        
    });
    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`joined room ${room}`);
    });
})


app.get('/',(req,res)=>{
    res.send("Hello world");
})

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
})