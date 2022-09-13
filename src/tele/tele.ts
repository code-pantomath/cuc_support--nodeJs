const TeleBot = require('node-telegram-bot-api');


const BOT_TOKEN:string = "5606555760:AAGceWjyvWu-PbEW65IgqGrXSOD0042p3VY";
const CHAT_ID:string = "898821400";

const bot = new TeleBot(BOT_TOKEN, {
    polling: true,
});


const tele = {

    bot: {
        self: bot,
        token: BOT_TOKEN,
        admin_chat_id: CHAT_ID,
    },

    async send(msg:string, configObj?: any, ) {

        await bot.sendMessage(CHAT_ID, msg)
        // .then((sentMsg:any) => { typeof configObj?.onReply !== "undefined" &&
        //     bot.onReplyToMessage(CHAT_ID, sentMsg?.message_id, (msg:any) => configObj?.onReply(msg));
        // });

    },

}


export default tele;