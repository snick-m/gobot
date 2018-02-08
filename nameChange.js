const Discord = require('discord.js');
const StringM = require('string');
const Bot = new Discord.Client();
const BotToken = 'Mzc2Mzc5NDA2MDU2NDIzNDI2.DN9iLQ.NiFSTLfymZ-xtTl5fK9O-bAuV7A'
const prefix = 'gob>'

Bot.login(BotToken);

Bot.on('ready', () =>{
	console.log(Bot.user);
	Bot.user.setUsername("শফিক");
});