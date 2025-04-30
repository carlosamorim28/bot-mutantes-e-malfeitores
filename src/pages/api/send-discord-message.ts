import type { NextApiRequest, NextApiResponse } from "next";
import { Client, IntentsBitField, Message, TextChannel } from "discord.js";
import { client, dicordConfig, sendMessage } from "./hello";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const data = req.body;
      sendMessage(data.input1, data.input2).then(() => {
        console.log("Foi");
        res.status(200).json({ message: "Data received", data });
      });
      break;
    case "GET":
      res.status(200).json({ message: "This is a GET request" });
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
