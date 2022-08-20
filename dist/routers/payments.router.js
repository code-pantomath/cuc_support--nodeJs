"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const payments_controller_1 = __importDefault(require("../controllers/payments.controller"));
const paymentsRouter = app_1.express.Router();
paymentsRouter.route("/proc")
    .post(payments_controller_1.default.post.Payment)
    .get(payments_controller_1.default.post.Payment);
module.exports = paymentsRouter;
