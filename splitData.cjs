const fs = require("fs");
const csv = require("csv-parser");
const { preprocessText } = require("./preprocessData");
const { performTraining } = require("./Training");
const { split } = require("@tensorflow/tfjs");

const preprocessedData = [];
const trainingData = [];
const validationData = [];

fs.createReadStream("MentalHealthFAQ.csv")
    .pipe(csv())
    .on("data", (data) => {
        const preprocessedQuestion = preprocessText(data.Questions);
        const preprocessedAnswer = preprocessText(data.Answers);

        preprocessedData.push({
            question: preprocessedQuestion,
            answer: preprocessedAnswer
        });
    })
    .on("end", () => {
        // Split the data into training and validation sets
        const trainSize = 0.8; // 80% of the data for training
        const trainDataSize = Math.floor(preprocessedData.length * trainSize);

        const trainingData = preprocessedData.slice(0, trainDataSize);
        const validationData = preprocessedData.slice(trainDataSize);

        // console.log("Training data:", trainingData);
        console.log("Validation data:", validationData);
    });

performTraining(trainingData, validationData);
