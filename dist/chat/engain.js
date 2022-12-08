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
            const trimmedMsg = (msg?.text + "").toLowerCase().trim().replace(/ /g, '');
            msg?.text === "check" && bot.self.sendMessage(bot.admin_chat_id, 'Received your message');
            const receivedSocketIdFromSupportMsg = msg?.text?.split("__")?.at(1);
            const finalResponceMsg = (msg?.text + "").replace(`${receivedSocketIdFromSupportMsg}`, "").replace("__", '').replace("aofq", "").trim();
            
        if (trimmedMsg.includes("aofq") && trimmedMsg.includes("__")) {
                io_ws?.emit("Support_Msg", { msg: finalResponceMsg });
            };
        });
}

function RunChatWSEngain(io) {
    io.on("connection", (socket) => {
        // socket.removeAllListeners();
        isRunChatTeleBotListenerAllowed = true;
        RunChatTeleBotListener(tele_1.default?.bot, socket, io);
        ///
        
        socket.on("Get_AllMsgs", (({ userId }) => {
            if (!userId)
                return;
            db_1.default.connect().then(() => {
                db_1.default.docs.chats.getAllMsgs(userId).then(msgs => {
                    socket.emit("Send_AllMsgs", { msgs });
                });
            });
            // await db.disconnect();
        }));
        
        socket.on("User_Msg", (msgDataPyload) => {
//             const { msg, userIp, userId, userEmail } = msgDataPyload;
            
            tele_1.default.send(JSON.stringify(msgDataPyload))
            // ,{
            //     onReply: (msg) => {
            //         console.log(msg);
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
                            // .finally(() => db.disconnect()); // NOT A GOOD PRACTICE!!
                            // .finally(() => 0);
                        });
                });
            }
        });
        socket.on("Support_Msg__Received", (dataObj) => {
            const { msg, userId } = dataObj;
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
            isRunChatTeleBotListenerAllowed = false;
            db_1.default.disconnect();
            tele_1.default.bot.self?.removeListener("message");
        });
        ///
    });
}
exports.default = RunChatWSEngain;
