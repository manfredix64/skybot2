const { request } = require('undici');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'mayor',
	description: 'mayor',
	async execute(message, args) {
		async function getJSONResponse(body) {
            let fullBody = '';
        
            for await (const data of body) {
                fullBody += data.toString();
            }
        
            return JSON.parse(fullBody);
        }
        const currentMayor = await request('https://api.hypixel.net/resources/skyblock/election');
        const { mayor } = await getJSONResponse(currentMayor.body);
        // const perk0Name = JSON.stringify(mayor.perks[0].name);
        const mayorEmbed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Mayor/Election Info')
        .setAuthor({ name: 'EpicFred_#6607', iconURL: 'https://cdn.discordapp.com/avatars/630125088427212811/56dee86d5edbb1b34cb047bf614d98d7.webp?size=240' })
        .addFields(
            { name: 'Current mayor:', value: '``' + mayor.name + '``', inline: true },
            { name: 'Mayor key:', value: '``' + mayor.key + '``', inline: true },
            { name: 'Mayor Perks:', value: '**' + mayor.perks[0].name + '**' + ' - ' + '``' + mayor.perks[0].description + '``' },
            { name: '\u200b', value: '**' + mayor.perks[1].name + '**' + ' - ' + '``' + mayor.perks[1].description + '``' }
		// { name: 'Mayor Perks:', value: `${mayor.perks[0].name}` };
        )
        message.channel.send({ embeds: [mayorEmbed] });
        // message.channel.send(`Current mayor is ${mayor.name}`);
	},
};