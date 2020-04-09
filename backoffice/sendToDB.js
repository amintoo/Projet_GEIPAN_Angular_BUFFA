const csvtojson = require("csvtojson");
const mongodb = require("mongodb").MongoClient;
const variable = require('./constante')

const mabase = variable.mabase
const collection_cas = variable.collection_cas
const collection_tem = variable.collection_tem

let url = variable.url


// supprimer la base en cas d'existance
mongodb.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        if (err) throw err;

        client
            .db(mabase)
            .dropDatabase((err, res) => {
                if (err) throw err
                // console.log(`Drop existante db ${mabase}`);
                client.close();
            })
    }
);

csvtojson()
    .fromFile('./cas_pub.csv')
    .then(csvData => {
        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db(mabase)
                    .collection(collection_cas)
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;
                        console.log(`Inserted: ${res.insertedCount} rows in ${collection_cas} collection`);
                        client.close();
                    });
            }
        );
    });

csvtojson()
    .fromFile('./temoignages_pub.csv')
    .then(csvData => {
        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db(mabase)
                    .collection(collection_tem)
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;
                        console.log(`Inserted: ${res.insertedCount} rows in ${collection_tem} collection`);
                        client.close();
                    });
            }
        );
    });

