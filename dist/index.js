"use strict";
// import express from 'express';
// const app = express()
// const PORT = 40001
Object.defineProperty(exports, "__esModule", { value: true });
// const http = require("http").Server(app);
// const https = require("https");
// type req_T_ = Express.Request;
// type res_T_ = Express.Response;
// const req = http.request("https://www.udemy.com/assets/32150846/files/2021-03-15_16-28-55-f0096cd7d9b8d4256bdd7bc12daa3ca4/2/hls/AVC_1920x1080_4800k_AAC-HE_64k/aa002e3afaa92e813cc7fe5e0271691dad6f.m3u8?provider=cloudfront&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXRoIjoiMjAyMS0wMy0xNV8xNi0yOC01NS1mMDA5NmNkN2Q5YjhkNDI1NmJkZDdiYzEyZGFhM2NhNC8yLyIsImV4cCI6MTY1NDI1NTY0MH0.B3wgu2eaLmz_NcEFZfZ3NJ1uVY6w64G2P6yXwuZ04UA&v=1", (res:any) => {
//     res.on('data', (chunk:any) => {
//         console.log(chunk)
//     } )
// })
// req.end();
// var events = require('events');
// var eventEmitter = new events.EventEmitter();
// eventEmitter.emit('my_event');
// eventEmitter.on('my_event', () => {
//   console.log('data received successfully.');
// });
// http.listen(PORT, (req:req_T_, res:res_T_) => {
//     console.log("Listening on porrt =>> " + PORT);
// });
const server_1 = require("./server");
// (async () => await RunServer())().finally(() => console.log("\n SERVER IS RUNING!. \n"));
(0, server_1.RunServer)();
