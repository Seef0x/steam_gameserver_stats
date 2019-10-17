const Discord = require('discord.js');
var steamServerStatus = require('steam-server-status');
const bot = new Discord.Client();

const token = "YOUR TOKEN"

// CONFIGURATION

var prefix = (".") // THE PREFIX

bot.on('ready', () => {

    bot.user.setActivity('Steam Stats', {type: "WATCHING"});

    console.log(`Connected with ${bot.user.tag} in ${bot.guilds.size} discord servers`);

});

bot.login(token);

bot.on('message', message => {
    if(message.content[0] === prefix) {
        let splitMessage = message.content.split(" ")
            if(splitMessage[0] === prefix + 'stats'){

            if(message.deletable) message.delete()
            
            if(splitMessage.length === 3){

                steamServerStatus.getServerStatus(
                    splitMessage[1], splitMessage[2], function(serverInfo) {
                        if (serverInfo.error) {
                            console.log(serverInfo.error);
                        } else {
                            let embed = new Discord.RichEmbed()
                            .setDescription(serverInfo.serverName + '\n\nGame : ' + serverInfo.gameName + '\n\nIP : '+ serverInfo.hostname + ':' + serverInfo.port +'\n\nPlayers : ' + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers + '\n\nGamemode : ' + serverInfo.gameDescription +'\n\nMap : ' + serverInfo.map)
                            message.channel.send(embed)      
                        }
                })
            } else {
                let embed = new Discord.RichEmbed()
                .setDescription('Type **.stats IP PORT**')
                message.channel.send(embed).then(d_message => { d_message.delete(10000)});
            }
        }
    }
})
