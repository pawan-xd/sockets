const WebSocket = require('ws');

const server= new WebSocket.Server({port: process.env.PORT, host: "0.0.0.0"})

server.on("connection", function connection(ws){
    console.log("conenction establised with client");
    
    ws.on("message", (data)=>{
        server.clients.forEach((client)=>{
            client.send(JSON.stringify(JSON.parse(data)));
        })    
    })

    ws.on("close", ()=>{
        console.log("Connection closed")
    })
});