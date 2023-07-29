import type { ActionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useState } from "react";

import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";

import { validate, validateJokeName } from "../api/Joke/validate";
import { create } from "../api/Joke/create";
import { output } from "../api/Joke/output/outputForFormInput";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const form = await request.formData();

  const content = form.get("content")?.toString();
  const name = form.get("name")?.toString();

  const validationResult = validate({ name, content });

  if (validationResult.isError || !validationResult?.fields) {
    return badRequest({
      ...validationResult,
      formError: "The form has errors",
    });
  }

  const joke = await create({ ...validationResult.fields, jokesterId: userId });

  return output(joke);
};

export default function NewJokeRoute() {
  const actionData = useActionData<typeof action>();
  const [hasNameError, setHasNameError] = useState<boolean>(false);

  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              defaultValue={actionData?.fields?.name}
              type="text"
              name="name"
              onChange={(event) => {
                console.log({ event });
                setHasNameError(!!validateJokeName(event.currentTarget.value));
              }}
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name || hasNameError ? (
            <p className="form-validation-error" id="name-error" role="alert">
              {actionData?.fieldErrors?.name || "has error"}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:{" "}
            <textarea
              defaultValue={actionData?.fields?.content}
              name="content"
              aria-invalid={Boolean(actionData?.fieldErrors?.content)}
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              id="content-error"
              role="alert"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
