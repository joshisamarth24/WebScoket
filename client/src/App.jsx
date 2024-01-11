import React, { useEffect,useMemo,useState } from 'react'
import {io} from "socket.io-client";
import {Button, Container, TextField, Typography} from "@mui/material";

const App = () => {
  const socket = useMemo(()=>io("http://localhost:5000"),[]);
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log(socket.id);

      socket.on("welcome",(msg)=>{
        console.log(msg);
      });
      socket.on("recieve-message",(msg)=>{
        console.log(msg);
      });
      return ()=>{
        socket.disconnect();
      }
    
    })
  },[]);

  const [message, setMessage] = useState("");

const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message",message);
    setMessage("");


}
  return (
    <Container>
    <Typography variant='h1' component='div' gutterBottom>Welcome to Socket.io</Typography>
    <form onSubmit={handleSubmit}>
      <TextField value={message} onChange={(e)=>setMessage(e.target.value)} id='outlined-basic' label='Type here' variant='outlined'/>
      <Button type='submit' variant='contained'>Send</Button>
    </form>
    </Container>
  )
}

export default App