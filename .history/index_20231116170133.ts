import { createServer, IncomingMessage, ServerResponse } from "http";

let users :Users[]  = [
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
        if(req.method =="GET" && req.url =="/getUsers"){
                res.write(JSON.stringify());
                res.end()
        }
}).listen(3002 , ()=>{
    console.log("Ts Server Running")
})
