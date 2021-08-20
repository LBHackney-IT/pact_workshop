const axios = require("axios")

exports.getMeBooks = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/api/books",
    headers: { Accept: "application/json; charset=utf-8" },
  })
}

exports.getMeBook = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/api/books/611e8045a2d819d24ec3ed47",
    headers: { Accept: "application/json; charset=utf-8" },
  })
}