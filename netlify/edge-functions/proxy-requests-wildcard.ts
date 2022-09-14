import { Context } from "netlify:edge"
const pathRegex = /^.*\/resources\/?/
const trailingSlashRegex = /\/$/
const proxyUrl = "https://read.uberflip.com/resources"

export default async (request: Request, context: Context) => {
  const path = request.url.replace(pathRegex, "")
  const pathWithoutTrailingSlash = path.replace(trailingSlashRegex, "")
  const url = pathWithoutTrailingSlash
    ? `${proxyUrl}/${pathWithoutTrailingSlash}`
    : proxyUrl
  const response = await fetch(url, {
    ...request,
    headers: {
      ...request.headers,
      "X-Forwarded-Host": "www-pt.construction.autodesk.com",
      "X-Original-Host": "www-pt.construction.autodesk.com",
      "X-Netlify-Hostname": "www-pt.construction.autodesk.com",
    },
    redirect: "manual",
  })
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("Location")

    if (location && location.startsWith("/")) {
      const prefixedLocation = `/resources${location}`
      return new Response(null, {
        status: response.status,
        headers: {
          Location: prefixedLocation,
        },
      })
    }
  }
  return response
}
