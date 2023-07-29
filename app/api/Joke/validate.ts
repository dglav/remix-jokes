type JokeInput = {
  name?: string;
  content?: string;
};

type ValidateReturn = string | undefined;

type ValidationResult = {
  isError: boolean;
  fieldErrors: {
    content: ValidateReturn;
    name: ValidateReturn;
  } | null;
  fields: { name: string; content: string } | null;
};

function validateJokeContent(content: string): ValidateReturn {
  if (content.length < 10) {
    return "That joke is too short";
  }
}

export function validateJokeName(name: string): ValidateReturn {
  if (name.length < 3) {
    return "That joke's name is too short";
  }
}

export const validate = (data: JokeInput): ValidationResult => {
  const { content, name } = data;

  if (typeof content !== "string" || typeof name !== "string") {
    return {
      isError: true,
      fieldErrors: null,
      fields: null,
    };
  }

  const fieldErrors = {
    content: validateJokeContent(content),
    name: validateJokeName(name),
  };

  const fields = { content, name };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      isError: true,
      fieldErrors,
      fields,
    };
  }

  return {
    isError: false,
    fieldErrors,
    fields,
  };
};
