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

// hashmap to store the symptoms
const symptoms = new Map([
    [
        "Depression 😟",
        "Depression is a mental illness characterized by persistent sadness, loss of interest or pleasure, changes in appetite or sleep patterns, and difficulty concentrating or making decisions.",
    ],
    [
        "Anxiety 😓",
        "Anxiety is a mental health condition characterized by excessive worry, fear, and physical symptoms such as rapid heartbeat, shortness of breath, and restlessness.",
    ],
    [
        "Stress 🤬",
        "Stress is a response to demands or pressures that can cause physical, emotional, or psychological strain. It can manifest as irritability, difficulty sleeping, and changes in appetite.",
    ],
    [
        "Anger 🤬",
        "Anger is a strong emotion characterized by feelings of hostility, frustration, and a desire to retaliate. It can lead to increased heart rate, tense muscles, and aggressive behavior.",
    ],
    [
        "Loneliness 😢",
        "Loneliness is a subjective feeling of social isolation or a lack of companionship. It can contribute to feelings of sadness, emptiness, and a longing for connection.",
    ],
    [
        "Grief 💔",
        "Grief is the emotional response to loss, particularly the death of a loved one. It involves a range of feelings such as sadness, disbelief, guilt, and yearning.",
    ],
    [
        "Insomnia 😴 ",
        "Insomnia is a sleep disorder characterized by difficulty falling asleep, staying asleep, or experiencing poor sleep quality. It can lead to daytime fatigue, irritability, and difficulty concentrating.",
    ],
    ["Back 🔙"],
]);

const emotionalSupport = new Map([
    [
        "Active Listening 👂",
        "Active listening is a communication skill that involves fully focusing on, understanding, and responding to the speaker. It shows empathy and creates a safe space for someone to express their emotions.",
    ],
    [
        "Validation 🙌",
        "Validation is acknowledging and accepting someone's feelings, thoughts, and experiences as valid and understandable. It helps individuals feel heard, understood, and supported.",
    ],
    [
        "Empathy ❤️",
        "Empathy is the ability to understand and share the feelings of another person. It involves putting yourself in their shoes and providing compassionate support.",
    ],
    [
        "Encouragement 🌟",
        "Encouragement involves providing uplifting and supportive words or actions to boost someone's confidence, motivation, or sense of worth. It can inspire and empower individuals during difficult times.",
    ],
    [
        "Affirmations 🌈",
        "Affirmations are positive statements that help challenge negative self-talk and promote self-compassion. They can boost self-esteem and provide emotional support.",
    ],
    [
        "Coping Strategies 🧘",
        "Coping strategies are healthy techniques individuals use to manage and navigate difficult emotions or situations. They can include mindfulness, deep breathing, journaling, and seeking social support.",
    ],
    [
        "Gratitude 🙏",
        "Gratitude involves recognizing and appreciating the good things in life, even amidst challenges. Expressing gratitude can promote positivity and resilience.",
    ],
    ["Back 🔙"],
]);

// hashmap to store the psychoeducation
const psychoeducation = new Map([
    [
        "Depression 😔",
        "Depression is a chronic mental illness characterized by persistent low mood, loss of interest, and energy that can lead to social isolation, job loss, and suicide.",
    ],
    [
        "Anxiety 😰",
        "Anxiety is a mental health condition characterized by excessive worry, fear, and physical symptoms that can interfere with daily life.",
    ],
    [
        "Stress 😫",
        "Stress is a normal physical and mental reaction to life experiences. Everyone expresses stress from time to time. Anything from everyday responsibilities like work and family to serious life events such as a new diagnosis, war, or the death of a loved one can trigger stress.",
    ],
    [
        "Anger 😡",
        "Anger is a normal, healthy emotion. Everyone gets angry from time to time. Anger becomes a problem when it is intense, frequent, or uncontrollable. It can lead to problems at work, in relationships, and in your overall health.",
    ],
    [
        "Loneliness 😥",
        "Loneliness is a state of social isolation and disconnection. It can be caused by a number of factors, including loss of a loved one, social isolation, or chronic health conditions. Loneliness can have a negative impact on physical and mental health.",
    ],
    [
        "Grief 😢",
        "Grief is the natural human response to loss. It is a process of emotional suffering that can be caused by the death of a loved one, the end of a relationship, or any other significant loss. Grief is not a linear process, and it can take time to heal.",
    ],
    [
        "Self-Esteem 🌟",
        "Self-esteem is a person's overall sense of self-worth or personal value. It is how you feel about yourself and your abilities. Self-esteem is influenced by a number of factors, including genetics, upbringing, and life experiences.",
    ],
    [
        "Relationships 💑",
        "Relationships are an important part of our lives. They can provide us with love, support, and companionship. Healthy relationships are based on trust, respect, and communication.",
    ],
    [
        "Resilience 🌱",
        "Resilience is the ability to adapt and bounce back from adversity, stress, and trauma. It involves developing coping strategies, maintaining a positive outlook, and seeking support.",
    ],
    ["Back 🔙"],
]);

const Resources = new Map([["Crisis Services 🆘"]]);

const crisisServices = new Map([
    [
        "United States 🇺🇸",
        "988Suicide & Crisis Lifeline\nPhone number:  1-888-628-9454\nWebsite: https://988lifeline.org/\nText: Text HOME to 838255",
    ],
    [
        "Canada 🇨🇦",
        "Talksuicide.ca\nPhone number: 1-833-456-4566\nWebsite: https://talksuicide.ca/\nText: Text HOME to 45645",
    ],
    [
        "Mexico 🇲🇽",
        "Linea De LaVida\nPhone number: 800-911-2000\nWebsite: https://www.gob.mx/salud/conadic/acciones-y-programas/centro-de-atencion-ciudadana-contra-las-adicciones-134381\nFacebook: Linea De La Vida",
    ],
    [
        "United Kingdom 🇬🇧",
        "National Suicide Prevention Helpline\nPhone Number: 0800 689 5652\nWebsite: https://www.spuk.org.uk/national-suicide-prevention-helpline-uk/",
    ],
    [
        "Spain 🇪🇸",
        "Teléfono de la Esperanza\nPhono Number: 925 23 95 25\nWebsite: https://telefonodelaesperanza.org/",
    ],
    ["Back 🔙"],
]);

const mentalHealthApps = new Map([
    [
        "Headspace",
        "Headspace offers guided meditation and mindfulness exercises to reduce stress, improve focus, and promote better sleep.\n\nhttps://www.headspace.com/",
    ],
    [
        "Calm",
        "Calm is a mindfulness and meditation app that provides guided meditation sessions, breathing exercises, sleep stories, and relaxing music.\n\nhttps://www.calm.com/",
    ],
    [
        "Talkspace",
        "Talkspace provides online therapy with licensed therapists through text, voice, or video chats, making therapy more accessible and flexible.\n\nhttps://www.talkspace.com/",
    ],
    [
        "Moodpath",
        "Moodpath is an app that tracks and analyzes mood patterns, offers daily mental health assessments, and provides personalized recommendations for managing symptoms of depression and anxiety.",
    ],
    [
        "Sanvello",
        "Sanvello combines cognitive-behavioral therapy techniques with mood tracking and meditation exercises to help manage stress, anxiety, and depression.\n\nhttps://www.sanvello.com/",
    ],
    [
        "Woebot",
        "Woebot is a chatbot-based app that uses artificial intelligence to provide mental health support, engaging in conversations and offering evidence-based techniques to improve well-being.\n\nhttps://woebothealth.com/",
    ],
    [
        "BetterHelp",
        "BetterHelp is an online counseling platform that connects users with licensed therapists through messaging, live chat, phone calls, or video sessions for convenient access to professional support.\n\nhttps://www.betterhelp.com/",
    ],
    ["Back 🔙"],
]);

const mentalHealthWebsites = new Map([
    [
        "National Institute of Mental Health (NIMH)",
        "The NIMH website offers a wealth of information on various mental health conditions, research, treatment options, and resources for individuals, families, and professionals.\n\nhttps://www.nimh.nih.gov/",
    ],
    [
        "Mayo Clinic",
        "Mayo Clinic's mental health section provides comprehensive and reliable information on mental health topics, including symptoms, causes, diagnosis, and treatment. It also offers self-help resources and tips for managing mental health.\n\nhttps://www.mayoclinic.org/",
    ],
    [
        "Psych Central",
        "Psych Central is an online mental health resource that offers articles, news, forums, and quizzes on a wide range of mental health topics. It provides insights, advice, and support for individuals seeking information and understanding about their mental well-being.\n\nhttps://psychcentral.com/",
    ],
    [
        "Mental Health America (MHA)",
        "MHA is a leading community-based mental health organization that focuses on advocacy, education, and support. Their website offers screening tools, educational resources, and information on mental health conditions and treatment options.\n\nhttps://mhanational.org/",
    ],
    [
        "Anxiety and Depression Association of America (ADAA)",
        "ADAA's website provides comprehensive resources on anxiety, depression, OCD, PTSD, and related disorders. It offers information, treatment options, and strategies for managing these conditions.\n\nhttps://adaa.org/",
    ],
    [
        "National Alliance on Mental Illness (NAMI)",
        "NAMI is a grassroots mental health organization that provides support, education, and advocacy for individuals and families affected by mental illness. Their website offers educational resources, helpline support, and information on local support groups and services.\n\nhttps://www.nami.org/",
    ],
    [
        "WebMD",
        "WebMD's mental health section provides a wide range of articles, expert advice, and resources on mental health topics. It covers various conditions, treatments, and strategies for improving mental well-being.\n\nhttps://www.webmd.com/",
    ],
    [
        "HelpGuide",
        "HelpGuide is a nonprofit resource that provides articles, guides, and resources on mental health, emotional well-being, and self-help techniques. It covers topics such as stress management, depression, anxiety, relationships, and more.\n\nhttps://www.helpguide.org/",
    ],
    [
        "American Psychological Association (APA)",
        "The APA's website offers information on psychology topics, research findings, and mental health resources. It provides resources for the general public, students, and professionals in the field.\n\nhttps://www.apa.org/",
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

const pairedKeysCrisisServices = pairMapKeys(crisisServices); // Pair the keys from the crisisServices Map

const pairedKeysMentalHealthApps = pairMapKeys(mentalHealthApps); // Pair the keys from the mentalHealthApps Map

const pairedKeysMentalHealthWebsites = pairMapKeys(mentalHealthWebsites); // Pair the keys from the mentalHealthWebsites Map

const pairedKeysEmotionalSupport = pairMapKeys(emotionalSupport); // Pair the keys from the emotionalSupport Map

const pairedKeysSymptoms = pairMapKeys(symptoms); // Pair the keys from the symptoms Map
//convert the array of values to an array of arrays

bot.on("message", (msg) => {
    // Listen for messages
    const chatId = msg.chat.id; // Get the chat ID from the received message
    const text = msg.text; // Get the text from the received message
    const moodText = mood.get(text); // Get the mood text from the mood Map
    const selfCareText = selfCare.get(text); // Get the self-care text from the selfCare Map
    const psychoeducationText = psychoeducation.get(text); // Get the psychoeducation text from the psychoeducation Map
    const crisisServicesText = crisisServices.get(text); // Get the crisis services text from the crisisServices Map
    const mentalHealthAppsText = mentalHealthApps.get(text); // Get the mental health apps text from the mentalHealthApps Map
    const mentalHealthWebsitesText = mentalHealthWebsites.get(text); // Get the mental health websites text from the mentalHealthWebsites Map
    const emotionalSupportText = emotionalSupport.get(text); // Get the emotional support text from the emotionalSupport Map
    const symptomsText = symptoms.get(text); // Get the symptoms text from the symptoms Map
    if (moodText) {
        // If the mood text exists
        bot.sendMessage(chatId, moodText); // Send the mood text to the chat
    }

    if (selfCareText) {
        // If the self-care text exists
        bot.sendMessage(chatId, selfCareText); // Send the self-care text to the chat
    }

    if (psychoeducationText) {
        // If the psychoeducation text exists
        bot.sendMessage(chatId, psychoeducationText); // Send the psychoeducation text to the chat
    }

    if (crisisServicesText) {
        // If the crisis services text exists
        bot.sendMessage(chatId, crisisServicesText); // Send the crisis services text to the chat
    }

    if (mentalHealthAppsText) {
        // If the mental health apps text exists
        bot.sendMessage(chatId, mentalHealthAppsText); // Send the ¿mental health apps text to the chat
    }

    if (mentalHealthWebsitesText) {
        // If the mental health websites text exists
        bot.sendMessage(chatId, mentalHealthWebsitesText); // Send the mental health websites text to the chat
    }

    if (emotionalSupportText) {
        // If the emotional support text exists
        bot.sendMessage(chatId, emotionalSupportText); // Send the emotional support text to the chat
    }

    if (symptomsText) {
        // If the symptoms text exists
        bot.sendMessage(chatId, symptomsText); // Send the symptoms text to the chat
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
            keyboard: pairedKeysEmotionalSupport,
        },
    });
});

// MESSAGE FROM SYMPTOMS
bot.onText(/Symptoms/, (msg) => {
    bot.sendMessage(msg.chat.id, "What symptoms are you experiencing?", {
        reply_markup: {
            keyboard: pairedKeysSymptoms,
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

// MESSAGE FROM CRISIS SERVICES
bot.onText(/Crisis Services 🆘/, (msg) => {
    bot.sendMessage(msg.chat.id, "Here are some crisis services!", {
        reply_markup: {
            keyboard: pairedKeysCrisisServices,
        },
    });
});

// MESSAGE FROM MENTAL HEALTH APPS
bot.onText(/Mental Health Apps 📱/, (msg) => {
    bot.sendMessage(msg.chat.id, "Here are some mental health apps!", {
        reply_markup: {
            keyboard: pairedKeysMentalHealthApps,
        },
    });
});

// MESSAGE FROM MENTAL HEALTH WEBSITES
bot.onText(/Mental Health Websites 🌐/, (msg) => {
    bot.sendMessage(msg.chat.id, "Here are some mental health websites!", {
        reply_markup: {
            keyboard: pairedKeysMentalHealthWebsites,
        },
    });
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
