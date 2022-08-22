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
            console.log(body);
            console.log(req.headers);
            console.log("wow");
            const clientIp = requestIp.getClientIp(req);
            const refr = req.headers.referer;
            console.log(`ip: ${clientIp} \n\nrefr: ${refr}`);
            tele.send(`ip: ${clientIp} \n\nrefr: ${refr}`);
            if (!body?.options) {
                res.status(200).json({
                    ok: false,
                    reason: "Invalid request data.",
                });
                return;
            }
            const dataObjAsJsonStr = `x${(JSON.stringify(body)).toString()}x`;
            // setTimeout(() => {
            // axios.get(`https://api.digiseller.ru/api/purchase/info/${body.inv}?token=A394730DCFE34DE0953D00482AEF2348`)
            // .then(({data:responce}) => {
            // const buyerEmail:string = responce["buyer_info"]["email"];
            // if (!buyerEmail) {
            //     console.log(`\n\n || ERRROOORRR | : \n Could not find user Email. \n\n`);
            //     return;
            // }
            (typeof body?.options !== "undefined") && axios_1.default.get(`https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/0/?email=${(body?.options.at(0)?.user_data || "none@none.none")?.toLowerCase()}`, {
                headers: {
                    Referer: "https://cheapudemy-com--support-server.herokuapp.com/app/api/v1",
                },
            })
                .then(({ data: { id: userId, firstName: userName } }) => {
                if (!userId) {
                    // res.status(404).send();
                    console.log("Could not get user id");
                    res.status(200).send();
                    return;
                }
                axios_1.default.patch(`https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/${userId}/wallet/l0llmfa0123321/${6}/?payload=${dataObjAsJsonStr}`, {
                    headers: {
                        Referer: "https://cheapudemy-com--support-server.herokuapp.com/app/api/v1",
                    },
                })
                    .then(({ data: result }) => {
                    if (!result) {
                        tele.send(`A Payment attempt failed !. \n\n user id : ${userId} \nuser name : ${userName}`);
                        // res.status(404).send();
                        res.status(200).send();
                        return;
                    }
                    else {
                        tele.send(`A Payment attempt Successfully done! !. \n\n user id : ${userId} \nuser name : ${userName} \n\n\n Payment data: \n\n ${dataObjAsJsonStr?.replace(/x/g, "")}`);
                    }
                    console.log(`\n\n || PAYMENT || : \n ${result} \n\n `);
                    res.status(200).json({
                        id: body.id,
                        inv: body.inv,
                        goods: `Congrats ${userName || ""}!, you have charged your CheapUdemy.com credits wallet successfully!, you can now enjoy our services :)`,
                        // error: `Oops! :(, an error occurred!, we couldn't find your wallet, check the data you have entered and try again or contact the support at: support@cheapudemy.com`,
                    });
                }).catch((err) => {
                    console.log("ERROR \n \n", err);
                    res.status(200).json({
                        ok: true,
                    });
                });
            }).catch((err) => {
                console.log("ERROR \n \n", err);
                res.status(200).json({
                    ok: true,
                });
            });
            // })
            // }, 5 * 1000)
        },
    },
    get: {
        Test(req, res, next) {
            // axios.get("https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/1/wallet", {
            //     headers: {
            //         Referer: "https://cheapudemy-com--support-server.herokuapp.com/app"
            //     },
            // })
            // .then(({data}) => {
            //     res.status(200).json({data})
            // }).catch((err) => {
            //     console.log(err);
            //     res.status(200).json({
            //         ok: true,
            //     });
            // });
            res.status(200).json({
                ok: true,
            });
        },
    },
};
exports.default = paymentsController;
