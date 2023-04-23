const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
// const Telebot = require('telebot');
const apiKey = process.env.API_KEY;
const { text } = require("express");

const bot = new TelegramBot(apiKey, { polling: true });

// hashmap to store the user's mood
const mood = new Map();

mood.set("Happy", "Glad to hear that");
mood.set("Sad", "I am sorry to hear that\nI am here to listen to you");
mood.set("Angry", [
    "I am sorry to hear that",
    "I am here to listen to you",
    "put your anger into words",
]);
mood.set("Tired", "you should take a rest");
mood.set("Lonely", "I am sorry to hear that");
mood.set("Stressed", "I am sorry to hear that");
mood.set("Anxious", "I am sorry to hear that");
mood.set("Depressed", "I am sorry to hear that");

// Define a state variable to keep track of the user's current mood
let userMood = null;

const sad = new Map();
sad.set("I am sad because I am have a loss", "I am sorry to hear that");

console.log(mood);

const moodKeys = Array.from(mood.keys()); // Get an array of the keys from the mood Map
const keyboard = moodKeys.map((key) => [key]); // Convert the array of keys to an array of arrays

bot.on("message", (msg) => {
    // Listen for messages
    const chatId = msg.chat.id; // Get the chat ID from the received message
    const text = msg.text; // Get the text from the received message
    const moodText = mood.get(text); // Get the mood text from the mood Map
    if (moodText) {
        // If the mood text exists
        bot.sendMessage(chatId, moodText); // Send the mood text to the chat
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
                keyboard: keyboard,
            },
        }
    );
});

bot.onText(
    new RegExp(`^(${Array.from(mood.keys()).join("|")})$`),
    (msg, match) => {
        const selectedMood = match[1];
        const selectedValue = mood.get(selectedMood);
        const chatId = msg.chat.id;

        if (Array.isArray(selectedValue)) {
            // If the selected value is an array, create a reply keyboard with each element as a button
            const replyKeyboard = selectedValue.map((value) => [
                { text: value },
            ]);
            bot.sendMessage(chatId, "You selected: " + selectedMood, {
                reply_markup: {
                    keyboard: replyKeyboard,
                    one_time_keyboard: true,
                },
            });
        } else {
            // If the selected value is a string, send it directly in a message
            bot.sendMessage(
                chatId,
                "You selected: " + selectedMood + "\n\n" + selectedValue
            );
        }
    }
);
