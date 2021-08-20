FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db books --collection posts --type json --file /init.json --jsonArray