import type { LinksFunction } from "@remix-run/node";
import stylesUrl from "../styles/jokes.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function JokesIndexRoute() {
  return (
    <div>
      <p>Here's a random joke:</p>
      <p>I was wondering why the frisbee was getting bigger, then it hit me.</p>
    </div>
  );
}
