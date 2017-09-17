const Discord = require('discord.js');
const StringM = require('string');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'

Bot.login(BotToken);

Bot.on('ready', () =>{
	console.log(Bot.user);
	Bot.user.setUsername("শফিক");
});