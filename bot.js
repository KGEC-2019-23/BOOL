

/* ----------------- Importing from JSON ---------------- */
const { prefix, token, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25, user26, user27, user28, user29, user30, user31, user32} = require('./config.json');
//var meta = JSON.parse('../config.json')

/* -------------- Array to store all users -------------- */
const arr = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25, user26, user27, user28, user29, user30, user31, user32]


// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

/* ------------------ Global Variables ------------------ */
var facebook_url = ''
var instagram_url = ''
var twitter_url = ''
var temp = ''
var mails = ''
var reg_users = 0
var unreg = ''
var userList = ''
var registered = ''

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

index = 0
for (person of arr) {

	/* --------------- Store names of all user -------------- */
	// for numbering
	index++ // numbers should be one greater than actual index
	userList += (`${index}. ${person.about.Name}\n`)

	if (!(isNotRegistered(person))) {
		reg_users++

		/* ----------------- Store user mail-ids ---------------- */
		mails += (`${person.contact.email}\n`);		

		/* ----------- Store names of registered users ---------- */
		registered += `${reg_users}. ${person.about.Name}\n`
	}					
	else 
		unreg += (`${person.about.Name}\n`)
}
		

/* --- Display welcome message whenever new user joins -- */
client.on("guildMemberAdd", (member) => {
	let guild = member.guild; // Reading property `guild` of guildmember object.
	let memberTag = member.user.tag; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
	if(guild.systemChannel){ // Checking if it's not null
		guild.systemChannel.send(member.displayName + ' has joined...\nWelcome ' + member.displayName + "!");
	}
});

/* --------------- User message responses --------------- */
client.on('message', message => {

	/* -------- Store message and tagged user, if any ------- */
	if (!message.content.toLowerCase().startsWith(prefix)) return;
	const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0].toLowerCase();
	const args = split.slice(1);
	//message.channel.send (args)
	
		
	//Array to store quotes
	const quotes = ["Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.\n- Ferris Bueller’s Day Off", "Our lives are defined by opportunities, even the once we miss.\n- The Curious Case Of Benjamin Button", "All we have to decide what to do with the time that given to us.\n- Lord Of The Rings", "You cannot lives your life to please others, the choice must be yours.\n- Alice in Wonderland", "Life is like a box of chocolates, you never know what you gonna get.\n- Forrest Gump", "Great men are not born great, they grow great.\n- The Godfather", "It’s what you do right now that makes a difference!\n- Black Hawk Down", "The past can hurt. But you can either run from it or learn from it.\n- The Lion King", "Don’t ever let somebody tell you-you can’t do something, not even me. Alright? You dream, you gotta protect it.\n- In Pursuit of Happiness", "Some people can’t believe in themselves until someone else believes in them first. \n– Good Will Hunting", "Being perfect is not about that scoreboard out there. It’s not about winning. It’s about you and your relationship with yourself, your family and your friends. Being perfect is about being able to look your friends in the eye and know that you didn’t let them down because you told them the truth. And that truth is you did everything you could.There wasn’t one more thing you could’ve done. Can you live in that moment as best you can, with clear eyes, and love in your heart, with joy in your heart? If you can do that gentleman – you’re perfect! \n–  Friday Night Lights", "Every man dies, but not every man really lives. \n– William Wallace, from Braveheart", "Nobody is gonna hit as hard as life, but it ain’t how hard you can hit. It’s how hard you can get hit and keep moving forward. It’s how much you can take, and keep moving forward. That’s how winning is done. \n– Rocky, from Rocky Balboa", "Get busy livin’, or get busy dyin’. \n– Andy Dufresne, from The Shawshank Redemption", "No one ever made a difference by being like everybody else. \n– P.T. Barnum, from The Greatest Showman", "I don’t want excuses. I know what you’re up against. We’re all of us up against something. So you better make up your mind, because until you have the balls to look me straight in the eye and tell me this is all you deserve, I am not letting you fail. Even if that means coming to your house every night until you finish the work. I see who you are. Do you understand me? I can see you. And you are not failing. \n– Erin Gruwell, from Freedom Writer", "It is not our abilities that show what we truly are. It is our choices. \n– Dumbledore, from Harry Potter and the Chamber of Secrets", "Captain Jack Sparrow : The problem is not the problem.The problem is your attitude about the problem. Do you understand?", "Every champion was once a contender that refused to give up - Rocky"]
	
	// You may add you own like this:
	//quotes.push("When you stand, stand like a giant.\n- Anonymous")


	/* ------------------ Command = Version ----------------- */
	if (message.content.toLowerCase() === `${prefix}version`.toLowerCase()) {
		message.channel.send('Bool v1.0 Live');
	} 

	/* -------------- Command = about @username ------------- */
	else if (command === 'about') {

		if (args[0]) {
			const user = getUserFromMention(args[0]);

			if (!user) {
				return message.reply('Please use a proper mention if you want to know about someone\'s bio.');
			}
			
			for (person of arr) {
				if (person.username == user.username)
					if (isNotRegistered(person))
					return message.channel.send(`${person.Name} is an unregistered user`);
					else 
					return message.channel.send(`Here's a brief intro about ${person.username}\nUser ID: ${user.id}\n\nName: ${person.about.Name}\nAge: ${person.about.Age}\nFrom: ${person.about.From}\nCollege: ${person.about.College}\nDepartment: ${person.about.Department}\n\n Dream: \|\|${person.about.Dream}!\|\|`);
			}			
		}
		return message.channel.send(`User Not Found`);
	}

	/* -------------- Command = contact @username ------------- */
	else if (command === 'contact' || command === 'contacts') {

		if (args[0]) {
			const user = getUserFromMention(args[0]);

			if (!user) {
				return message.reply('Please use a proper mention if you want to see someone else\'s contact.');
			}

			for (person of arr) {
				if (person.username == user.username)
					if (isNotRegistered(person))
					return message.channel.send(`${person.Name} is an unregistered user`);
					else 
					return message.channel.send(`Contact Details of ${person.about.Name}:\nE-Mail: ${person.contact.email}\nPhone: ${person.contact.phone}\n`);
			}			

		}
		return message.channel.send(`User Not Found`);
	}

	/* -------------- Command = socials @username ------------- */
	else if (command === 'socials' || command === 'social') {

		if (args[0]) {
		const user = getUserFromMention(args[0]);

		if (!user) {
			return message.reply('Please use a proper mention if you want to see someone else\'s social media profiles.');
		}

			for (person of arr) {
				if (person.username == user.username)
					if (isNotRegistered(person))
					return message.channel.send(`${person.Name} is an unregistered user`);
					else {

						facebook_url = `<https://www.facebook.com/${person.socials.facebook}>`
						instagram_url = `<https://www.instagram.com/${person.socials.instagram}>`
						twitter_url = `<https://www.twitter.com/${person.socials.twitter}>`

						if (!(facebook_url === "N.A."))	temp += (`Facebook: ${facebook_url}\n`);
						if (!(instagram_url === "N.A."))temp += (`Instagram: ${instagram_url}\n`);
						if (!(twitter_url === "N.A."))	temp += (`Twitter: ${twitter_url}\n`);
						
						message.channel.send(`${temp}`)
						temp = ''
						return
					}
			}			
		}
		return message.channel.send(`User Not Found`);
	}

	/* -------------- Command = developer-profile @username ------------- */
	else if (command === 'developer-profile') {
		if (args[0]) {
			const user = getUserFromMention(args[0]);
			if (!user) {
				return message.reply('Please use a proper mention if you want to see someone else\'s developer-profile.');
				}
				for (person of arr) {
					if (person.username == user.username)
						if (isNotRegistered(person))
						return message.channel.send(`User Unregistered.\n`);
						else {
							if (!(person.profiles.github === "N.A.")) temp += (`Github: <https://www.github.com/${person.profiles.github}>\n`)
							if (!(person.profiles.linkedIn === "N.A.")) temp += (`LinkedIn: <https://www.linkedin.com/in/${person.profiles.linkedIn}>\n`)
							if (!(person.profiles.stopstalk === "N.A.")) temp += (`StopStalk: <https://www.stopstalk.com/user/profile/${person.profiles.stopstalk}>\n`)
							if (!(person.profiles.stackOverflow === "N.A.")) temp += (`StackOverFlow: <https://www.stackoverflow.com/${person.profiles.stackOverflow}>\n`)
							message.channel.send(`${temp}`)
							temp = ''
							return
						}
				}			
			}
			return message.channel.send(`User Not Found`);
	}

	/* -------------- Command = interests @username ------------- */
	else if (command === 'interest' || command === 'interests') {

		if (args[0]) {
		const user = getUserFromMention(args[0]);

		if (!user) {
			return message.reply('Please use a proper mention if you want to know about someone\'s interests.');
		}

			for (person of arr) {
				if (person.username == user.username)
					if (isNotRegistered(person))
					return message.channel.send(`${person.Name} is an unregistered user`);
					else 
					return message.channel.send(`${person.interest}`);
			}		

		}
		return message.channel.send(`User Not Found`);
	}

	else if (command === 'field') {
		arr_temp = []
		if (args.includes("web") || args.includes("Web")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Web Development") {
					arr_temp.push(person.about.Name + "\n")
					break
					}
				}
			}
		}
		else if (args.includes("competitive") || args.includes("Competitive") || args.includes("CP") || args.includes("cp")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Competitive Programming") {
						arr_temp.push(person.about.Name + "\n")
						break
					}
				}
			}
		}
		else if (args.includes("app") || args.includes("App")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " App Development") {
						arr_temp.push(person.about.Name + "\n")
						break
					}
				}
			}
		}
		else if (args.includes("Machine") || args.includes("ML") || args.includes("machine") || args.includes("ml")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Machine Learning") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}
		else if (args.includes("data") || args.includes("Data")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Data Science") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}
		else if (args.includes("NLP")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " NLP") {
						arr_temp.push(person.about.Name + "\n")
						break
					}
				}
			}
		}
		else if (args.includes("Neural") || args.includes("neural")) {
			for (person of arr) 
			for (domain of person.interest) {
				if (domain === " Neural Networks") {
					arr_temp.push(person.about.Name + "\n")
					break
				}			
			}
		}
		else if (args.includes("IoT") || args.includes("iot") || args.includes("Iot")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " IoT") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}
		else if (args.includes("Block") || args.includes("block")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Block Chain") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}
		else if (args.includes("cyber") || args.includes("Cyber")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Cyber Security") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}
		else if (args.includes("graphic") || args.includes("Graphic")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Graphic Design") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}

		else if (args.includes("augmented") || args.includes("AR") || args.includes("Augmented") || args.includes("ar")) {
			for (person of arr) {
				for (domain of person.interest) {
					if (domain === " Augmented Reality") {
						arr_temp.push(person.about.Name + "\n")
						break 
					}
				}
			}
		}

		if (arr.length > 0) {
			message.channel.send(arr)
		}
		else {
			message.channel.send(`No user found interested in this domain.\nRecommend someone through \#chat !`)
		}

	}	

	else if (command === 'slap') {
		if (args[0]) {
			const user = getUserFromMention(args[0]);
			if (!user) {
				return message.reply('Please use a proper mention if you want to see someone else\'s developer-profile.');
			}
			for (person of arr)
			if (person.username == user.username)
			return message.reply(`slapped ${user}`)
		}
		return message.channel.send('User not Found');
	}


	/* -------------- Command = access-pass @username ------------- */
	/* ---------------- Currently Unavailable --------------- */
	else if (command === 'access-pass') {

		if (args[0]) {
		const user = getUserFromMention(args[0]);

		if (!user) {
			return message.reply('Please use a proper mention if you want to know about someone\'s bio.');
		}

			for (person of arr) {
				if (person.username == user.username)
					if (isNotRegistered(person))
					return message.channel.send(`${person.Name} is an unregistered user`);
					else 
					return message.channel.send(`Here's the access pass of ${person.about.Name}:\n${person.card}`);
			}		

		}
		return message.channel.send(`User Not Found`);
	}


	/* ------------------------------------------------------ */
	/*                    Shorter Commands                    */
	/* ------------------------------------------------------ */

	

	else if (command === 'users-registered') {
		message.channel.send(`${registered}`)		
	}

	else if (command === 'users-unregistered') {
		message.channel.send(`${unreg}`)		
	}

	else if (command === 'emails') {
		message.channel.send(`${mails}`)		
	}

	else if (command === 'user-list') {
		message.channel.send(`${userList}`)
	}

	else if (command === 'feed') {
		message.channel.send(`Please type in the following details:\nAge\nFrom\nCollege\nDepartment\nDream\n\nemail\nphone\n\ngithub\nlinkedIn\nstopstalk\nstackOverflow\n\nfacebook\ninstagram\ntwitter`)
	}

	else if (command === 'user-stats') {
		message.channel.send(`Number of users in the server: ${arr.length}\nNumber of users registered: ${reg_users}`)
	}

	else if (command === 'random-quote') {
		var item = quotes[Math.floor(Math.random() * quotes.length)];
		message.channel.send(item)
	}

	else if (command === 'help') {

		message.channel.send(`
Hello there!\nThis is Bool, the user-info bot.\nHere are some commands I can bork to:\n\nGlobal commands (details about the all users)
1. user-list
2. user-stats
3. users-registered
4. users-unregistered
5. user-interests
6. user-emails

User-specific commands:
1. about @username
2. contact @username
3. socials @username
4. developer-profile @username
5. interests @username

Others:
1. version
2. random-quote
3. help
To feed me with your input, do fill this form : <https://form.jotform.com/201144804580448> and help me bork more!
`)}

	else {
		message.channel.send(`I haven't been programmed for that command yet.\nNew Version rolling out soon!`)
	}

});

function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEperson.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}

function isNotRegistered(person) {
	return (person.about.Age === "N.A.")
}




// login to Discord with your app's token
client.login(token);
