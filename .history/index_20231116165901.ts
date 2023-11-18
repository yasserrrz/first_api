import { createServer, IncomingMessage, ServerResponse } from "http";

let users :U  = [

]


createServer((req: IncomingMessage, res: ServerResponse) => {
        if(req.method =="GET" && req.url =="/getUsers"){
                res.write("Hello Ts Es6");
                res.end()
        }
}).listen(3002 , ()=>{
    console.log("Ts Server Running")
})
