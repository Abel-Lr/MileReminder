import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();
const TOKEN = process.env["DISCORD_TOKEN"];
import {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} from "discord.js";
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
  console.log(`Ready! Logged in as ${cli.user.tag}`);
  schedule_dates.forEach((date) => {
    cron.schedule(`0 ${date.minutes} ${date.hour} * * ${date.day}`, () => {
      const fileList = fs.readdirSync("./img/");
      const gif_name = fileList[Math.floor(Math.random() * fileList.length)];
      const gif = new AttachmentBuilder(`./img/${gif_name}`);
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
        .setImage(`attachment://${gif_name}`)
        .setFooter({ text: "Courage, vous pouvez le faire ! 🎉" })
        .setTimestamp();
      cli.channels.fetch(process.env["CHANNEL_ID"]).then((channel) => {
        try {
          channel.send({
            embeds: [embed],
            files: [gif],
            content: "||@everyone||",
          });
          console.log("Message sent on the", new Date());
        } catch (err) {
          console.error("Error sending msg : ", err);
        }
      });
    });
  });
});

client.login(TOKEN);
