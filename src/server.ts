import { app, express, req_T_, res_T_, nextFunc_T_, } from "./app";

const cors = require('cors');
const helmet = require("helmet");

const http = require('http').Server(app);
// const os = require('os'); 
// const cluster = require('cluster');
//const path = require('path');

// const server = http.createServer(app);

import { Socket, } from "socket.io";

export const ws_io = require("socket.io")(http);


//
import statics from './static/statics';
///


//
import { IMAIN_ROUTER } from "./routers/MAIN_ROUTER"
import RunChatWSEngain from "./chat/engain";
const MAIN_ROUTER:IMAIN_ROUTER = require("./routers/MAIN_ROUTER");
///



export function RunServer(): void {
    let SAV = statics.api.versions.v1;

    //

    // app.use((req, _, next) => {
    //     console.log("REQ : \n\n")
    //     console.log(req.body + "\n\n" + req.baseUrl);
    //     console.log(req);
    //     console.log((req as any)?.data || "ff")

    //     next();
    // })


    //Configure and resolve the form request body. The type is: application / APP
    app.use(express.json({type:"text/json"}))

    //Parse the form request body. The type is: application / x-www-form-urlencoded
    app.use(express.urlencoded({ type: "text/json" }))

    app.use(cors({ origin: "*", }));



    //
    app.set("case sensitive routing", false);
    ///


    //

    app.get('/', (req, res) => {
        res.status(200).json({ok:false,})
    });
    

    app.use(`${SAV}/payments`, MAIN_ROUTER.paymentsRouter);


    
    ///
    RunChatWSEngain(ws_io);
    ///



    const PORT = process.env.PORT || 40001;
    
    http.listen(PORT, (req:req_T_, res:res_T_) => {
        console.log("Listening on port =>> " + PORT);
    });


    //for (const core of os.cpus()) cluster.isMaster || cluster.fork();

};

//RunServer()

