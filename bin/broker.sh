#!/bin/bash

docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgres -d -p 5432:5432 postgres

sleep 3

docker run -e PACT_BROKER_DATABASE_USERNAME=postgres -e PACT_BROKER_DATABASE_PASSWORD=password -e PACT_BROKER_DATABASE_HOST=docker.for.mac.localhost -e PACT_BROKER_DATABASE_NAME=postgres -e PACT_BROKER_PORT=9292 -d -p 9292:9292 pactfoundation/pact-broker
