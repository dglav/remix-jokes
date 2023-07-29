import { redirect } from "@remix-run/node";

type Joke = {
  id: string;
  name: string;
  content: string;
};

export const output = (joke: Joke) => redirect(`/jokes/${joke.id}`);
