"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tele_1 = __importDefault(require("../tele/tele"));
const db_1 = __importDefault(require("../mongo/db"));
let isRunChatTeleBotListenerAllowed = false;
function RunChatTeleBotListener(bot, io_ws, ws_io) {
    isRunChatTeleBotListenerAllowed &&
        bot.self.on('message', (msg) => {
            // const chatId = msg.chat.id;
            const trimmedMsg = (msg?.text + "").toLowerCase().trim().replace(/ /g, '');
            // send a message to the chat acknowledging receipt of their message
            msg?.text === "check" && bot.self.sendMessage(bot.admin_chat_id, 'Received your message');
            const receivedSocketIdFromSupportMsg = msg?.text?.split("__")?.at(1);
            //// console.log("Socket ID ", receivedSocketIdFromSupportMsg);
            //// console.log("new msg from admin : ", msg);
            const finalResponceMsg = (msg?.text + "").replace(`${receivedSocketIdFromSupportMsg}`, "").replace("__", '').replace("aofq", "").trim();
            if (trimmedMsg.includes("aofq") && trimmedMsg.includes("__")) {
                //// console.log(trimmedMsg, "Trimmed msg");
                // io_ws?.emit("Support_Msg", {msg: finalResponceMsg});
                io_ws?.emit("Support_Msg", { msg: finalResponceMsg });
                // io_ws.removeAllListeners();
            }
            ;
        });
}
function RunChatWSEngain(io) {
    io.on("connection", (socket) => {
        // socket.removeAllListeners();
        //// console.log(socket.id);
        isRunChatTeleBotListenerAllowed = true;
        RunChatTeleBotListener(tele_1.default?.bot, socket, io);
        ///
        socket.on("Get_AllMsgs", (({ userId }) => {
            //// console.log("Get_AllMsgs ", userId);
            if (!userId)
                return;
            db_1.default.connect().then(() => {
                db_1.default.docs.chats.getAllMsgs(userId).then(msgs => {
                    //// console.log(msgs);
                    socket.emit("Send_AllMsgs", { msgs });
                });
            });
            // await db.disconnect();
        }));
        socket.on("User_Msg", (msgDataPyload) => {
            // //// console.log(msg);
            const { msg, userIp, userId, userEmail } = msgDataPyload;
            //// console.log("UID : ", userId)
            tele_1.default.send((` 
                QUESTION :
                
                |WSID|${socket.id}|WSID|
                |IP|${userIp}|IP|
                |USERID|${userId}|USERID|
                |EMAIL|${userEmail}|EMAIL|
                
                
                ${msg}
                `)
            // ,{
            //     onReply: (message:any) => {
            //         console.log('OK. I\'ll search for %s', message?.text);
            //     },
            // }
            ).then(() => tele_1.default.send(socket.id)).catch(err => console.error(err));
            if (userId) {
                db_1.default.connect().then(() => {
                    db_1.default.checkIfIsConnected() &&
                        db_1.default.docs.chats.create(msgDataPyload).then(() => {
                            db_1.default.docs.chats.addMsg({
                                userId,
                                msgObj: {
                                    msg,
                                    kind: "user",
                                    date: new Date().getDate(),
                                },
                            });
                            // .finally(() => db.disconnect()); // NOT GOOD PRACTICE!!
                            // .finally(() => 0);
                        });
                });
            }
        });
        socket.on("Support_Msg__Received", (dataObj) => {
            // if (!userId) return;
            const { msg, userId } = dataObj;
            //// console.log("Support_Msg__Received ", userId);
            if (userId) {
                db_1.default.docs.chats.addMsg({
                    userId,
                    msgObj: {
                        msg,
                        kind: "support",
                        date: new Date().getDate(),
                    }
                }).catch((err) => console.error(err));
            }
        });
        socket.on("disconnect", () => {
            // socket.removeAllListeners('User_Msg');
            // socket.removeAllListeners("Support_Msg__Received");
            // socket.removeAllListeners('disconnect');
            // io.removeAllListeners('connection');
            // socket.removeAllListeners();
            isRunChatTeleBotListenerAllowed = false;
            db_1.default.disconnect();
            tele_1.default.bot.self?.removeListener("message");
        });
        ///
    });
}
exports.default = RunChatWSEngain;
