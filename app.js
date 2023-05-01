const TelegramBot = require("node-telegram-bot-api");
const ChatGPT = require("./chatgpt.js");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();
// const Telebot = require('telebot');
const apiKey = process.env.API_KEY;

const { text } = require("express");

const bot = new TelegramBot(apiKey, { polling: true });

// Create a new instance of the ChatGPT class

// const configuration = new Configuration({
//     apiKey: process.env.API_KEY_CHATGPT,
// });
// const openai = new OpenAIApi(configuration);

// async function generateCompletion() {
//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: "Say this is a test",
//         temperature: 0,
//         max_tokens: 7,
//     });
//     console.log(response.data.choices[0].text);
// }

// generateCompletion();
// hashmap to store the user's mood
const mood = new Map([
    ["Happy", "Glad to hear that"],
    ["Sad", "I am sorry to hear that\nI am here to listen to you"],
    [
        "Angry",
        [
            "I am sorry to hear that",
            "I am here to listen to you",
            "put your anger into words",
        ],
    ],
    ["Tired", "you should take a rest"],
    ["Lonely", "I am sorry to hear that"],
    ["Stressed", "I am sorry to hear that"],
    ["Anxious", "I am sorry to hear that"],
    ["Depressed", "I am sorry to hear that"],
]);

// hashmap to store the self-care tips
const selfCare = new Map([
    [
        "Meditation 🧘‍♀️",
        "Meditation can help reduce stress and improve mental clarity. You can try using a meditation app, practicing deep breathing exercises, or finding a quiet place to sit and clear your mind.",
    ],
    [
        "Exercise 🏃‍♀️",
        "Exercise can boost your mood and help reduce symptoms of depression and anxiety. You can try going for a walk, doing a yoga class, or trying a new sport or activity that you enjoy.",
    ],
    [
        "Sleep 😴",
        "Getting enough sleep is important for your mental health. You can try going to bed at the same time every night, avoiding screens before bed, and creating a relaxing bedtime routine.",
    ],
    [
        "Healthy Eating 🥗",
        "Eating a balanced diet can help improve your mood and energy levels. You can try meal prepping, eating more fruits and vegetables, and limiting your intake of processed foods.",
    ],
    [
        "Socializing 👯‍♀️",
        "Spending time with friends and family can help improve your mood and reduce feelings of loneliness. You can try scheduling regular social activities, joining a club or group, or reaching out to a friend you haven't talked to in a while.",
    ],
]);

// console.log values of the hashmap
// console.log(mood.get("Happy"));
// console.log("prueba");
valuesArray = Array.from(mood.values());
// console.log(valuesArray);

// Define a state variable to keep track of the user's current mood
let userMood = null;

const sad = new Map();
sad.set("I am sad because I am have a loss", "I am sorry to hear that");

// console.log(mood);

const selfCareKeys = Array.from(selfCare.keys()); // Get an array of the keys from the mood Map
const keyboardSelfCare = selfCareKeys.map((key) => [key]); // Convert the array of keys to an array of arrays

const moodKeys = Array.from(mood.keys()); // Get an array of the keys from the mood Map
const keyboard = moodKeys.map((key) => [key]); // Convert the array of keys to an array of arrays
//convert the array of values to an array of arrays
const moodValues = Array.from(mood.values());
const keyboard2 = moodValues.map((value) => [value]);
// console.log(keyboard2);

bot.on("message", (msg) => {
    // Listen for messages
    const chatId = msg.chat.id; // Get the chat ID from the received message
    const text = msg.text; // Get the text from the received message
    const moodText = mood.get(text); // Get the mood text from the mood Map
    const selfCareText = selfCare.get(text); // Get the mood text from the mood Map
    if (moodText) {
        // If the mood text exists
        bot.sendMessage(chatId, moodText); // Send the mood text to the chat
    }

    if (selfCareText) {
        // If the mood text exists
        bot.sendMessage(chatId, selfCareText); // Send the mood text to the chat
    }
});

// bot.onText(/\/start/, (msg) => {
//     bot.sendMessage(
//         msg.chat.id,
//         "Welcome " +
//             msg.chat.first_name +
//             " to DoctorMasterBot \n\n" +
//             "How do you feel today?",
//         {
//             reply_markup: {
//                 keyboard: keyboard,
//             },
//         }
//     );
// });

// MESSAGE FROM START
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Welcome to the Mental Health Bot! How can I help you today?",
        {
            reply_markup: {
                keyboard: [
                    ["Psychoeducation 📚", "Emotional Support 🤗"],
                    ["Symptoms 🤒", "Self-Care Tips 🧘‍♀️ "],
                    ["Resources"],
                ],
            },
        }
    );
});

// MESSAGE FROM PSYCHOEDUCATION
bot.onText(/Psychoeducation/, (msg) => {
    bot.sendMessage(msg.chat.id, "What would you like to learn about today?", {
        reply_markup: {
            keyboard: [
                ["Depression", "Anxiety"],
                ["Stress", "Anger"],
                ["Loneliness", "Grief"],
                ["Self-Esteem", "Relationships"],
                ["Back"],
            ],
        },
    });
});

// MESSAGE FROM EMOTIONAL SUPPORT
bot.onText(/Emotional Support/, (msg) => {
    bot.sendMessage(msg.chat.id, "What would you like to talk about today?", {
        reply_markup: {
            keyboard: [
                ["I am sad 😢", "I am angry 😡"],
                ["I am anxious 😟", "I am stressed 😖"],
                ["I am lonely 😔", "I am tired 😴"],
                ["Back"],
            ],
        },
    });
});

// MESSAGE FROM SYMPTOMS
bot.onText(/Symptoms/, (msg) => {
    bot.sendMessage(msg.chat.id, "What symptoms are you experiencing?", {
        reply_markup: {
            keyboard: [
                ["Depression", "Anxiety"],
                ["Stress", "Anger"],
                ["Loneliness", "Grief"],
                ["Self-Esteem", "Relationships"],
                ["Back"],
            ],
        },
    });
});

// MESSAGE FROM SELF-CARE TIPS
bot.onText(/Self-Care Tips/, (msg) => {
    bot.sendMessage(msg.chat.id, "Here are some self-care tips for you!", {
        reply_markup: {
            keyboard: keyboardSelfCare,
        },
    });
});
