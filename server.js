const WebSocket = require('ws');
const server= new WebSocket.Server({port:3000})

server.on("connection", function connection(ws){
    console.log("conenction establised with client");
    
    ws.on("message", (data)=>{
        console.log("recieved: ", data.toString());
        ws.send("reply message from server");
    })

    ws.on("close", ()=>{
        console.log("Connection closed")
    })
});