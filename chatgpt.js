// module to re-use the GPT chatbot

// import the GPT chatbot

const axios = require("axios");

class ChatGPT {
    constructor(apiKey, model, temperature = 0.7) {
        this.apiKey = apiKey;
        this.model = model;
        this.temperature = temperature;
    }

    async sendMensaje(message) {
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/engines/${this.model}/completions`,
                {
                    prompt: message,
                    max_tokens: 150,
                    n: 1,
                    stop: "\n",
                    temperature: this.temperature,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );
            if (
                response.data.choices &&
                response.data.choices.length > 0 &&
                response.data.choices[0].text
            ) {
                return response.data.choices[0].text.trim();
            } else {
                console.error(
                    "Invalid response from OpenAI API:",
                    response.data
                );
                return "Sorry, I could not understand your message.";
            }
        } catch (error) {
            console.error("Error communicating with OpenAI API:", error);
            return "Sorry, there was an error processing your message.";
        }
    }
}

module.exports = ChatGPT;
