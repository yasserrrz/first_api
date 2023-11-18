import { createServer, IncomingMessage, ServerResponse } from "http";




createServer((req: IncomingMessage, res: ServerResponse) => {
        if(req.method =="GET" && req.url =="/getUsers"){
                res
        }
}).listen(3002 , ()=>{
    console.log("Ts Server Running")
})
