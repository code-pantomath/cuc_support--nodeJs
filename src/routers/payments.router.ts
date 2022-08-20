import { express, router_T_ } from "../app";

import paymentsController from "../controllers/payments.controller";


const paymentsRouter:router_T_ = express.Router();


paymentsRouter.route("/proc")
    .post(paymentsController.post.Payment)
    .get(paymentsController.get.Test)
;


module.exports = paymentsRouter;