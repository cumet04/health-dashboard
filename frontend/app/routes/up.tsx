import type { Route } from "./+types/home";

export async function loader({}: Route.LoaderArgs) {
  return Response.json({message: 'ok'});
}
