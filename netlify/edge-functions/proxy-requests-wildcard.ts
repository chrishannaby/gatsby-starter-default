import { Context } from "netlify:edge";

const pathRegex = /^.*\/proxy\//;
const proxyUrl = "https://eoglxf830gsuc1w.m.pipedream.net";

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch(`${proxyUrl}/${path}`, {
    headers: {
      Accept: "application/json",
      "x-custom-header": "Hello world",
    },
  });
  const jsonData = await response.json();
  return context.json(jsonData);
};
