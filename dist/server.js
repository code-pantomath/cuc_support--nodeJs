"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunServer = void 0;
const app_1 = require("./app");
const cors = require('cors');
const helmet = require("helmet");
const http = require('http');
// const os = require('os'); 
// const cluster = require('cluster');
//const path = require('path');
const server = http.createServer(app_1.app);
//
const statics_1 = __importDefault(require("./static/statics"));
const MAIN_ROUTER = require("./routers/MAIN_ROUTER");
///
function RunServer() {
    let SAV = statics_1.default.api.versions.v1;
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
    // app.use((req, res, next) => {
    //     // req.set
    //     req.headers["content-type"] = "application/json";
    // })
    //Configure and resolve the form request body. The type is: application / APP
    app_1.app.use(app_1.express.json({ type: "text/json" }));
    //Parse the form request body. The type is: application / x-www-form-urlencoded
    app_1.app.use(app_1.express.urlencoded({ type: "text/json" }));
    app_1.app.use(cors({ origin: "*", }));
    // app.use(bodyParser.json({ type: 'application/*+json' }))
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    // app.use(bodyParser.json());
    // app.use(helmet());
    ///
    //
    app_1.app.set("case sensitive routing", false);
    ///
    //
    app_1.app.get('/', (req, res) => {
        res.status(200).json({ ok: false, });
    });
    app_1.app.use(`${SAV}/payments`, MAIN_ROUTER.paymentsRouter);
    ///
    const PORT = process.env.PORT || 40001;
    server.listen(PORT, (req, res) => {
        console.log("Listening on port =>> " + PORT);
    });
    //for (const core of os.cpus()) cluster.isMaster || cluster.fork();
}
exports.RunServer = RunServer;
;
//RunServer()
