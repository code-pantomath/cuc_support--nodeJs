import mongoose  from "mongoose";

const chat_Schema = new mongoose.Schema({

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
        type: [{ msg: String, kind: String, date: mongoose.Schema.Types.Mixed, }], // This secifies an array of objects type in mongoose scema!...
        required: true,
        default: [],
    },

});

// const chatMsg_Schema = new mongoose.Schema({
//     msg: {
//         type: String,
//         required: true,
//     },
//     date: Date,
// });


const chats_Model = mongoose.model("Chat_Schema", chat_Schema);
export default chats_Model;