const {
	TelegramClient
} = require("telegram");
const {
	StringSession
} = require("telegram/sessions");

const api_id = 7720791;
const api_hash = "feeaaf0e8926bc0a465f12d9516f4f98";
//const stringSession = new StringSession(""); // fill this later with the value from session.save()
const phone = '+919479357281'
const username = '@SarK283'

const client = new TelegramClient(username, api_id, api_hash)
client.connect()

if (!client.is_user_authorized()) {
	client.send_code_request(phone)
	try {
		client.sign_in(phone, input('Enter the code: '))
	}
	catch {
		client.sign_in(password = input('Password: '))
	}
}
me = client.get_me()
print(me)