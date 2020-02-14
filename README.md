pact-stub-service --port 3000 packages/aggregator/pacts/

pact-broker can-i-deploy --pacticipant aggregator --version 1.0.1581672176 --broker-base-url=http://localhost:9292
pact-broker can-i-deploy --pacticipant web --version 1.0.1581672176 --broker-base-url=http://localhost:9292
