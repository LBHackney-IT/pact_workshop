const expect = require("chai").expect
const path = require("path")
const { Pact } = require("@pact-foundation/pact")
const { getMeBooks, getMeBook } = require("../index")

describe("The Book API", () => {
  let url = "http://localhost"
  const port = 9001

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "BookConsumer",
    provider: "BookService",
    pactfileWriteMode: "merge",
  })

  const EXPECTED_GET_BOOKS_RESPONSE_BODY = [
    {
      "_id": "611e8045a2d819d24ec3ed45",
      "title": "Dune",
      "author": "Frank Herbert"
    },
    {
      "_id": "611e8045a2d819d24ec3ed46",
      "title": "Heart of Darkness",
      "author": "Joseph Conrad"
    },
    {
      "_id": "611e8045a2d819d24ec3ed47",
      "title": "Wuthering Heights",
      "author": "Jane Austen"
    }
  ]

  const EXPECTED_GET_BOOK_RESPONSE_BODY = {
    
    "_id": "611e8045a2d819d24ec3ed47",
    "title": "Wuthering Heights",
    "author": "Jane Austen"
  }

  before(() => provider.setup())

  after(() => provider.finalize())

  afterEach(() => provider.verify())

  describe("get /books", () => {
    before(done => {
      const interaction = {
        state: "i have a list of books",
        uponReceiving: "a request for all books",
        withRequest: {
          method: "GET",
          path: "/api/books",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_GET_BOOKS_RESPONSE_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getMeBooks(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_GET_BOOKS_RESPONSE_BODY)
        done()
      }, done)
    })
  })

  describe("get /books/{id}", () => {
    before(done => {
      const interaction = {
        state: "i have a list of books",
        uponReceiving: "a request for a single book",
        withRequest: {
          method: "GET",
          path: "/api/books/611e8045a2d819d24ec3ed47",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_GET_BOOK_RESPONSE_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getMeBook(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_GET_BOOK_RESPONSE_BODY)
        done()
      }, done)
    })
  })
})