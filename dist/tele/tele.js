"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeleBot = require('node-telegram-bot-api');
const BOT_TOKEN = "<THE_BOT_TOKEN>";
const CHAT_ID = "<THE_RECEIVER_TELEGRAN_ACCOUNT_ID>";

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
    },
};

exports.default = tele;
