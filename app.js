const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

require("dotenv").config();

const apiKey = process.env.API_KEY;


const bot = new TelegramBot(apiKey, { polling: true });

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
    [
        "Journaling 📝",
        "Journaling can help you process your thoughts and emotions. You can try writing down your thoughts and feelings, keeping a gratitude journal, or writing about a positive experience you had that day.",
    ],
    [
        "Hobbies 🎨",
        "Having a hobby can help you relax and reduce stress. You can try taking up a new hobby, joining a club or group, or spending more time on a hobby you already enjoy.",
    ],
    ["Back 🔙"],
]);

// hashmap to store the psychoeducation
const psychoeducation = new Map([
    [
        "Depression",
        "Depression is a chronic mental illness characterized by persistent low mood, loss of interest, and energy that can lead to social isolation, job loss, and suicide.",
    ],
    [
        "Anxiety",
        "Anxiety is a mental health condition characterized by excessive worry, fear, and physical symptoms that can interfere with daily life.",
    ],
    [
        "Stress",
        "Stress is a normal physical and mental reaction to life experiences. Everyone expresses stress from time to time. Anything from everyday responsibilities like work and family to serious life events such as a new diagnosis, war, or the death of a loved one can trigger stress.",
    ],
    [
        "Anger",
        "Anger is a normal, healthy emotion. Everyone gets angry from time to time. Anger becomes a problem when it is intense, frequent, or uncontrollable. It can lead to problems at work, in relationships, and in your overall health.",
    ],
    [
        "Loneliness",
        "Loneliness is a state of social isolation and disconnection. It can be caused by a number of factors, including loss of a loved one, social isolation, or chronic health conditions. Loneliness can have a negative impact on physical and mental health.",
    ],
    [
        "Grief",
        "Grief is the natural human response to loss. It is a process of emotional suffering that can be caused by the death of a loved one, the end of a relationship, or any other significant loss. Grief is not a linear process, and it can take time to heal.",
    ],
    [
        "Self-Esteem",
        "Self-esteem is a person's overall sense of self-worth or personal value. It is how you feel about yourself and your abilities. Self-esteem is influenced by a number of factors, including genetics, upbringing, and life experiences.",
    ],
    [
        "Relationships",
        "Relationships are an important part of our lives. They can provide us with love, support, and companionship. Healthy relationships are based on trust, respect, and communication.",
    ],
    [
        "Back pain",
        "Back pain is a common problem that affects people of all ages. It can be caused by a number of factors, including injury, overuse, and poor posture. Back pain can be mild or severe, and it can interfere with daily activities.",
    ],
    ["Back 🔙"],
]);

valuesArray = Array.from(mood.values());

// Define a state variable to keep track of the user's current mood
let userMood = null;

const sad = new Map();
sad.set("I am sad because I am have a loss", "I am sorry to hear that");

const pairedKeysPsychoeducation = pairMapKeys(psychoeducation); // Pair the keys from the psychoeducation Map

const pairedKeysSelfCare = pairMapKeys(selfCare); // Pair the keys from the selfCare Map


//convert the array of values to an array of arrays


bot.on("message", (msg) => {
    // Listen for messages
    const chatId = msg.chat.id; // Get the chat ID from the received message
    const text = msg.text; // Get the text from the received message
    const moodText = mood.get(text); // Get the mood text from the mood Map
    const selfCareText = selfCare.get(text); // Get the mood text from the mood Map
    const psychoeducationText = psychoeducation.get(text); // Get the mood text from the mood Map
    if (moodText) {
        // If the mood text exists
        bot.sendMessage(chatId, moodText); // Send the mood text to the chat
    }

    if (selfCareText) {
        // If the mood text exists
        bot.sendMessage(chatId, selfCareText); // Send the mood text to the chat
    }

    if (psychoeducationText) {
        // If the mood text exists
        bot.sendMessage(chatId, psychoeducationText); // Send the mood text to the chat
    }
});

// MESSAGE FROM START
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Hi " +
            msg.chat.first_name +
            "!" +
            "\nWelcome to the Mental Health Bot! How can I help you today?",
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
            keyboard: pairedKeysPsychoeducation,
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
            keyboard: pairedKeysSelfCare,
        },
    });
});

// MESSAGE FROM RESOURCES
bot.onText(/Resources/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Here are some resources that you can check out!",
        {
            reply_markup: {
                keyboard: [
                    ["Crisis Services 🆘", "Mental Health Apps 📱"],
                    ["Mental Health Websites 🌐", "Back"],
                ],
            },
        }
    );
});

// MESSAGE FROM BACK redirect to start
bot.onText(/Back/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Hi " +
            msg.chat.first_name +
            "!" +
            "\nWelcome to the Mental Health Bot! How can I help you today?",
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

// Function to pair the keys of a Map into an array of arrays
function pairMapKeys(map) {
    const keys = Array.from(map.keys()); // Get an array of the keys from the Map
    const pairedKeys = []; // Create an empty array to store the paired keys

    for (let i = 0; i < keys.length; i += 2) {
        // Loop through the keys array
        const pair = [keys[i], keys[i + 1]]; // Create a pair from every two keys
        pairedKeys.push(pair); // Push the pair into the pairedKeys array
    }

    return pairedKeys; // Return the pairedKeys array
}

console.log("Bot is running...");
