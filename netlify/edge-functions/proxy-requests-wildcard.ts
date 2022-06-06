import { Context } from "netlify:edge";

const pathRegex = /^.*\/resources\//;
const proxyUrl = "https://read.uberflip.com/resources";

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "");
  const response = await fetch(`${proxyUrl}/${path}`, {
    headers: {
      "X-Forwarded-Host": "gatsby-edge-functions-proxy-test.netlify.app",
      "X-Original-Host": "gatsby-edge-functions-proxy-test.netlify.app",
      "X-Netlify-Hostname": "gatsby-edge-functions-proxy-test.netlify.app"
    }
  });
  console.log(response)
  return response;
};
