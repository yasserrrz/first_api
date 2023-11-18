import { createServer, IncomingMessage, ServerResponse } from "http";
import { User } from "./interface";
import { json } from "stream/consumers";

let users :User[]  = [
    {
        id : 1 , 
        name : "yassr",
        email:"yasser@gmail.com"
    },
    {
        id : 2, 
        name : "smmr",
        email:"smmr@gmail.com"
    },
    {
        id : 3 , 
        name : "loana",
        email:"loana@gmail.com"
    }
]


createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/getUsers") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
    } else if(req.method === "POST" && req.url === "/addUser") {
        let addUserData:any;
        req.on("data" , (chunk)=>{
           console.log(chunk);
           addUserData = chunk;
           
        })
       req.on("end" , ()=>{ 
        let userToAdd :User = JSON.parse(addUserData);
        users.fi
        userToAdd.id = users.length +1;
        users.push(userToAdd);})
    }else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("Not Found");
        res.end();
    }
}).listen(3002 , ()=>{
    console.log("Ts Server Running")
})
