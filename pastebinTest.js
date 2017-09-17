const Discord = require('discord.js');
const StringM = require('string');
const fs = require('fs');
const paste = require('better-pastebin');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'

paste.setDevKey('d517dc40234f2879fc60d44d72c6735c');
paste.login('Mushfiq', '@mim@hin100', function(success, data){
	console.log(success, data);
	if (success) {
		var RMembers;
		paste.get('QxfVgU67', function(s, d){
			RMembers = d;
			console.log(s, d);
		});
	}
});

