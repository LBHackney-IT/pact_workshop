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

exports.getMeBook = (endpoint, bookId) => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: `/api/books/${bookId}`,
    headers: { Accept: "application/json; charset=utf-8" },
  })
}