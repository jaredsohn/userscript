// ==UserScript==
// @name       Missiles en vol
// @namespace  Lien userscript à venir
// @version    1.0
// @description  Compte les MiP envoyés pour chacune des cibles
// @include    http://*.ogame.*/game/index.php?page=*
// @exclude    http://*.ogame.*/game/index.php?page=galaxy*
// @date       26 septembre 2012
// @author     nitneuc -- Libre d'être modifié ou reproduit, tant que cette ligne @copyright reste identique// ==/UserScript==


function removeElement(id) { // fonction recopiée sur http://www.roseindia.net
    var el = document.getElementById(id);
    var remElement = (el.parentNode).removeChild(el);
}


// ****** fonctions d'affichage ******

function creer_CSS() { // ajoute des classes CSS
    var headDocument = document.getElementsByTagName("head")[0];
    var inner = headDocument.innerHTML;
    var ajoutHTML = '<style type="text/css">'
        +'.compteurMip_div { background-image:url(' +config.urlImage_fond +'); width:100%; }'
        +'.compteurMip_table { width:30%; }'
        +'.compteurMip_header { background-color:' +config.header_fond_couleur +'; color:' +config.header_texte_couleur +'; font-size:' +config.header_texte_taille +'; font-weight:' +config.header_texte_bold +'; text-align:center; }'
        +'.compteurMip_td { background-color:' +config.case_fond_couleur +'; color:' +config.case_texte_couleur +'; font-size:' +config.case_texte_taille +'; font-weight:' +config.case_texte_bold +'; text-align:center; }'
        +'</style>'
        headDocument.innerHTML = ajoutHTML +inner;
}


function afficher_compteurEvenement() {
    var listeEvenement = recuperer_infoEvenement(config.urlImage_flotte);
    etatCompteur = true;
    if (typeof(listeEvenement) != "undefined") {
        if (listeEvenement != "") {
            var elHTML = document.getElementById("contentWrapper");
            var inner = elHTML.innerHTML;
            var ajoutHTML = '<div class="compteurMip_div" id="compteurEvenement" align="center"><table class="compteurMip_table"><tr><td class="compteurMip_header">'+ texte.header1+ '</td><td class="compteurMip_header">'+ texte.header2+ '<img style="float:right;" src=' +config.urlImage_flotte +' width='+ config.header_texte_taille +' height=' +config.header_texte_taille +' /></td></tr>';
            for (var i=0 ; i<listeEvenement.length ; i++) ajoutHTML = ajoutHTML+ '<tr><td class="compteurMip_td">'+ listeEvenement[i][0]+ '</td><td class="compteurMip_td">'+ listeEvenement[i][1]+ '</td></tr>'; // ajout d'une nouvelle ligne par élément dans le tableau
            ajoutHTML = ajoutHTML+ '</table></div>';
            elHTML.innerHTML = ajoutHTML+ inner;
        }
    }
}


function masquer_compteurEvenement() {
    removeElement("compteurEvenement");
    etatCompteur = false;
}

// ****** fonctions récupérer ******

function recuperer_infoEvenement(typeFlotte) {
    var fenetreEvenement = document.getElementById("eventHeader").nextSibling.nextSibling; // fenetreEvenement est la balise parent de tous les 'tr'
    var i=0;
    var listePosition = new Array();
    while (typeof(fenetreEvenement.getElementsByClassName("arrivalTime")[i]) != "undefined") {
        var evenementEnCours = fenetreEvenement.getElementsByClassName("arrivalTime")[i].parentNode;
        if ((evenementEnCours.getElementsByClassName("icon_movement")[0])&&(evenementEnCours.getElementsByClassName("missionFleet")[0].getElementsByTagName("img")[0].getAttribute("src") == typeFlotte)) { // si le 'td' de classe 'icon_movement' n'existe pas, c'est qu'il est de class 'icon_movement_reserve', donc une flotte en mode 'retour' donc à ne pas afficher
            var destinationCoord = evenementEnCours.getElementsByClassName("destCoords")[0].getElementsByTagName("a")[0].innerHTML.replace(reg_nonPosition,"");
            var nombre_anterieur = 0;
            for (var j=0 ; j<listePosition.length ; j++) {
                if (destinationCoord == listePosition[j][0]) {
                    nombre_anterieur = listePosition[j][1];
                    break;
                }
            }
            listePosition[j] = new Array(destinationCoord,nombre_anterieur+parseInt(evenementEnCours.getElementsByClassName("detailsFleet")[0].getElementsByTagName("span")[0].innerHTML.replace(reg_espace,"")));
        }
        i++;
    }
    return listePosition;
}


function test_etatFenetre() { // Test des états de la fenêtre d'évènements
    if ((document.getElementById("eventHeader") != null)&&(etatCompteur == false)) afficher_compteurEvenement(); // fenêtre affichée + compteur masqué
    if ((document.getElementById("eventboxContent").style.display == "none")&&(etatCompteur == true)) masquer_compteurEvenement(); // fenêtre refermée + compteur affiché
}


// ****** Script ******

var langue = document.getElementsByName("ogame-language")[0].getAttribute("content");
if (langue == "fr") var texte = {
    header1:"cible", 
    header2:"Mip en vol",
};

var config = { // Paramètres utilisateur
    urlImage_flotte:"http://gf3.geo.gfsrv.net/cdne8/583cd7016e56770a23028cba6b5d2c.gif",
    urlImage_fond:"http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif",
    interval:"1500",
    header_texte_couleur:"#FFFF00",
    header_texte_taille:"9px",
    header_texte_bold:"bold",
    header_fond_couleur:"#00002D",
    case_texte_couleur:"#FFFFFF",
    case_texte_taille:"9px",
    case_texte_bold:"normal",
    case_fond_couleur:"#000000",
};

creer_CSS();
const reg_espace = new RegExp("/s","g");
const reg_nonPosition = new RegExp("[^0-9^:]","g");
var etatCompteur = false;

var test_etatFenetre_interval = setInterval(test_etatFenetre,config.interval);