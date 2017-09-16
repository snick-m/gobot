const Discord = require('discord.js');
const StringM = require('string');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'

const Commands = {
	"Ping": function(parameters, msgObj){
		msgObj.Channel.send("Pong!");
	}
}

Bot.on('ready', () => {
	console.log('Bot Initiated');
});

function ProcessCommand(content, msgObj) {
	var words = content.split("");
	if (Commands[words[0]]) {
		Commands[words[0]](words.splice(0, 1), msgObj);
	}
}

Bot.on('message', (Message) => {
	if (Message.author == Bot) return;

	var content = Message.content.toLowerCase
	if (StringM(content.startsWith).startsWith(prefix)) {
		ProcessCommand(StringM(content).chompLeft("/>"), Message);
	}
});
Bot.on('guildMemberAdd', (NewMember) => {
	var Channel = NewMember.guild.channels.find('name', 'member-log');
	if (!Channel) return;
	Channel.send('Welcome to DevClub ${NewMember}!');
});

Bot.login(BotToken);