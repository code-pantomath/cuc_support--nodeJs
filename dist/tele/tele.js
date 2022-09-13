"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeleBot = require('node-telegram-bot-api');
const BOT_TOKEN = "5606555760:AAGceWjyvWu-PbEW65IgqGrXSOD0042p3VY";
const CHAT_ID = "898821400";
const bot = new TeleBot(BOT_TOKEN, {
    polling: true,
});
const tele = {
    bot: {
        self: bot,
        token: BOT_TOKEN,
        admin_chat_id: CHAT_ID,
    },
    async send(msg, configObj) {
        await bot.sendMessage(CHAT_ID, msg);
        // .then((sentMsg:any) => { typeof configObj?.onReply !== "undefined" &&
        //     bot.onReplyToMessage(CHAT_ID, sentMsg?.message_id, (msg:any) => configObj?.onReply(msg));
        // });
    },
};
exports.default = tele;
