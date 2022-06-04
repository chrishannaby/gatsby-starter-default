import { Context } from "netlify:edge";

const pathRegex = /^.*\/resources\//;
const proxyUrl = "https://read.uberflip.com/";

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch(`${proxyUrl}/${path}`, {
    headers: {
       "X-Forwarded-Host": "adskconstruction.autodesk.com/",
    }
  });
  console.log(response)
  return response;
};
