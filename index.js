const Discord = require('discord.js');
const StringM = require('string');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'

const Commands = {
	"ping": function(parameters, msgObj){
		msgObj.channel.sendMessage("Pong!");
	}
}

Bot.on('ready', () => {
	console.log('Bot Initiated');
});

function ProcessCommand(content, msgObj) {
	var words = content.split(" ");
	console.log(words, content);
	if (Commands[words[0]]) {
		Commands[words[0]](words.splice(0, 1), msgObj);
	}
}

Bot.on('message', (Message) => {
	if (Message.author == Bot) {return 0;};

	var content = Message.content.toLowerCase();
	console.log(StringM(content).startsWith(prefix), content);
	if (StringM(content).startsWith(prefix)) {
		ProcessCommand(StringM(content).chompLeft("/>"), Message);
	}
});
Bot.on('guildMemberAdd', (NewMember) => {
	var Channel = NewMember.guild.channels.find('name', 'member-log');
	if (!Channel) return;
	Channel.send('Welcome to DevClub ${NewMember}!');
});

Bot.login(BotToken);