import { db } from "../../utils/db.server";

type Joke = {
  name: string;
  content: string;
};

export const create = async (joke: Joke) => db.joke.create({ data: joke });
