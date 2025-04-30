// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client, IntentsBitField, Message, TextChannel } from "discord.js";
import * as dotenv from "dotenv";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

export const dicordConfig = {
  token: process.env.DISCORD_TOKEN!, // Substitua pelo seu token do bot
  prefix: "!",
  canalBoasVindas: process.env.CANAL_BOAS_VINDAS!, // Substitua pelo ID do canal desejado
};

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

export async function sendMessage(num1: string, num2: string) {
  const randon20 = Math.round(Math.random() * 20) + 1;

  const rollValue = randon20 + Number(num1);

  try {
    // Busca o canal pelo ID
    client.login(dicordConfig.token as string).then(async () => {
      console.log("Bot está online");
      const channel = (await client.channels.fetch(
        dicordConfig.canalBoasVindas
      )) as TextChannel;

      if (channel) {
        await channel.send(
          calculateSucess(rollValue, Number(num2), randon20, Number(num1))
        );
        console.log(
          `Mensagem de inicialização enviada no canal ${channel.name}`
        );
      } else {
        console.error("Canal não encontrado. Verifique o ID configurado.");
      }
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem de inicialização:", error);
  }

  function calculateSucess(
    num1: number,
    num2: number,
    num3: number,
    num4: number
  ): string {
    const quatroGrauFalha = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 4º - Falha
  `;
    const terceiroGrauFalha = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 3º - Falha
  `;

    const segundoGrauFalha = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 2º - Falha
  `;

    const primeiroGrauFalha = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 1º - Falha
  `;

    const quatroGrauSucesso = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 4º - Sucesso
  `;
    const terceiroGrauSucesso = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 3º - Sucesso
  `;

    const segundoGrauSucesso = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 2º - Sucesso
  `;

    const primeiroGrauSucesso = `
    > **Dificuldade: ** ${num2}
    > **Rolagem:** ${num3}
    > **Bônus:**: ${num4}
    > **Total:** ${num1}
    > **Graduação:** 1º - Sucesso
  `;

    const valueResult = num1 - num2;
    if (valueResult <= -20) return quatroGrauFalha;
    if (valueResult <= -15 && valueResult > -20) return terceiroGrauFalha;
    if (valueResult <= -10 && valueResult > -15) return segundoGrauFalha;
    if (valueResult <= -1 && valueResult > -10) return primeiroGrauFalha;

    if (valueResult >= 10 && valueResult < 15) return terceiroGrauSucesso;
    if (valueResult >= 5 && valueResult < 10) return segundoGrauSucesso;
    if (valueResult >= 0 && valueResult < 5) return primeiroGrauSucesso;

    return quatroGrauSucesso; // para value result >= +15
  }
}
