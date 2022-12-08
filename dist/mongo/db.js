"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Methods_1 = require("../utils/Methods");
const access_details_1 = require("./access_details");
const chats_mongo_1 = __importDefault(require("./models/chats.mongo"));
const db = {
    async connect() {
        if (mongoose_1.default.connection.readyState === 1)
            return;
        await mongoose_1.default.connect(access_details_1.DB_CONNECTION_STRING);
        mongoose_1.default.connection.once("open", () => console.log("Connection established with chat db."));
        mongoose_1.default.connection.on("error", (err) => console.error("db connection error : ", err));
    },
    async disconnect() {
        if (mongoose_1.default.connection.readyState !== 1)
            return;
        await mongoose_1.default.disconnect();
        console.log("Connection closed with db.");
    },
    checkIfIsConnected() {
        return mongoose_1.default.connection.readyState === 1;
    },
    docs: {
        chats: {
            async create(dataObj) {
                await chats_mongo_1.default.findOne({ userId: dataObj?.userId }).then(async (result) => {
                    if (!result)
                        await chats_mongo_1.default.create({ ...(0, Methods_1.Util__OmitObjProp)("msg", dataObj), msgs: [] });
                    else
                        return null;
                })
                    .catch(err => console.log(err));
            },
            async addMsg({ userId: USER_ID, msgObj }) {
                await chats_mongo_1.default.findOne({ userId: USER_ID }).then((result) => {
                    if (result) {
                        result?.msgs?.push(msgObj);
                        result.save();
                        // return result;
                    }
                    else
                        return null;
                })
                    .catch(err => console.log(err));
            },
            async getAllMsgs(USER_ID) {
                return (await chats_mongo_1.default.findOne({ userId: USER_ID }))?.msgs;
            },
        },
    },
};
exports.default = db;
