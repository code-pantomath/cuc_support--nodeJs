import { app, express, req_T_, res_T_, nextFunc_T_, } from "./app";

const cors = require('cors');
const helmet = require("helmet");

const http = require('http');
// const os = require('os'); 
// const cluster = require('cluster');
//const path = require('path');

const server = http.createServer(app);

//
import statics from './static/statics';
///


//
import { IMAIN_ROUTER } from "./routers/MAIN_ROUTER"
const MAIN_ROUTER:IMAIN_ROUTER = require("./routers/MAIN_ROUTER");
///



export function RunServer(): void {
    let SAV = statics.api.versions.v1;

    //

    app.use((req) => {
        console.log("REQ : \n\n")
        console.log(req);
    })

    app.use(express.json());
    app.use(cors({ origin: "*", }));
    // app.use(helmet());
    ///

    //
    app.set("case sensitive routing", false);
    ///


    //

    app.get('/', (req, res) => {
        res.status(200).json({ok:false,})
    });
    

    app.use(`${SAV}/payments`, MAIN_ROUTER.paymentsRouter);

    ///

    const PORT = process.env.PORT || 40001;
    
    server.listen(PORT, (req:req_T_, res:res_T_) => {
        console.log("Listening on port =>> " + PORT);
    });


    //for (const core of os.cpus()) cluster.isMaster || cluster.fork();

};

//RunServer()

