import { Response } from "@remix-run/node";

type Joke = {
  name: string;
  content: string;
};

export const output = (joke: Joke) =>
  new Response(JSON.stringify(joke), { status: 200 });
