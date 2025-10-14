import * as dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env["DISCORD_TOKEN"];
import { Client, Events, GatewayIntentBits, EmbedBuilder } from "discord.js";
import cron from "node-cron";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const dayNames = {
  Dimanche: 0,
  Lundi: 1,
  Mardi: 2,
  Mercredi: 3,
  Jeudi: 4,
  Vendredi: 5,
  Samedi: 6,
};
const schedule_dates = [
  { day: dayNames["Lundi"], hour: 16, minutes: 30 },
  { day: dayNames["Jeudi"], hour: 16, minutes: 30 },
];

client.once(Events.ClientReady, (cli) => {
  const embed = new EmbedBuilder()
    .setColor(0xff4500)
    .setTitle("🏃‍♂️‍➡️ Hop hop hop on va courir 🏃‍♀️")
    .setDescription(
      "Lâchez tout ce que vous faites actuellement et préparez vous à aller courir !!!\n\n" +
        "N'oubliez pas de :\n" +
        "🚰 Remplir votre gourde\n" +
        "💧 Prendre votre serviette\n"
    )
    .addFields({
      name: "💡 Astuce",
      value:
        "Ce n'est pas un sprint ! Courez à votre rythme, le but est de limiter le plus possible les pauses",
    })
    .setImage(
      "https://media.discordapp.net/attachments/1427627815959924876/1427627833022480517/giphy-1868740075.gif"
    )
    .setFooter({ text: "Courage, vous pouvez le faire ! 🎉" })
    .setTimestamp();
  console.log(`Ready! Logged in as ${cli.user.tag}`);
  schedule_dates.forEach((date) => {
    cron.schedule(`15 ${date.minutes} ${date.hour} * * ${date.day}`, () => {
      cli.channels.fetch(process.env["CHANNEL_ID"]).then((channel) => {
        try {
          channel.send({ embeds: [embed] });
          console.log("Message sent on the", new Date());
        } catch (err) {
          console.error("Error sending msg : ", err);
        }
      });
    });
  });
});

client.login(TOKEN);
