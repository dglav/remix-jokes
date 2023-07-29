import { db } from "../../utils/db.server";

type Joke = {
  jokesterId: string;
  name: string;
  content: string;
};

export const create = async (joke: Joke) => db.joke.create({ data: joke });
