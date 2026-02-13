import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-small",
      messages: [
        {
          role: "system",
          content: `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
          
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel, chaleureux, passionné d'histoire.

Destinations :
- Paris 1889
- Crétacé -65M
- Florence 1504

Prix indicatifs :
- Paris 1889 : 4 900€
- Florence Renaissance : 5 500€
- Crétacé : 9 900€
Information complémentaire: les enfants sont autorisés pour les voyages dans le temps, Les animaux de compagnie ne sont pas autorisés ,Les armes ne sont pas autorisées .
`
        },
        ...messages,
      ],
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}