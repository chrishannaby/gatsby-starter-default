import { Context } from "netlify:edge";

const pathRegex = /^.*\/resources\//;
const proxyUrl = "https://read.uberflip.com/resources-test/";

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch(`${proxyUrl}/${path}`, {
    headers: {
       "X-Forwarded-Host": "construction.autodesk.com/resources/",
    }
  });
  console.log(response)
  return response;
};
