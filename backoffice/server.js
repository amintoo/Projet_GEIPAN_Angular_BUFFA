const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();


const send = require('./sendToDB')
const mongoDBModule = require('./crud');


// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);


// // // //------------------
// // // // ROUTES
// // // //------------------
// // // // Utile pour indiquer la home page, dans le cas
// // // // ou il ne s'agit pas de public/index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion à la base
app.get('/api/connection', function (req, res) {
    // Pour le moment on simule, mais après on devra
    // réellement se connecte à la base de données
    // et renvoyer une valeur pour dire si tout est ok
    mongoDBModule.connexionMongo(function (err, db) {
        let reponse;

        if (err) {
            console.log("erreur connexion");
            reponse = {
                msg: "erreur de connexion err=" + err
            }
        } else {
            reponse = {
                msg: "connexion établie"
            }
        }
        res.send(JSON.stringify(reponse));

    });
});

// Récupération des cas en passant des critére de recherche
app.get('/api/cases', function (req, res) {

    let annee = req.query.annee;
    let mois = req.query.mois;
    let jour = req.query.jour;
    let numEtude = req.query.numEtude;
    let nomDossier = req.query.nomDossier;
    let zoneNom = req.query.zoneNom;
    let zoneCode = req.query.zoneCode;

    let chainedequery = '{'
    chainedequery += (annee != undefined) ? `"cas_AAAA" : "${annee}",` : ``
    chainedequery += (mois != undefined) ? `"cas_MM" : "${mois}",` : ``
    chainedequery += (jour != undefined) ? `"cas_JJ" : "${jour}",` : ``
    chainedequery += (numEtude != undefined) ? `"cas_numEtude" : "${numEtude}",` : ``
    chainedequery += (nomDossier != undefined) ? `"cas_nom_dossier" : "${nomDossier}",` : ``
    chainedequery += (zoneNom != undefined) ? `"cas_zone_nom" : "${zoneNom}",` : ``
    chainedequery += (zoneCode != undefined) ? `"cas_zone_code" : "${zoneCode}",` : ``
    chainedequery = (chainedequery.length > 1) ? chainedequery.substring(0, chainedequery.length - 1) : chainedequery
    chainedequery += '}'

    // console.log(chainedequery)

    let query = JSON.parse(chainedequery)

    // console.log(query)

    mongoDBModule.EnsembleDesCas(query, function (data) {
        var objdData = {
            msg: "Cas trouvés avec succès",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

// Récupération d'un seul cas par son _id
app.get('/api/cases/:id', function (req, res) {
    var id = req.params.id;
    mongoDBModule.CasById(id, function (data) {
        res.send(JSON.stringify(data));
    });
});

// Récupération des temoignages cas by id_cas
app.get('/api/cas-temoignages/:id', function (req, res) {
    var id = req.params.id;
    mongoDBModule.EnsembleDesTemByIdCas(id, function (data) {
        res.send(JSON.stringify(data));
    });
});

// Récupération d'un temoignage par son _id
app.get('/api/temoignages/:id', function (req, res) {
    var id = req.params.id;
    mongoDBModule.TemById(id, function (data) {
        res.send(JSON.stringify(data));
    });
});

// Récuperation des ZoneNom
app.get('/api/zonenom', function (req, res) {
    mongoDBModule.GetZoneNom(function (data) {
        res.send(JSON.stringify(data));
    });
});

// Récuperation des ZoneCode
app.get('/api/zonecode', function (req, res) {
    mongoDBModule.GetZoneCode(function (data) {
        res.send(JSON.stringify(data));
    });
});