import { Context } from "netlify:edge";

const pathRegex = /^.*\/proxy\//;
const proxyUrl = "https://read.uberflip.com/resource-test/";

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch(`${proxyUrl}/${path}`, {
    headers: {
      "Host": "adskconstruction.autodesk.com/",
    },
  });
  console.log(response)
  return response;
};
