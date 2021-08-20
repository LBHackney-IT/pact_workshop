const { Verifier } = require('@pact-foundation/pact');
let opts = {
    providerBaseUrl: "http://localhost:3001/",
    pactBrokerUrl: "http://localhost:9292/",
    provider: "BookService",
    publishVerificationResult: true,
    providerVersion: "version",
    providerVersionTags: ["main"],
};

new Verifier(opts).verifyProvider()