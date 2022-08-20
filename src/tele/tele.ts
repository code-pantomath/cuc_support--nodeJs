const TeleBot = require('node-telegram-bot-api');


const BOT_TOKEN:string = "5606555760:AAGceWjyvWu-PbEW65IgqGrXSOD0042p3VY";
const CHAT_ID:string = "898821400";

const bot = new TeleBot(BOT_TOKEN, {
    polling: true,
});

bot.on('message', (msg:any) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(CHAT_ID, 'Received your message');
});

const tele = {

    send(msg:string) {

        bot.sendMessage(CHAT_ID, msg);

    },

}


module.exports = tele;