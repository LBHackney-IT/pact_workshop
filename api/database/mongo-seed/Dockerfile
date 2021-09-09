FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db books-broken --collection posts-broken --type json --file /init.json --jsonArray