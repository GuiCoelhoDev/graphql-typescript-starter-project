#!/usr/bin/env bash
docker run --rm -p 5432:5432 --name graphql-postgres --env-file .env postgres