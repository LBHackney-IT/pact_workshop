# PACT Testing Workshop

This project includes a Pact Broker along with a simple RESTful API written using Express for Node.js

#### Prerequisites:
You will need *Docker* installed on your system.


> Start the Pact Broker
- Run `docker-compose -f pact_broker/docker-compose.yml up -d`
- To view the Pact broker, open a browser and navigate to `localhost:9292`
####

> Start the Express API
- Run `npm --prefix api/ install` to install the API dependencies
- Run `docker-compose -f api/docker-compose.yml up -d`
- To confirm the application is working, open a browser and navigate to `localhost:3001`
####

> Generating the consumer Pact contract
- Run `npm install` to install the test dependencies.
- Run `npm run test:consumer` to run the consumer integration tests and generate the Pact file.
- The generated pact file will be published to the broker and can be located at `./pacts`
####

> Uploading the pact to the broker
- Run `curl -v -XPUT \-H "Content-Type: application/json" -d@pacts/bookconsumer-bookservice.json http://localhost:9292/pacts/provider/BookService/consumer/BookConsumer/version/1.0.0`
####

> Testing the provider against the consumer contract
- Run `npm run test:provider` to run the provider tests against the pact broker

####
