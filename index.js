const Discord = require('discord.js');
const StringM = require('string');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'

Bot.on('ready', () => {
	console.log('Bot Initiated');
});

Bot.on('message', (Message) => {
	if (Message.author == Bot) return;

	var content = Message.content.toLowerCase
	if (StringM(content.startsWith).startsWith(prefix)) {

	}
});
Bot.on('guildMemberAdd', (NewMember) => {
	var Channel = NewMember.guild.channels.find('name', 'member-log');
	if (!Channel) return;
	Channel.send('Welcome to DevClub ${NewMember}!');
});

Bot.login(BotToken);