import type { ActionArgs } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";
import { validate } from "../api/Joke/validate";
import { create } from "../api/Joke/create";
import { output } from "../api/Joke/output/outputForJsonInput";

export const action = async ({ request }: ActionArgs) => {
  const data = await request.json();

  const validationResult = validate(data);

  if (validationResult.isError || !validationResult?.fields) {
    return badRequest(validationResult);
  }

  const joke = await create(validationResult.fields);

  return output(joke);
};
