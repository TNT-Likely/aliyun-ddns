FROM node:16

WORKDIR /usr/src/app
COPY . .

RUN npm i 

ENV domainName='' \
    RR='nas' \
    type='A' \
    accessKeyId=''\
    accessKeySecret='' \
    dingAccessToken=''\
    dingSecret='' 

CMD [ "node", "index.js" ]