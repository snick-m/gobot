const Discord = require('discord.js');
const StringM = require('string');
const fs = require('fs');
const paste = require('better-pastebin');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'

var RMembers;

paste.setDevKey('d517dc40234f2879fc60d44d72c6735c');
paste.login('Mushfiq', '@mim@hin100', function(success, data){
	if (success) {
		paste.get('QxfVgU67', function(s, d){
			RMembers = d;
		});
	}
});

const Commands = {
	"ping": function(parameters, msgObj){
		msgObj.channel.sendMessage("Pong!");
	},
	"register": function(parameters, msgObj){
		var author = msgObj.author;
		paste.get('QxfVgU67', function(s, d){
			RMembers = JSON.parse(d);
		});
		if (RMembers[author.id.toString()]) {msgObj.channel.sendMessage("${author}, You're already registered.")}
		else {
			if (StringM(parameters[0]).isNumeric && parameters[1].length == 1 && StringM(parameters[2]).isNumeric && parameters[2].length == 1) {
				var newMember = {
					"Class": parseInt(parameters[0]),
					"Section": parameters[1],
					"Roll": parseInt(parameters[2])
				}
				RMembers[author.id.toString()] = newMember;
			} else {
				msgObj.channel.sendMessage("${author}, Your info format is wrong. Please format it as '/>register <class> <section> <roll>' ")
			}
		}
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