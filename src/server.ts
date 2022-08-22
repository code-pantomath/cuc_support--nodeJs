import { app, express, req_T_, res_T_, nextFunc_T_, } from "./app";

const cors = require('cors');
const helmet = require("helmet");
import bodyParser from "body-parser";

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

    // app.use((req, _, next) => {
    //     console.log("REQ : \n\n")
    //     console.log(req.body + "\n\n" + req.baseUrl);
    //     console.log(req);
    //     console.log((req as any)?.data || "ff")

    //     next();
    // })


    // app.use(express.json());
    // app.use(express.json())

    //Configure and resolve the form request body. The type is: application / APP
    app.use(express.json())

    //Parse the form request body. The type is: application / x-www-form-urlencoded
    app.use(express.urlencoded())

    app.use(cors({ origin: "*", }));
    // app.use(bodyParser.json({ type: 'application/*+json' }))
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    // app.use(bodyParser.json());

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

