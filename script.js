const {
    Api,
    TelegramClient
} = require("telegram");
const Browser = require('zombie')


const sleep = (s) => {
    return new Promise((res) => {
        setTimeout(res, s * 1000);
    })
}

const end = async (action, entity) => {
    console.log(`${action} end`);
    client.sendMessage(entity, {
        message: '💰 Balance'
    });
    await sleep(5);
    var posts = await client.invoke(
        new Api.messages.GetHistory({
            peer: channel_entity,
            limit: 1,
            offsetDate: 0,
            offsetId: 0,
            maxId: 0,
            minId: 0,
            addOffset: 0,
            hash: 0
        })
    );
    var message = posts.messages[0].message;
    console.log(message);
    return;
}

const channel_name = "@Litecoin_click_bot"
const userAgent = "Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0"
const browser = new Browser({
    userAgent,
    waitFor: 10000
})
const main = (client = new TelegramClient()) => {
    console.log('----------------------------------------------------------------------------');
    var currDate = new Date()
    console.log(`restarted at ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`);
    try {
        async function visit() {
            var channel_entity = await client.getEntity(channel_name);
            client.sendMessage(channel_entity, {
                message: "🖥 Visit sites"
            });
            await sleep(3);
            var posts = await client.invoke(
                new Api.messages.GetHistory({
                    peer: channel_entity,
                    limit: 1,
                    offsetDate: 0,
                    offsetId: 0,
                    maxId: 0,
                    minId: 0,
                    addOffset: 0,
                    hash: 0
                })
            )
            if (posts.messages[0].message.search('Sorry, there are no new ads available') != -1) {
                end('Visit Sites', channel_entity)
            } else {
                try {
                    var url = posts.messages[0].replyMarkup.rows[0].buttons[0].url
                    var id = posts.messages[0].id
                    console.log(`Visiting ${url}`)
                    browser.visit(url, () => {
                        console.log(browser.statusCode);
                    })
                } catch (e) {
                    console.error(e);
                }
            }
        }
        visit()

    } catch (e) {
        console.error(e.message);
    }
}

module.exports = {
    main
}