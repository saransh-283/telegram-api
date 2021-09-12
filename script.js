const {
    Api,
    TelegramClient
} = require("telegram");

const main = async (client = new TelegramClient()) => {
    console.log('restarted');
    try {
        const result = await client.iterDialogs({})
        console.log(result);
    } catch (e) {
        console.error(e.message);
    }
}

module.exports = {
    main
}