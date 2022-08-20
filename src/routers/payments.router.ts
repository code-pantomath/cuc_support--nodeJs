import { express, router_T_ } from "../app";

import paymentsController from "../controllers/payments.controller";


const paymentsRouter:router_T_ = express.Router();


paymentsRouter.route("/proc")
    .all(paymentsController.post.Payment)
    // .get(paymentsController.post.Payment)
;


module.exports = paymentsRouter;