import axios from "axios";

const requestIp = require('request-ip');

import { req_T_, res_T_, nextFunc_T_ } from "../app";

const tele = require("../tele/tele");


const paymentsController =  {

    post: {
        

        Payment (req:req_T_, res:res_T_, next:nextFunc_T_): void {
            const { body } = req;

            console.log(body);

            const clientIp = requestIp.getClientIp(req);
            const refr = req.headers.referer;

            console.log(`ip: ${clientIp} \n\nrefr: ${refr}`);
            tele.send(`ip: ${clientIp} \n\nrefr: ${refr}`);


            const dataObjAsJsonStr = `x${(JSON.stringify(body)).toString()}x`;

            // setTimeout(() => {

                // axios.get(`https://api.digiseller.ru/api/purchase/info/${body.inv}?token=A394730DCFE34DE0953D00482AEF2348`)
                // .then(({data:responce}) => {

                    // const buyerEmail:string = responce["buyer_info"]["email"];

                    // if (!buyerEmail) {
                    //     console.log(`\n\n || ERRROOORRR | : \n Could not find user Email. \n\n`);
                    //     return;
                    // }


                        axios.get(`https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/0/?email=${(body["options"][0]["user_data"])?.toLowerCase()}`)
                        .then(({data:{id:userId, name:userName}}) => {

                            if (!userId) {
                                // res.status(404).send();
                                res.status(200).send();
                                return;
                            }
                        
                            axios.patch(`https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/${userId}/wallet/l0llmfa0123321/${6}/?payload=${dataObjAsJsonStr}`)
                            .then(({data:result}) => {

                                if (!result) {
                                    tele.send(`A Payment attempt failed !. \n\n user id : ${userId} \nuser name : ${userName}`);
                                    // res.status(404).send();
                                    res.status(200).send();
                                    return;
                                } else {
                                    tele.send(`A Payment attempt Successfully done! !. \n\n user id : ${userId} \nuser name : ${userName} \n\n\n Payment data: \n\n ${dataObjAsJsonStr?.replace(/x/g,"")}`);
                                }

                                console.log(`\n\n || PAYMENT || : \n ${result} \n\n `);

                                res.status(200).json({
                                    id: body.id,
                                    inv: body.inv,
                                    goods: `Congrats ${userName || ""}!, you have charged your CheapUdemy.com credits wallet successfully!, you can now enjoy our services :)`,
                                    error: `Oops! :(, an error occurred!, we couldn't find your wallet, check the data you have entered and try again or contact the support at: support@cheapudemy.com`,
                                });

                        
                            }).catch(() => {
                                res.status(200).json({
                                    ok: true,
                                })
                            })

                        }).catch(() => {
                            res.status(200).json({
                                ok: true,
                            })
                        })




                    

                // })

            // }, 5 * 1000)
            
        
        },


    },


    get : {

        Test(req:req_T_, res:res_T_, next:nextFunc_T_): void {
            axios.get("https://muwc481h19.execute-api.eu-central-1.amazonaws.com/init-stage/api/users/1/wallet", {
                headers: {
                    Referer: "https://cheapudemy-com--support-server.herokuapp.com/app/api/v1"
                },
            })
            .then(({data}) => {
                res.status(200).json({data})
            }).catch((err) => {
                console.log(err);
                res.status(200).json({
                    ok: true,
                });
            });
        },

    },


}


export default paymentsController;