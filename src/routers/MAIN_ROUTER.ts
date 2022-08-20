const paymentsRouter = require("./payments.router");


///

export interface IMAIN_ROUTER {
    paymentsRouter: typeof paymentsRouter,
}

const MAIN_ROUTER:IMAIN_ROUTER = {
    paymentsRouter,
}

///


module.exports = MAIN_ROUTER;