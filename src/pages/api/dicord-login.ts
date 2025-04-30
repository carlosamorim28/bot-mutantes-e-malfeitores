import type { NextApiRequest, NextApiResponse } from "next";
import { Client, IntentsBitField, Message, TextChannel } from "discord.js";
import { client, config } from "./hello";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    client.login(config.token as string).then(() => {
      console.log("Bot está online");
      res.status(200).json({ name: "Bot Está online" });
    });
  } else {
    res.status(200).json({ name: "John" });
  }
}
