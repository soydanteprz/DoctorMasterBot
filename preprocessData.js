const { data, mod } = require("@tensorflow/tfjs");
const csv = require("csv-parser");
const fs = require("fs");
const natural = require("natural");
const { stopwords } = require("natural");

const preprocessedData = [];

// fs.createReadStream("MentalHealthFAQ.csv")
//     .pipe(csv(["Question_ID", "Questions", "Answers"]))
//     .on("data", (data) => {
//         const preprocessedEntry = {
//             id: data.Question_ID,
//             question: preprocessText(data.Questions),
//             answer: preprocessText(data.Answers),
//         };
//         preprocessedData.push(preprocessedEntry);
//     })
//     .on("end", () => {
//         console.log(preprocessedData);
//     });

function preprocessText(text) {
    // Remove special characters using regular expression
    const cleanedText = text.replace(/[^\w\s]/g, "");

    // Convert the text to lowercase
    const normalizedText = cleanedText.toLowerCase();

    // Tokenize the text into individual words
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(normalizedText);

    const filteredTokens = tokens.filter((token) => !stopwords.includes(token));

    // Stem the words this will reduce the number of words in the vocabulary
    const stemmer = natural.PorterStemmer;
    const stemmedTokens = filteredTokens.map((token) => stemmer.stem(token));

    return stemmedTokens;
}

module.exports = {
    preprocessedData,
    preprocessText,
};

