import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/body-compositions", "routes/body-compositions.tsx"),
] satisfies RouteConfig;
