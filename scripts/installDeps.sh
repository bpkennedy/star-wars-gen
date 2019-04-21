#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

if (cd ./api && npm install && cd -) || exit 1 ; then
echo -e "${GREEN}API deps install successful!${NC}"
else
  echo -e "${RED}API dep install failed${NC}"
fi

if (cd ./ui && npm install && cd -) || exit 1 ; then
  echo -e "${GREEN}UI deps install successful!${NC}"
else
  echo -e "${RED}UI deps install failed${NC}"
fi

if (cd ./functions && npm install && cd -) || exit 1 ; then
  echo -e "${GREEN}Functions deps install successful!${NC}"
else
  echo -e "${RED}Functions deps install failed${NC}"
fi