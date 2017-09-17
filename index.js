const Discord = require('discord.js');
const StringM = require('string');
const fs = require('fs');
// const paste = require('better-pastebin');
const Bot = new Discord.Client();
const BotToken = 'MzU4NTE1Mzk3MDgwOTA3ODAz.DJ54Jg.aPb0MKQOuNhVCOlWnxYAKb7fhNA'
const prefix = '/>'
const pasteCode = "QxfVgU67"
const RDatabase = "./rdb.json"
const DBChannel = "358859276397051905"
const DevServerID = "358292291687022592"
const MemberID = "358498899201097728"

var RMembers;

const Commands = {
	"ping": function(parameters, msgObj){
		msgObj.channel.send("Pong!");
	},
	"register": function(parameters, msgObj){
		var author = msgObj.author;
		RMembers = JSON.parse(fs.readFileSync(RDatabase));
		if (RMembers[author.id.toString()]) {msgObj.channel.send(`${author}, You're already registered.`)}
		if (parameters.length == 4 && StringM(parameters[1]).isNumeric() && parameters[2].length == 1 && StringM(parameters[3]).isNumeric() && parameters[3].length == 2) {
			var newMember = {
				"Class": parseInt(parameters[1]),
				"Section": parameters[2],
				"Roll": parseInt(parameters[3]),
				"Date": (new Date()).getDay() + (new Date()).getFullYear()
			}
			RMembers[author.id.toString()] = newMember;
			msgObj.member.addRole(Bot.guilds.get(DevServerID).roles.get(MemberID));
			fs.writeFileSync(RDatabase, JSON.stringify(RMembers, null, 4));
			msgObj.channel.send(`${author}, You've been successfully registered and have been granted access to the complete server! \nKeep Calm and Build On!`);
			Bot.guilds.get(DevServerID).channels.get(DBChannel).send(JSON.stringify(RMembers, null, 4), {"code":"json"});
		} else {
			msgObj.channel.send(`${author}, Your info format is wrong. Please format it as '/>register <class> <section> <roll>' `)
		}
	}
}

function ProcessCommand(content, msgObj) {
	var words = content.split(" ");
	console.log(words, content);
	if (Commands[words[0]]) {
		Commands[words[0]](words, msgObj);
	}
}

Bot.on('message', (Message) => {
	if (Message.author == Bot.user) {return}
	var content = Message.content.toLowerCase();
	if (StringM(content).startsWith(prefix)) {
		ProcessCommand(StringM(content).chompLeft("/>"), Message);
	}
});

Bot.on('ready', () => {
	console.log('Bot Initiated');
});

Bot.on('guildMemberAdd', (NewMember) => {
	var Channel = NewMember.guild.channels.find('name', 'member-log');
	if (!Channel) return;
	Channel.send(`Welcome to DevClub ${NewMember}!`);
});

Bot.login(BotToken);