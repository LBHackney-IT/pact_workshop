const expect = require("chai").expect
const path = require("path")
const { Pact, Matchers } = require("@pact-foundation/pact")
const { getMeBooks, getMeBook } = require("../index")
const { eachLike, like } = Matchers


describe("The Book API", () => {
  let url = "http://localhost"
  const port = 9001
  const bookId = "611f8175eb38ae9b03504417"   // set the object id for the single GET request here

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "BookConsumer",
    provider: "BookService",
    pactfileWriteMode: "merge",
  })

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
          body: eachLike({
              _id: "611f5ce5a843b14a73abf285",
              title: "Heart of Darkness",
              author: "Joseph Conrad"
            },
          ),
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
        expect(response.data[0]._id).to.exist;
        expect(response.data[0].title).to.exist;
        expect(response.data[0].author).to.exist;
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
          path: `/api/books/${bookId}`,
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: {
            _id: like(bookId),
            title: "Wuthering Heights",
            author: "Jane Austen"
          },
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
      getMeBook(urlAndPort, bookId).then(response => {
        expect(response.data._id[0]).to.exist;
        expect(response.data.title[0]).to.exist;
        expect(response.data.author[0]).to.exist;
        done()
      }, done)
    })
  })
})