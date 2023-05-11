const tf = require('@tensorflow/tfjs');
const fs = require('fs');

require('@tensorflow/tfjs-node');

async function performTraining(trainingData, validationData) {
    // Define the model architecture
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: [768],
        activation: "relu",
        units: 256
    }));
    model.add(tf.layers.dense({
        activation: "relu",
        units: 128
    }));
    model.add(tf.layers.dense({
        activation: "relu",
        units: 64
    }));
    model.add(tf.layers.dense({
        activation: "softmax",
        units: 2
    }));
    model.compile({
        loss: "sparseCategoricalCrossentropy",
        optimizer: tf.train.adam(),
        metrics: ["accuracy"]
    });

    // Convert the data to a format we can use for training
    const trainingInput = trainingData.map((data) => data.question);
    const trainingOutput = trainingData.map((data) => data.answer);

    const validationInput = validationData.map((data) => data.question);
    const validationOutput = validationData.map((data) => data.answer);

    // Convert the data into tensors
    const trainingInputTensor = tf.tensor2d(trainingInput, [trainingInput.length, 768]);
    const trainingOutputTensor = tf.tensor2d(trainingOutput, [trainingOutput.length, 2]);

    const validationInputTensor = tf.tensor2d(validationInput, [validationInput.length, 768]);
    const validationOutputTensor = tf.tensor2d(validationOutput, [validationOutput.length, 2]);

    // Train the model
    await model.fit(trainingInputTensor, trainingOutputTensor, {
        validationData: [validationInputTensor, validationOutputTensor],
        epochs: 10,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
            }
        }
    });

    // Save the model
    await model.save("file://./model");
}

module.exports = {
    performTraining
};