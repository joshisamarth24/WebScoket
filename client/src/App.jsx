import React, { useEffect } from 'react'
import {io} from "socket.io-client";

const App = () => {
  const socket = io('http://localhost:5000');
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log(socket.id);

      socket.on("welcome",(msg)=>{
        console.log(msg);
      });

      return ()=>{
        socket.disconnect();
      }
    
    })
  },[]);


  return (
    <div>App</div>
  )
}

export default App