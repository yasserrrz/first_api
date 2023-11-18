"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var users = [
    {
        id: 1,
        name: "yassr",
        email: "yasser@gmail.com"
    },
    {
        id: 2,
        name: "smmr",
        email: "smmr@gmail.com"
    },
    {
        id: 3,
        name: "loana",
        email: "loana@gmail.com"
    }
];
var posts = [
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
    },
    {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
];
(0, http_1.createServer)(function (req, res) {
    if (req.method === "GET" && req.url === "/getUsers") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
    }
    else if (req.method === "POST" && req.url === "/addUser") {
        var addUserData_1;
        req.on("data", function (chunk) {
            console.log(chunk);
            addUserData_1 = chunk;
        });
        req.on("end", function () {
            var userToAdd = JSON.parse(addUserData_1);
            var userinTheList = users.find(function (e) {
                return e.email === userToAdd.email;
            });
            if (userinTheList) {
                res.write(JSON.stringify({ message: "The User in Alredy exist" }));
                // res.end()
            }
            else {
                userToAdd.id = users.length + 1;
                users.push(userToAdd);
                res.write(JSON.stringify({ message: "User Added Successfuly" }));
            }
            res.end();
        });
    }
    else if (req.method === "DELETE" && req.url === "/deleteUser") {
        var chunkData_1;
        req.on("data", function (chunk) {
            chunkData_1 = chunk;
        });
        req.on("end", function () {
            var deleteUser = JSON.parse(chunkData_1); //  JSON.parse(chunkData) because the data in the body or the <Buffer> data that resived is string 
            var updatedList = users.filter(function (e) {
                return e.id !== (deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.id);
            });
            console.log(updatedList);
            if (updatedList.length !== users.length) {
                users = updatedList;
                console.log(users);
                res.write(JSON.stringify({ message: "The User Deleted Succesfully" }));
                //    res.end()
            }
            else {
                res.write(JSON.stringify({ message: "add a Correct Id " }));
            }
            res.end();
        });
    }
    else if (req.method === "GET" && req.url === "/getSortedUser") {
        users.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        console.log(users);
        res.write(JSON.stringify({ state: "success", users: users }));
        res.end();
    }
    else if (req.method === "PATCH" && req.url === "/updateUser") {
        var updateData_1;
        req.on("data", function (chunk) {
            console.log(chunk);
            updateData_1 = chunk;
        });
        req.on("end", function () {
            var updateUser = JSON.parse(updateData_1);
            var index = users.findIndex(function (e) {
                return e.id === updateUser.id;
            });
            console.log(index);
            if (index !== -1) {
                if (updateUser.email && updateUser.name) {
                    users[index].email = updateUser.email;
                    users[index].name = updateUser.name;
                }
                else if (updateUser.email) {
                    users[index].email = updateUser.email;
                }
                else if (updateUser.name) {
                    users[index].name = updateUser.name;
                }
                else {
                    res.write(JSON.stringify({ message: "Please enter a value to update" }));
                }
                console.log(users[index]);
                res.write(JSON.stringify({ message: "Success", users: users }));
            }
            else {
                res.write(JSON.stringify({ message: "Please enter a correct id" }));
            }
            res.end();
        });
    }
    else if (req.method === "GET" && req.url === "/getPosts") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "success", posts: posts }));
        res.end();
    }
    else if (req.method === "GET" && req.url === "/reversedPosts") {
        res.writeHead(200, { "Content-Type": "application/json" });
        var reversedPosts = posts.reverse();
        res.write(JSON.stringify({ message: "success", reversedPosts: reversedPosts }));
        res.end();
    }
    else if (req.method === "POST" && req.url === "/addPost") {
        var convertingChunk_1;
        req.on("data", function (chunk) {
            convertingChunk_1 = chunk;
        });
        req.on("end", function () {
            var postToAdd = JSON.parse(convertingChunk_1);
            var checkPost = posts.find(function (e) {
                return e.body == (postToAdd === null || postToAdd === void 0 ? void 0 : postToAdd.body);
            });
            if (checkPost) {
                res.write(JSON.stringify({ message: "The Post is Alredy exist" }));
                res.end();
            }
            else {
                if (postToAdd === null || postToAdd === void 0 ? void 0 : postToAdd.body) {
                    postToAdd.id = posts.length + 1;
                    posts.push(postToAdd);
                    res.write(JSON.stringify({ message: "Success", posts: posts }));
                    res.end();
                }
                else {
                    res.write(JSON.stringify({ message: "Plese inter a Data in your Post" }));
                    res.end();
                }
            }
        });
    }
    else if (req.method === "POST" && req.url === "/deletePost") {
        var converteBuffer_1;
        req.on("data", function (chunk) {
            converteBuffer_1 = chunk;
        });
        req.on("end", function () {
            var postToDelete = posts[JSON.parse(converteBuffer_1).id - 1];
            console.log(postToDelete);
            var updatedPosts = posts.filter(function (e) {
                return e.id !== (postToDelete === null || postToDelete === void 0 ? void 0 : postToDelete.id);
            });
            if (updatedPosts.length !== posts.length) {
                posts = updatedPosts;
                res.write(JSON.stringify({ message: "success", posts: posts }));
            }
            else {
                res.write(JSON.stringify({ message: "faled to delete" }));
            }
            res.end();
        });
    }
    else if (req.method === "PATCH" && req.url === "/updatePost") {
        var updateData_2;
        req.on("data", function (chunk) {
            console.log(chunk);
            updateData_2 = chunk;
        });
        req.on("end", function () {
            var postToUpdate = JSON.parse(updateData_2);
            if (postToUpdate) {
                if (postToUpdate.body) {
                    var index = posts.findIndex(function (ele) {
                        return ele.id === (postToUpdate === null || postToUpdate === void 0 ? void 0 : postToUpdate.id);
                    });
                    posts[index].body = postToUpdate.body;
                    res.write(JSON.stringify({ message: "success", posts: posts }));
                }
                else {
                    res.write(JSON.stringify({ message: "Please inter Post to update " }));
                }
                res.end();
            }
            else {
                res.write(JSON.stringify({ message: "somthig went wrong" }));
                res.end();
            }
        });
    }
    else if (req.method === "POST", req.url === "/searchPosts") {
        var searchBuffer_1;
        req.on('data', function (chunk) {
            searchBuffer_1 = chunk;
        });
        req.on("end", function () {
            var searchData = JSON.parse(searchBuffer_1);
            var searchval = searchData.body.toLowerCase().split(" ");
            if (searchval) {
                var seachLeangth = searchval.length;
                var answer = posts.filter(function (post) {
                    return searchval.some(function (word) { return post.title.toLowerCase().includes(word); });
                });
                res.write(JSON.stringify({ message: "success", answer: answer }));
            }
            else {
                res.write(JSON.stringify({ message: "Faild" }));
            }
            res.end();
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("Not Found");
        res.end();
    }
}).listen(3002, function () {
    console.log("Ts Server Running on http://localhost:3002");
});
