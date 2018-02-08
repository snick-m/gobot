const Discord = require('discord.js');
const StringM = require('string');
const fs = require('fs');
const Bot = new Discord.Client();
const BotToken = 'Mzc2Mzc5NDA2MDU2NDIzNDI2.DN9iLQ.NiFSTLfymZ-xtTl5fK9O-bAuV7A'
const prefix = 'gob>'

/* This is block is from a previous bot. Might need it later.
const paste = require('better-pastebin');

const DB = require('mongodb').MongoClient
const assert = require('assert')

// const RDatabase = "./rdb.json"
const DBChannel = "358859276397051905"
const DevServerID = "358292291687022592"
const MemberID = "358498899201097728"

var RMembers;
*/

const Commands = {
	"ping": function(parameters, msgObj){
		msgObj.channel.send("Pong!");
	},
	"credits": function(parameters, msgObj){
		msgObj.channel.send("`Founder :-` ```Al.H Tipu (Shunno)```\n`Admins :-` ```Alex Mason, Antu Sen, Rayhan Ahmed Chowdhury```\n`Moderators :-` ```HM Miraz, Faysal Khan, Farhan Tanvir Soumik, Tanzimul Alam, Rownok HAsan, Amir Esba Faruk, Sharier Rafi, Furat Al Furqan, Nurul Amin Nibir, Shahed Raiyan, Ahsan Alam```\n`Discord Moderators :-` ```ShanTo HaQue```\n`GOBot Creator :-` ```Mushfiqur Rahman/Snick```");
	},
	"whereami": function(parameters, msgObj){
		msgObj.channel.send(`You're in :video_game:${msgObj.guild.name}:video_game: Discord Server, ${msgObj.author} :fire:`);
	},

	"mute": function(parameters, msgObj){
		if (msgObj.mentions.members && msgObj.guild.member(msgObj.author).hasPermission("MANAGE_MESSAGES")){
			let user = msgObj.channel.guild.member(msgObj.mentions.members.first());
			let muteRole = msgObj.channel.guild.roles.find(r => r.name == "MutedByGOBot");
			if(!muteRole){
				muteRole = msgObj.channel.guild.createRole({
					name: "MutedByGOBot",
					color: "#0000000",
					permissions: []
				});

				msgObj.guild.channels.forEach(channel => {
					channel.overwritePermissions(muteRole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			}
			if (!user.roles.has(muteRole.id)){
				user.addRole(muteRole);
				msgObj.reply(`Muted ${user.user} successfully!`);
			} else {
				msgObj.reply(`${user.user} is already muted.`);
			}
		} else {return}
	},
	"unmute": function(parameters, msgObj){
		if (msgObj.mentions.members && msgObj.guild.member(msgObj.author).hasPermission("MANAGE_MESSAGES")){
			let user = msgObj.channel.guild.member(msgObj.mentions.members.first());
			let muteRole = msgObj.channel.guild.roles.find(r => r.name == "MutedByGOBot");
			if (!muteRole) {
				msgObj.reply(`${user.user} isn't muted.`);
				return;
			}
			if (!user.roles.has(muteRole.id)){
				msgObj.reply(`${user.user} isn't muted.`);
			} else {
				user.removeRole(muteRole);
				msgObj.reply(`Unmuted ${user.user} successfully!`);
			}
		} else {return}
	},

	"kick": function(parameters, msgObj){
		if (msgObj.mentions.members && msgObj.guild.member(msgObj.author).hasPermission("KICK_MEMBERS")){
			let user = msgObj.guild.member(msgObj.mentions.members.first());
			user.kick();
			msgObj.reply(`Kicked "${user.user.username}" successfully!`);
		} else {return}
	},
	"ban": function(parameters, msgObj){
		if (msgObj.mentions.members && msgObj.guild.member(msgObj.author).hasPermission("BAN_MEMBERS")){
			let user = msgObj.guild.member(msgObj.mentions.members.first());
			user.ban();
			msgObj.reply(`Banned "${user.user.username}" successfully!`);
		} else {return}
	},

	"help": function(parameters, msgObj){
		msgObj.author.send(
			`\`Bot Prefix :-\` \`\`\`${prefix}\`\`\`\n` + "`Initial Commands :-` ```ping => Bot Replies 'Pong!' if it's up.\nwhereami => Tells you the name of the server you are in.\ncredits => Shows you staff roster of GOB``` `Modration Commands :-` ```mute => gob>mute @user => Mutes the user in the server the command is used in.\nunmute => gob>unmute @user => Unmutes the user in the server the command is used in.\nkick => gob>kick @user => Kicks the user.\nban => gob>ban @user => Bans the user from the Discord Server.```"
		)
		msgObj.reply("Commands list has been delivered to your DM :e_mail: !");
	}
}

function ProcessCommand(content, msgObj) {
	var words = content.split(" ");
	if (Commands[words[0]]) {
		Commands[words[0]](words, msgObj);
	}
}

Bot.on('message', (Message) => {
	if (Message.author == Bot.user) {return}
	var content = Message.content.toLowerCase();
	if (StringM(content).startsWith(prefix)) {
		ProcessCommand(StringM(content).chompLeft(prefix), Message);
	}
});

Bot.on('ready', () => {
	console.log('Bot Initiated');
});

Bot.on('guildMemberAdd', (NewMember) => {
	var Channel = NewMember.guild.defaultChannel;
	Channel.send(`Welcome to Gamers Of Bangladesh : গেমারস অব বাংলাদেশ, ${NewMember}!`); 
});

Bot.login(BotToken);