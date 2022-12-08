"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunServer = exports.ws_io = void 0;
const app_1 = require("./app");
const cors = require('cors');
const helmet = require("helmet");
const http = require('http').Server(app_1.app);
exports.ws_io = require("socket.io")(http);

const statics_1 = __importDefault(require("./static/statics"));
const engain_1 = __importDefault(require("./chat/engain"));
const MAIN_ROUTER = require("./routers/MAIN_ROUTER");


function RunServer() {
    let SAV = statics_1.default.api.versions.v1;

    //Configure and resolve the form request body. The type is: application / APP
    app_1.app.use(app_1.express.json({ type: "text/json" }));
    
    //Parse the form request body. The type is: application / x-www-form-urlencoded
    app_1.app.use(app_1.express.urlencoded({ type: "text/json" }));
    app_1.app.use(cors({ origin: "*", }));
    
    //
    app_1.app.set("case sensitive routing", false);
    ///
    
    app_1.app.get('/', (req, res) => {
        res.status(200).json({ ok: false, });
    });
    app_1.app.use(`${SAV}/payments`, MAIN_ROUTER.paymentsRouter);
    
    ///
    (0, engain_1.default)(exports.ws_io);
    ///
    
    const PORT = process.env.PORT || 40001;
    http.listen(PORT, (req, res) => {
        console.log("Listening on port =>> " + PORT);
    });
    //for (const core of os.cpus()) cluster.isMaster || cluster.fork();
}

exports.RunServer = RunServer;
