import tele from "../tele/tele";

import { Socket } from "socket.io";
import db from "../mongo/db";


let isRunChatTeleBotListenerAllowed:boolean = false;
function RunChatTeleBotListener(bot:any, io_ws:Socket, ws_io:any) { isRunChatTeleBotListenerAllowed &&
    bot.self.on('message', (msg:any) => {
        // const chatId = msg.chat.id;
        const trimmedMsg:string = (msg?.text+"").toLowerCase().trim().replace(/ /g,'');
      
        // send a message to the chat acknowledging receipt of their message
        msg?.text === "check" && bot.self.sendMessage(bot.admin_chat_id, 'Received your message');

        const receivedSocketIdFromSupportMsg:string = msg?.text?.split("__")?.at(1);
        //// console.log("Socket ID ", receivedSocketIdFromSupportMsg);
    
        //// console.log("new msg from admin : ", msg);


        const finalResponceMsg:string = (msg?.text+"").replace(`${receivedSocketIdFromSupportMsg}`, "").replace("__",'').replace("aofq","").trim();

        if ( trimmedMsg.includes("aofq") && trimmedMsg.includes("__") ) {
            //// console.log(trimmedMsg, "Trimmed msg");
            // io_ws?.emit("Support_Msg", {msg: finalResponceMsg});
            io_ws?.emit("Support_Msg", {msg: finalResponceMsg});
            // io_ws.removeAllListeners();
        };
    
    });
}


export default function RunChatWSEngain(io: any) {


    io.on("connection", (socket: Socket) => {
        // socket.removeAllListeners();
        //// console.log(socket.id);

        isRunChatTeleBotListenerAllowed = true;
        RunChatTeleBotListener(tele?.bot, socket, io);
    

        ///

        socket.on("Get_AllMsgs", (({userId}) => {
            //// console.log("Get_AllMsgs ", userId);

            if (!userId) return;

            db.connect().then(() => {
                db.docs.chats.getAllMsgs(userId).then(msgs => {
                    //// console.log(msgs);
                    socket.emit("Send_AllMsgs", {msgs});
                });
            });
            
            // await db.disconnect();
        }));
        

        socket.on("User_Msg", (msgDataPyload) => {
            // //// console.log(msg);

            const {msg, userIp, userId, userEmail} = msgDataPyload;

            //// console.log("UID : ", userId)
            

            tele.send((
                ` 
                QUESTION :
                
                |WSID|${socket.id}|WSID|
                |IP|${userIp}|IP|
                |USERID|${userId}|USERID|
                |EMAIL|${userEmail}|EMAIL|
                
                ------------

                
                ${msg}
                `
            )
            // ,{
            //     onReply: (message:any) => {
            //         console.log('OK. I\'ll search for %s', message?.text);
            //     },
        
            // }
            ).then(() => tele.send(socket.id)).catch(err => console.error(err));
            

            if (userId) {
                db.connect().then(() => { db.checkIfIsConnected() &&

                    db.docs.chats.create(msgDataPyload).then(() => {
                        db.docs.chats.addMsg({
                            userId,
                            msgObj: {
                                msg,
                                kind: "user",
                                date: new Date().toDateString(),
                            },
                        })
                        // .finally(() => db.disconnect()); // NOT GOOD PRACTICE!!
                        // .finally(() => 0);

                    })
                })
            }

        });



        socket.on("Support_Msg__Received", (dataObj) => {
            // if (!userId) return;
            const {msg, userId} = dataObj;

            //// console.log("Support_Msg__Received ", userId);

            if (userId) {
                db.docs.chats.addMsg({
                    userId,
                    msgObj: {
                        msg,
                        kind: "support",
                        date: new Date().toDateString(),
                    }
                }).catch((err) => console.error(err));
            }
        });



        socket.on("disconnect", () => {

            // socket.removeAllListeners('User_Msg');
            // socket.removeAllListeners("Support_Msg__Received");
            // socket.removeAllListeners('disconnect');
            // io.removeAllListeners('connection');
            // socket.removeAllListeners(); /// NOT GOOOD!


            isRunChatTeleBotListenerAllowed = false;
            db.disconnect();
            tele.bot.self?.removeListener("message");
        });
    
        ///
    
    
    });

}
