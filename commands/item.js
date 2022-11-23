const { request } = require('undici');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'item',
	description: 'item inf',
	async execute(message, args) {
		async function getJSONResponse(body) {
            let fullBody = '';
        
            for await (const data of body) {
                fullBody += data.toString();
            }
        
            return JSON.parse(fullBody);
        }
        const itemInfo = await request('https://api.hypixel.net/resources/skyblock/items');
        const { items } = await getJSONResponse(itemInfo.body);
        const mayorEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Item Info')
        .setAuthor({ name: 'EpicFred_#6607', iconURL: 'https://cdn.discordapp.com/avatars/630125088427212811/56dee86d5edbb1b34cb047bf614d98d7.webp?size=240' })
        .addFields(
            { name: 'Item name:', value: items[0].name }
        )
        message.channel.send({ embeds: [mayorEmbed] });
	},
};