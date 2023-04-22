const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
// const Telebot = require('telebot');
const apiKey = process.env.API_KEY;
const { text } = require("express");

const bot = new TelegramBot(apiKey, { polling: true });

bot.on("message", (msg) => {
    const happy = "happy";
    if (msg.text.toString().toLowerCase().includes(happy)) {
        bot.sendMessage(msg.chat.id, "Glad to hear that");
    }
    const bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }

    const sad = "sad";
    if (msg.text.toString().toLowerCase().includes(sad)) {
        bot.sendMessage(msg.chat.id, "Sorry to hear that");
    }
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Welcome " +
            msg.chat.first_name +
            " to DoctorMasterBot \n\n" +
            "How do you feel today?",
        {
            reply_markup: {
                keyboard: [
                    ["Happy", "Sad", "Angry", "Tired"],
                    ["Lonely", "Stressed", "Anxious"],
                    ["Depressed", "Frustrated", "Hopeless"],
                    ["Worried", "Shame", "Embarrassed"],
                    ["Other"],
                ],
            },
        }
    );
});
