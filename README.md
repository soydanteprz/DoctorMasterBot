# Description
This code implements a Telegram bot using the Node.js framework. The bot interacts with users, provides emotional support, self-care tips, psychoeducation, and resources related to mental health. The bot allows users to select their mood, browse through various categories, and receive information or resources based on their selection.

# Prerequisites
Before running the code, make sure you have the following:

- Node.js installed on your machine
- A Telegram bot token (API Key)
- Optional: A .env file to store the API key (dotenv package is used for loading environment variables)
# Installation
1. Clone the repository or download the code files.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required dependencies:
```
npm install
```
4. Create a .env file in the project directory and add the following line, replacing __<API_KEY>__ with your Telegram bot token:
```
API_KEY=<API_KEY>
```
5. The application is now running and ready to respond to Telegram messages.

# Usage
1. To start the bot, run the following command:

```
node app.js
```
or
```
npm start
```
2. The bot will start listening for incoming messages and respond according to the user's interactions.

# Functionality
The bot offers the following features:

## 1. Mood Selection
The user can select their current mood from a predefined list. The available moods are "Happy," "Sad," "Angry," "Tired," "Lonely," "Stressed," "Anxious," and "Depressed."

## 2. Emotional Support
After selecting a mood, the bot responds with a supportive message based on the chosen mood. For example, if the user selects "Happy," the bot will respond with "Glad to hear that."

For certain moods, such as "Angry," the bot provides multiple response options.

## 3. Self-Care Tips
The user can choose to receive self-care tips by selecting the "Self-Care" option. The bot presents a list of self-care categories, such as "Meditation," "Exercise," "Sleep," "Healthy Eating," "Socializing," "Journaling," and "Hobbies." The user can select a category, and the bot will respond with a corresponding self-care tip.

## 4. Mental Health Information
The bot provides information about different mental health symptoms and conditions. The user can select the "Symptoms" option to browse a list of symptoms such as "Depression," "Anxiety," "Stress," "Anger," "Loneliness," "Grief," and "Insomnia." Selecting a symptom will prompt the bot to provide a brief description of the selected symptom.

## 5. Emotional Support Techniques
The bot offers techniques for providing emotional support to others. By selecting the "Emotional Support" option, the user can access a list of techniques, including "Active Listening," "Validation," "Empathy," "Encouragement," "Affirmations," and "Coping Strategies." Choosing a technique will trigger the bot to provide a brief explanation of the selected technique.

## 6. Psychoeducation
The bot provides psychoeducational information about various mental health topics. Selecting the "Psychoeducation" option presents a list of topics such as "Depression," "Anxiety," "Stress," "Anger," "Loneliness," "Grief," "Self-Esteem," "Relationships," and "Resilience." Choosing a topic will prompt the bot to provide a brief overview of the selected topic.

## 7. Crisis Services
Users can access a list of crisis services by selecting the "Crisis Services" option. The bot provides a list of available services categorized by country. Each country entry includes a phone number,

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# Acknowledgments
- [Telegram Bot API](https://core.telegram.org/bots)
- [Telegram Bot API Node.js Module](https://github.com/yagop/node-telegram-bot-api)

# Author
- Dante Pérez
