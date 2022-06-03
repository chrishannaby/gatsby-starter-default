import { Context } from "netlify:edge";

const pathRegex = /^.*\/proxy\//;
const proxyUrl = "https://read.uberflip.com/";

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch(`${proxyUrl}/${path}`, {
    headers: {
      "Host": "construction.autodesk.com/resources/",
    },
  });
  return response;
};
