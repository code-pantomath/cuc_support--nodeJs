import mongoose  from "mongoose";
import { Util__OmitObjProp } from "../utils/Methods";
import { DB_CONNECTION_STRING } from "./access_details";
import chats_Model from "./models/chats.mongo";


const db = {

    async connect() {
        if (mongoose.connection.readyState === 1) return;

        await mongoose.connect(DB_CONNECTION_STRING);
        mongoose.connection.once("open", () => console.log("Connection established with chat db.")) // Only once fist connection! because of ( .once() )
        mongoose.connection.on("error", (err) => console.error("db connection error : ", err));
    },

    async disconnect() {
        if (mongoose.connection.readyState !== 1) return;

        await mongoose.disconnect();
        console.log("Connection closed with db.")
    },

    checkIfIsConnected(): boolean {
        // return !([0,2,3,99].includes(mongoose.connection.readyState))
        return mongoose.connection.readyState === 1;
    },



    docs: {
        chats: {

            async create(dataObj: any) {
                await chats_Model.findOne({userId: dataObj?.userId}).then(async (result) => {
                    // if (!result) return await chats_Model.create({...Util__OmitObjProp("msg", dataObj), msgs: []});
                    if (!result) await chats_Model.create({...Util__OmitObjProp("msg", dataObj), msgs: []});
                    else return null;
                })
                .catch(err => console.log(err));
            },

            async addMsg({userId:USER_ID, msgObj}:any) {
                await chats_Model.findOne({userId: USER_ID}).then((result) => {
                    if (result) {
                        result?.msgs?.push(msgObj);
                        result.save();
                        // return result;
                    } else return null;
                })
                .catch(err => console.log(err));
            },

            async getAllMsgs(USER_ID:string|number) {
                return (await chats_Model.findOne({userId: USER_ID}) as any)?.msgs || [{ msg: "Any questions? 😀", kind: "support", date: new Date().toDateString(), }];
            },

        },
    },

};


export default db;