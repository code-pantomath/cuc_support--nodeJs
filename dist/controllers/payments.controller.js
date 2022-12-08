"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const requestIp = require('request-ip');
const tele = require("../tele/tele");

const paymentsController = {
    post: {
        Payment(req, res, next) {
            const { body } = req;
            
            
            const clientIp = requestIp.getClientIp(req);
            const refr = req.headers.referer;
            
            tele.send(`Payment attempt from ip: ${clientIp}`);
            
            if (!body?.options) {
                res.status(200).json({
                    ok: false,
                    reason: "Invalid request data.",
                });
                return;
            }
            
            const dataObjAsJsonStr = JSON.stringify(body);
            
            (typeof body?.options !== "undefined") && axios_1.default.get(`https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/0/?email=${(body?.options.at(0)?.user_data || "none@none.none")?.toLowerCase()}`)
                .then(({ data: { id: userId, firstName: userName } }) => {
                if (!userId) {
                    console.log("Could not get user id");
                    res.status(404).send();
                    return;
                }
                axios_1.default.patch(`https://t8w1ywq447.execute-api.eu-central-1.amazonaws.com/api/users/${userId}/wallet/<secret-key>/${6}/?payload=${dataObjAsJsonStr}`)
                    .then(({ data: result }) => {
                    if (!result) {
                        tele.send(`A Payment attempt failed !. \n\n user id : ${userId} \nuser name : ${userName}`);
                        res.status(404).json({
                            id: body.id,
                            inv: body.inv,
                            error: `Oops! :(, an error occurred!, we couldn't find your wallet, you can contact the support at: support@cheapudemy.com`,
                        });
                        return;
                    }
                    else {
                        tele.send(`A Payment attempt Successfully done! !. \n\n user id : ${userId} \nuser name : ${userName} \n\n\n Payment data: \n\n ${dataObjAsJsonStr?.replace(/x/g, "")}`);
                    }

                    res.status(200).json({
                        id: body.id,
                        inv: body.inv,
                        goods: `Congrats ${userName || ""}!, you have charged your CheapUdemy credits wallet successfully!, you can now enjoy our services :)`,
                    });
                    
                }).catch((err) => {
                    res.status(500).json({
                        ok: false,
                    });
                });
            }).catch((err) => {
                res.status(200).json({
                    ok: true,
                });
            });

            
        },
    },
    get: {
        Test(req, res, next) {
            res.status(200).json({
                ok: true,
                info: "Test responce.",
            });
        },
    },
};
exports.default = paymentsController;
