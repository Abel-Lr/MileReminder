import * as dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env["DISCORD_TOKEN"];
import { Client, Events, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import { schedule_dates } from "./lib/utils.js";
import { createEmbed, getRandomGif } from "./lib/create_embed.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (cli) => {
  console.log(`Ready! Logged in as ${cli.user.tag}`);
  schedule_dates.forEach((date) => {
    // cron.schedule(`0 ${date.minutes} ${date.hour} * * ${date.day}`, () => {
    cron.schedule(`0 * * * * *`, async () => {
      try {
        const gif_obj = getRandomGif();
        const embed = createEmbed(gif_obj.gif_name);
        const channel = await cli.channels.fetch(process.env["CHANNEL_ID"]);
        await channel.send({
          embeds: [embed],
          files: [gif_obj.gif],
          content: "||@everyone||",
        });
        console.log("Message sent on the", new Date());
      } catch (err) {
        console.error("Error sending msg : ", err);
      }
    });
  });
});

client.login(TOKEN);
