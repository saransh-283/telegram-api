const {
    TelegramClient,
    Api
} = require('telegram')
const {
    StringSession
} = require('telegram/sessions')
const hotload = require('hotload')


const scriptFilePath = './script.js'

const apiId = 7720791
const apiHash = 'feeaaf0e8926bc0a465f12d9516f4f98'
const stringSession = new StringSession('1BQANOTEuMTA4LjU2LjIwMAG7DKOtZiK4z7Zup7nNj8DahL5GPic0ZzWWvEm7BfCQwQxnqCHxFSjcEXJUwdagVw5QeMHeIxRTkshGVQaEVvZn06OpAFormkB/IrBy7xvA9XXdph/BmbxRJY9d0zwCx3evFnd8NBWWoevyFbwbU2n0A/4PB2l1PfmuJc1SxMovt5hRLpaZsP5rFpUpYdKOwtAhsJMe24sLP4YM/KxDICQoRTSt40qzTD0YwZIWq5BoV1wqpycuZujmIRHk1DccFrhBobiJkA45Z+rl3XjTQc9GJ8oxd+n48v3AV1b6SD3I/s7oLUAIVLfj67mcbV2k1YMviho9aTIDUbrw/M09X8EV/Q=='); // fill this later with the value from session.save()
(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5
    })
    await client.connect()
    client.floodSleepThreshold = 3000;
    console.log('Connected.')

    hotload(scriptFilePath, (file) => {
        try {
            file.main(client)
        } catch (e) {
            console.error(e);
        }
    })
})()