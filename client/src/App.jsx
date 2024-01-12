import React, { useEffect,useMemo,useState } from 'react'
import {io} from "socket.io-client";
import {Button, Container, Stack, TextField, Typography} from "@mui/material";

const App = () => {
  const socket = useMemo(()=>io("http://localhost:5000"),[]);
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const [room,setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName,setRoomName] = useState("");

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log(socket.id)
      setSocketId(socket.id);

      socket.on("welcome",(msg)=>{
        console.log(msg);
      });
      socket.on("recieve-message",(msg)=>{
        console.log(msg);
        setMessages((messages)=>[...messages,msg]);
      });
      return ()=>{
        socket.disconnect();
      }
    
    })
  },[]);


const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("");
}

const joinRoomHandler = (e)=>{
  e.preventDefault();
  socket.emit("join-room",roomName);
  setRoomName("");
}

  return (
    <Container>
    <Typography variant='h6' component='div' gutterBottom>{socketId}</Typography>
    <form onSubmit={joinRoomHandler}>
    <TextField value={roomName} onChange={(e)=>setRoomName(e.target.value)} id='outlined-basic' label='Room Name' variant='outlined'/>
    <Button type='submit' variant='contained'>Join</Button>
    </form>
    <form onSubmit={handleSubmit}>
      <TextField value={message} onChange={(e)=>setMessage(e.target.value)} id='outlined-basic' label='Type here' variant='outlined'/>
      <TextField value={room} onChange={(e)=>setRoom(e.target.value)} id='outlined-basic' label='Room' variant='outlined'/>
      <Button type='submit' variant='contained'>Send</Button>
    </form>
    <Stack spacing={2}>
      {messages.map((msg,i)=>(
        <Typography key={i} variant='body1' component='div' gutterBottom>{msg}</Typography>
      ))}
    </Stack>
    </Container>
  )
}

export default App