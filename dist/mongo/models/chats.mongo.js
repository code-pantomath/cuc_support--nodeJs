"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chat_Schema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    userIp: {
        type: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: true,
    },
    msgs: {
        type: [{ msg: String, kind: String, date: mongoose_1.default.Schema.Types.Mixed, }],
        required: true,
        default: [],
    },
});

const chats_Model = mongoose_1.default.model("Chat_Schema", chat_Schema);
exports.default = chats_Model;
