// ==UserScript==
// @name       Marqueur galaxie
// @namespace  http://userscripts.org/scripts/show/145176
// @version    1.2
// @description  Marque certaines positions lors de leur affichage en page galaxie
// @include    http://*.ogame.*/game/index.php?page=galaxy*
// @date       17 juillet 2012
// @copyright  nitneuc -- Libre d'être modifié ou reproduit, tant que cette ligne @copyright reste identique
// ==/UserScript==

/*
// ****** Informations ******
Marqueur galaxie
----------------

Installation:
-------------
compatible : Google chrome et Firefox
Décommentez la ligne concernée


Variables persistantes stockées:
--------------------------------
*booléen=nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_premiereExecution"
*array=nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_listePlanetesA"
*array=nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_listePlanetesB"

ChangeLog:
----------
v1.0:
*première version stable

v1.1:
*amélioration du code

v1.2:
*compatibilité avec firefox
*ajustements pour partage sur forum
*/
var strFunc = (function(){
// ****** Fonctions ******

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
};


function comparer() {
    var positionCourante = getInfoGalaxy(); // récupère la position courante (Galaxie:Système:Position, Position n'est pas significatif)
    
    if (premierePage) { // A la première boucle, on remplit les 2 cases avec la même valeur = variable: positionCourante
        tableChangementPositionCourante[0] = positionCourante;
        premierePage = false;   
    } else {
        tableChangementPositionCourante[0] = tableChangementPositionCourante[1]; // A chaque boucle, sauf la 1ère, on décale la 2ème case dans la première et remplit la 2ème avec la variable: positionCourante
    }
    tableChangementPositionCourante[1] = positionCourante;
    
    if (tableChangementPositionCourante[0] != tableChangementPositionCourante[1]) { // test, et si un changement de système courant a eu lieu, on affiche les positions sur la nouvelle page
        // test chaque élément des listes A et B de planètes = positionCourante ?
        for (var i = 0 ; i < listePlanetesA.length ; i++) if ((listePlanetesA[i].split(':')[0] == positionCourante.split(':')[0])&&(listePlanetesA[i].split(':')[1] == positionCourante.split(':')[1])) afficherSurPage(listeA_symbole,"status",listePlanetesA[i].split(':')[2]-1,listeA_fontColor,listeA_bgColor);
        for (var i = 0 ; i < listePlanetesB.length ; i++) if ((listePlanetesB[i].split(':')[0] == positionCourante.split(':')[0])&&(listePlanetesB[i].split(':')[1] == positionCourante.split(':')[1])) afficherSurPage(listeB_symbole,"status",listePlanetesB[i].split(':')[2]-1,listeB_fontColor,listeB_bgColor);
    }
}


function getInfoGalaxy() { // récupère le contenu dans la div id = 'galaxy_content'
    if (document.getElementById("galaxyContent").innerHTML == '') return; // si la div id = 'galaxy_content' n'existe pas encore, on sort de la fonction
    return document.getElementById('pos-planet').innerHTML.replace('[','').replace(']','');
}


function localStorage2variable() {
    listePlanetesA = localStorage.getObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_listePlanetesA"); // 1ère liste de planètes
    listePlanetesB = localStorage.getObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_listePlanetesB"); // 2ème liste de planètes
}


function afficherSurPage(texteAAfficher,lieuPrecedent,numLieuPrecedent,fontColor,bgColor) { // affiche un texte = variable:'texteAAfficher' après une balise de classe = variable:'lieuPrecedent'
    var sp1 = document.createElement("span"); // création de la balise span qui contiendra le texte
    sp1.setAttribute("style","float:right ; color:" + fontColor + "; background-color:" + bgColor);
    sp1.appendChild(document.createTextNode(texteAAfficher));    
    var sp2 = document.getElementsByClassName(lieuPrecedent)[numLieuPrecedent]; // situation du lieu d'insertion = variable:'parentDiv'
    sp2.parentNode.insertBefore(sp1, sp2.nextSibling); // insertion de la balise span, avant la balise "soeur" suivant (même parent) la balise de classe = variable:'lieuPrecedent'
}


function recuperer_pseudo() {
    var ensembleBaliseMeta = document.getElementsByTagName("meta"); // récupère toutes les balises meta du <head>
    for (var i=0 ; i<ensembleBaliseMeta.length ; i++) if (ensembleBaliseMeta[i].getAttribute("name") == "ogame-player-name") var pseudo = ensembleBaliseMeta[i].getAttribute("content"); //trouve une balises dans la liste
    return pseudo;
}


function initialisation() {
    var listePlanetesA_temp = new Array( // 1ère liste
        "6:243:9","6:274:6","6:240:12","6:239:12","6:239:3"
    );
    var listePlanetesB_temp = new Array( // 2ème liste
        "6:200:8","6:200:15"
    );
    // /!\ APRES AVOIR MODIFIE CES LISTES IL FAUT FAUT DECOMMENTER PLUS BAS POUR L'INSTALLER /!\
    
    localStorage.setObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_listePlanetesA",listePlanetesA_temp);
    localStorage.setObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_listePlanetesB",listePlanetesB_temp);
    localStorage.setObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_premiereExecution",false);
    
    localStorage2variable();
}


// ****** variables et constantes ******
var premierePage = true;
var tableChangementPositionCourante = new Array(); // une table à 2 cellules pour reconnaître un changement de position courante

const paysJeu = location.href.split("/")[2].split(".")[2];
const universJeu = location.href.split("/")[2].split(".")[0].replace("uni","");
const pseudoJeu = recuperer_pseudo();
const nomScript = "marqueur galaxie";

// localStorage.setObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_premiereExecution",true); // A DECOMMENTEZ POUR INSTALLER ET RE-INSTALLER LA TABLE DES POSITIONS

var listePlanetesA = new Array();
var listePlanetesB = new Array();

// Paramètres utilisateur
var listeA_fontColor = "#0000FF"; // attributs d'affichage pour la liste A
var listeA_bgColor = "#FF0000";
var listeA_symbole = "o";
var listeB_fontColor = "#FFFF00"; // attributs d'affichage pour la liste B
var listeB_bgColor = "#0000FF";
var listeB_symbole = "x";

(localStorage.getObj(nomScript+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ paysJeu+ "_premiereExecution")) ? initialisation() : localStorage2variable(); // redirection si 1ère execution

// ****** script ******

setInterval(comparer,1000);

}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);