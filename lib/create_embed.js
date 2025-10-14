import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import * as fs from "fs";

export function getRandomGif() {
  const fileList = fs.readdirSync("./img/");
  const gif_name = fileList[Math.floor(Math.random() * fileList.length)];
  const gif = new AttachmentBuilder(`./img/${gif_name}`);
  return { gif_name, gif };
}

export function createEmbed(gif_name) {
  return new EmbedBuilder()
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
}
