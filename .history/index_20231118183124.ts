import { createServer, IncomingMessage, ServerResponse } from "http";
import { Post, User } from "./interface";
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
];

let posts : Post[] = [
    {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            }
        ,
        {
            userId: 1,
            id: 3,
            title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
            }
]; 



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
        let userinTheList:User|undefined = users.find((e)=>{
            return e.email ===userToAdd.email
        })
        if(userinTheList){
            res.write(JSON.stringify({message : "The User in Alredy exist"}))
            // res.end()
        }else{
            userToAdd.id = users.length +1;
            users.push(userToAdd);
            res.write(JSON.stringify({message : "User Added Successfuly"}))
        }
        res.end()
  })
    }
    else if(req.method === "DELETE" && req.url === "/deleteUser"){
        let chunkData :any ;
        req.on("data" , (chunk)=>{
            chunkData = chunk;
        })
        req.on("end", ()=>{  
            
            let deleteUser : User | undefined  =JSON.parse(chunkData);  //  JSON.parse(chunkData) because the data in the body or the <Buffer> data that resived is string 
            let updatedList : User[] =  users.filter((e)=>{
                return e.id !== deleteUser?.id
           });

           console.log(updatedList);

           if(updatedList.length !== users.length ){
               users = updatedList ;     
               console.log(users);
               res.write(JSON.stringify({message : "The User Deleted Succesfully"}))
            //    res.end()
           }
           else{
            res.write(JSON.stringify({message : "add a Correct Id "}))
        }
        res.end()

        });

    } else if(req.method === "GET" && req.url === "/getSortedUser" ){
        users.sort((a , b)=>{
            return a.name.localeCompare(b.name)
        })
        console.log(users);
        res.write(JSON.stringify({state: "success" , users}));
        res.end()
    }  
    else if(req.method === "PATCH" && req.url === "/updateUser") {
        let updateData:any;
        req.on("data" , (chunk)=>{
           console.log(chunk);
           updateData = chunk;
           
        })
        req.on("end" , ()=>{
            let updateUser:User = JSON.parse(updateData)
         let index : number = users.findIndex((e)=>{
                return e.id === updateUser.id
            })
            console.log(index)
    
        if (index !== -1) {
            if (updateUser.email && updateUser.name){
                users[index].email = updateUser.email;
                users[index].name = updateUser.name;
            } else if (updateUser.email) {
                users[index].email = updateUser.email;
            } else if (updateUser.name) {
                users[index].name = updateUser.name;
            } else {
                res.write(JSON.stringify({ message: "Please enter a value to update"}));
            }
            console.log(users[index]);
            res.write(JSON.stringify({ message: "Success", users }));
           
        } else {
            res.write(JSON.stringify({ message: "Please enter a correct id" }));
        }
        
        res.end()
        })
    }
    else if (req.method === "GET" && req.url === "/getPosts") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({message : "success" , posts}));
        res.end();
    }
    else if (req.method === "GET" && req.url === "/reversedPosts") {
        res.writeHead(200, { "Content-Type": "application/json" });
        let reversedPosts : Post[] = posts.reverse(); 
        res.write(JSON.stringify({message : "success" , reversedPosts}));
        res.end();
    }
    else if(req.method === "POST" && req.url === "/addPost") {
      let convertingChunk : any ; 
       req.on("data" , (chunk)=>{
          convertingChunk = chunk ; 
       })
       req.on("end" , ()=>{
            let postToAdd : Post|undefined = JSON.parse(convertingChunk)  ; 
            let checkPost = posts.find((e)=>{
                return e.body == postToAdd?.body
            })
            if(checkPost){
                res.write(JSON.stringify({message : "The Post is Alredy exist"}))
                res.end();
            }else {
                if(postToAdd?.body){
                    postToAdd.id = posts.length +1
                    posts.push(postToAdd);
                    res.write(JSON.stringify({message:"Success" , posts}))
                    res.end()

                }else{
                    res.write(JSON.stringify({message : "Plese inter a Data in your Post"}))
                    res.end();
                }
            }
            
            
            
       })
    }
    else if(req.method === "POST" && req.url === "/deletePost") {
        let converteBuffer:any ;  
        req.on("data" , (chunk)=>{
           converteBuffer = chunk;
        });
        req.on("end" , ()=>{
            let postToDelete:Post | undefined =  posts[JSON.parse(converteBuffer).id-1]
            console.log(postToDelete) 
            let updatedPosts :Post[]= posts.filter((e)=>{
                return e.id !== postToDelete?.id
            }) ;
            if(updatedPosts.length !== posts.length){
            posts =  updatedPosts ; 
            res.write(JSON.stringify({message : "success" , posts}))
            }else{
            res.write(JSON.stringify({message : "faled to delete"  }))
              
            }
            res.end()

        })
    }
    else if(req.method === "PATCH" && req.url === "/updatePost") {
        let updateData:any;
        req.on("data" , (chunk)=>{
           console.log(chunk);
           updateData = chunk;
           
        });
        req.on("end" , ()=>{
            let postToUpdate:Post | undefined =  JSON.parse(updateData);
            if(postToUpdate){
               if(postToUpdate.body){
                let index: number = posts.findIndex((ele)=>{
                   return ele.id === postToUpdate?.id
                }) ;
                posts[index].body = postToUpdate.body ; 
                res.write(JSON.stringify({message:"success" , posts}))
               }else{
                res.write(JSON.stringify({message:"Please inter Post to update "}))
               }
               res.end();
            }else{
                res.write(JSON.stringify({message:"somthig went wrong"}))
                res.end()
            }
        });

    }
    else if(req.method ==="POST" , req.url === "/searchPosts"){
        let searchBuffer :any ;

        req.on('data' , (chunk)=>{
            searchBuffer = chunk ;
        })
        req.on("end", ()=>{
            let searchData : Post   = JSON.parse(searchBuffer) ; 
            let seachval :string[] = searchData.body.split(" ")
            let seachLeangth : number  = seachval.length ; 
           let answer :Post[] = posts.filter((ele)=>{
               return ele.body.toLowerCase
            })
        })
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("Not Found");
        res.end();
    }
    
}).listen(3002 , ()=>{
    console.log("Ts Server Running on http://localhost:3002")
})

