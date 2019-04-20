#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

# run api unit tests
if (cd ./api && npm run lint && cd -) || exit 1 ; then
  echo -e "${GREEN}API lint all set!${NC}"
else
  echo -e "${RED}API lint failed${NC}"
fi

if (cd ./ui && npm run lint && cd -) || exit 1 ; then
  echo -e "${GREEN}UI lint all set!${NC}"
else
  echo -e "${RED}UI lint failed${NC}"
fi