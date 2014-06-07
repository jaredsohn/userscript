// ==UserScript==
// @name       script cachette
// @namespace  http://userscripts.org/scripts/source/139405.user.js
// @version    2
// @description  Affiche les coûts de construction/destruction de toutes les mines sur la planète courante d'Ogame, et les colorie si les ressources sont insuffisantes -- idéal pour la cache de ressource
// @include    http://*.ogame.*/game/index.php?page=resources*
// @include    http://*.ogame.*/game/index.php?page=station*

// @date       23 juillet 2012
// @copyright  nitneuc -- Libre d'être modifié ou reproduit, tant que cette ligne @copyright reste identique
// ==/UserScript==
/*
// ****** Informations ******

Script cachette
---------------

Installation:
-------------
http://userscripts.org/scripts/show/138760
compatible chrome et firefox


ChangeLog:
----------

v1.0:
*première version stable

v1.1:
*adaptation à l'évolution
*ajout d'un texte alternatif à l'image

v1.2:
*fonction ajouterPlanete() simplifiée
*affichage du temps de construction
*correction d'un bug d'affichage deouis ogame v5
*ajustement de la répartition de l'espace du tableau

v2:
*Ré-écriture du code
*ajout de classes
*ajout et regroupement de paramètres
*évolution des méthodes d'affichage
*/

// ****** fonctions hard ******
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
};


function existe_difference_array(listeA,listeB) {
    for (var i=0 ; i<listeA.length ; i++) if (listeA[i] != listeB[i]) return true;
    return false;
}


function positionPlanete2nombre(position) {
    return 1000000*parseInt(position.split(":")[0])+1000*parseInt(position.split(":")[1])+parseInt(position.split(":")[2]);
}

function retournerArray(table) {
    var table_temp = new Array();
    for (var incr=0 ; incr<table.length ; incr++) table_temp[incr] = table[table.length-incr-1];   
    return table_temp;
}


function ajouterSeparateurMilliers(nombre,car) {
    var str = nombre + "";
    var str_decoupe = new Array();
    
    for (var incr=0 ; incr < Math.ceil(str.length/3) ; incr++ ) str_decoupe[incr] = str.substring(str.length-3*incr-3,str.length-3*incr); // on remplit un array() de groupes de 3 chiffres  
    var str_2 = str_decoupe[str_decoupe.length-1]; // on cree une string composée des groupes de 3 chiffres + du signe
    for (var incr = str_decoupe.length-2 ; incr >= 0 ; incr--) str_2 = str_2 + car + str_decoupe[incr];
    return str_2;
}


function insererLigneArray(element,table,numLigne) {
    for (var incr_insererLigneArray=table.length-1 ; incr_insererLigneArray>=numLigne ; incr_insererLigneArray--) table[incr_insererLigneArray+1] = table[incr_insererLigneArray];
    table[numLigne] = element;
    return table;
}

function secondes2jjhhmmss(secondes) {
    var liste = new Array();
    liste[0] = divEuclidienne(secondes,86400)[0];
    secondes = divEuclidienne(secondes,86400)[1];
    liste[1] = divEuclidienne(secondes,3600)[0];
    secondes = divEuclidienne(secondes,3600)[1];
    liste[2] = divEuclidienne(secondes,60)[0];
    secondes = divEuclidienne(secondes,60)[1];
    liste[3] = Math.floor(divEuclidienne(secondes,60)[1]);
    return liste;
}


function array2jjhhmmss(liste,signeJ,signeH,signeM,signeS) {
    return liste[0]+ signeJ+ liste[1]+ signeH+ liste[2]+ signeM+ liste[3]+ signeS;
}


function divEuclidienne(divise,diviseur) { // retourne le résultat d'une division euclidienne sous forme d'array(quotient , reste)
    return new Array(Math.floor(divise/diviseur) , divise-Math.floor(divise/diviseur)*diviseur);
}


// ****** fonctions affichage HTML ******

function creer_CSS() { // ajoute des classes CSS
    var headDocument = document.getElementsByTagName("head")[0];
    var inner = headDocument.innerHTML;
    var ajoutHTML = '<style type="text/css">'
        +'.cachette_div { width: 100%;  }'
        +'.cachette_table { background-color:' +config.table_bgColor +'; font-size:' +config.table_fontSize +'px ; color:' +config.table_fontColor +'; text-align: center; width:' +config.table_width +'px; margin-top: 30px ; }'
        +'.cachette_headerColonne { background-color:' +config.headerColonne_bgColor +'; color:' +config.headerColonne_fontColor +'; font-size:' +config.headerColonne_fontSize +'px ; font-weight:' +config.headerColonne_fontBold +'; }'
        +'.cachette_alerte_niv0 { background-color:' +config.alerte_niv0_bgColor +'; }'
        +'.cachette_alerte_niv1 { background-color:' +config.alerte_niv1_bgColor +'; }'
        +'.cachette_alerte_niv2 { background-color:' +config.alerte_niv2_bgColor +'; }'
        +'.cachette_alerte { background-color:' +config.alerte_bgColor +'; color:' +config.alerte_fontColor +'; font-size:' +config.alerte_fontSize +'px ; font-weight:' +config.alerte_fontBold +'; text-align:' +config.alerte_textAlign +'; }'
        +'</style>';
    headDocument.innerHTML = ajoutHTML +inner;
}


// ****** fonctions construction HTML ******

function affichage_alerte(texteAAfficher) { // affiche alerte de confirmation
    var elHTML = document.getElementById("buttonz");
    var inHTML = elHTML.innerHTML;
    var ajHTML = '<div class="cachette_alerte">' +texteAAfficher +'</div>';
    elHTML.innerHTML = ajHTML +inHTML;
}


function constructionElementHTML_coutMine() {
    var elHTML = document.getElementById("buttonz");
    var inHTML = elHTML.innerHTML;
    var ajHTML = '<div cass="cachette_div" align="' +config.table_alignement +'">'
        +'<table class="cachette_table">'
        +'<tr><td class="cachette_headerColonne" width=' +(8*config.tailleImage_level+2) +'></td>'
        +'<td class="cachette_headerColonne" width=' +config.col2_width +'>' +texte.mine +'</td>'
        +'<td class="cachette_headerColonne" width=' +config.col3_4_width +'>' +texte.metal +'</td>'
        +'<td class="cachette_headerColonne" width=' +config.col3_4_width +'>' +texte.cristal +'</td>'
        +'<td class="cachette_headerColonne" width=' +(config.table_width-(8*config.tailleImage_level+2)-config.col2_width-2*config.col3_4_width) +'>' +texte.duree +'</td>';
    
    var ajHTML_1="";
    for (var incr_tr=1 ; incr_tr<=8 ; incr_tr++) {
        ajHTML_1 = ajHTML_1 +'<tr><td>';
        if (coutMine[incr_tr-1][3] == 1) ajHTML_1 = ajHTML_1 +'<img src="' +url_image_level_up +'" title="' +texte.construction_nom + " " + coutMine[incr_tr-1][2] +' /">';
        if (coutMine[incr_tr-1][3] == -1) ajHTML_1 = ajHTML_1 +'<img src="' +url_image_level_down +'" title="' +texte.destruction + " " + coutMine[incr_tr-1][2] +' /">';
        ajHTML_1 = ajHTML_1 +'</td>'
            +'<td align="left">' +coutMine[incr_tr-1][2] +'</td>';
        var ajHTML_2=""; // utilisé pour ne pas avoir à recalculer la valeur de ajHTML à chaque ligne de la boucle for suivante
        
        for (var incr_td=2 ; incr_td<=3 ; incr_td++) {
            ajHTML_2 = ajHTML_2 +'<td ';
            if (coutMine[incr_tr-1][incr_td-2] > ressourcesCourantes[incr_td-2]+config.limiteAlerte) {
                ajHTML_2 = ajHTML_2 +'class="cachette_alerte_niv2">';
            } else {
                if (coutMine[incr_tr-1][incr_td-2] > ressourcesCourantes[incr_td-2]) {
                    ajHTML_2 = ajHTML_2 +'class="cachette_alerte_niv1">';          
                } else {
                    ajHTML_2 = ajHTML_2 +'class="cachette_alerte_niv0">';
                }
            }
            ajHTML_2 = ajHTML_2 +ajouterSeparateurMilliers(coutMine[incr_tr-1][incr_td-2],".") +'</td>';
        }
        ajHTML_1 = ajHTML_1 +ajHTML_2 +'<td>' +array2jjhhmmss(secondes2jjhhmmss(coutMine[incr_tr-1][4]),texte.jour,texte.heure,texte.minute,texte.seconde) +'</td></tr>';
    }        
    ajHTML = ajHTML +ajHTML_1 +'</tr></table></div>';
    elHTML.innerHTML = inHTML + ajHTML;
}


// ****** fonctions recuperer ******

function recuperer_infoPlaneteCourante() { // fonction inventaire tools
    var ensembleBaliseMeta = document.getElementsByTagName("meta"); // récupère toutes les balises meta du <head>
    var info = new Array();
    for (var i=0 ; i<ensembleBaliseMeta.length ; i++) { //trouve certaines balises dans la liste
        if (ensembleBaliseMeta[i].getAttribute("name") == "ogame-planet-id") info[0] = ensembleBaliseMeta[i].getAttribute("content");
        if (ensembleBaliseMeta[i].getAttribute("name") == "ogame-planet-coordinates") info[1] = ensembleBaliseMeta[i].getAttribute("content");
        if (ensembleBaliseMeta[i].getAttribute("name") == "ogame-planet-name") info[2] = ensembleBaliseMeta[i].getAttribute("content");
        if (ensembleBaliseMeta[i].getAttribute("name") == "ogame-planet-type") info[3] = ensembleBaliseMeta[i].getAttribute("content");
    }
    return info;
}


function recuperer_coutMine() {
    var cout_up = new Array();
    for (var i=1 ; i<=8 ; i++) {
        var infoAdaptee = adapterInfo(i);
        var cout_up_temp = new Array(
            coutMine(infoAdaptee[0],infoAdaptee[1],infoAdaptee[2],niveauMine[Math.ceil(i/2)-1]+infoAdaptee[4])[0], // coût métal
            coutMine(infoAdaptee[0],infoAdaptee[1],infoAdaptee[2],niveauMine[Math.ceil(i/2)-1]+infoAdaptee[4])[1], // coût cristal
            infoAdaptee[3], // nom
            infoAdaptee[4] // up/down
        );
        // teste pour trouver la planète courante dans la BDD et calcule le temps de construction en fonction des niveaux d'installations enregistrés
        for (var j=0 ; j<proprietesPlanetes_installation.length ; j++) if (proprietesPlanetes_installation[j][0][0] == infoPlanete[0]) cout_up_temp[4] = temps_construction_batiment(cout_up_temp[0], cout_up_temp[1], proprietesPlanetes_installation[j][1][0],proprietesPlanetes_installation[j][1][5]);
        
        if (i == 1) {
            cout_up[0] = cout_up_temp;
        } else {
            for (var j=0 ; j<cout_up.length ; j++) {
                if (cout_up_temp[0] <= cout_up[j][0]) {
                    cout_up = insererLigneArray(cout_up_temp,cout_up,j);
                    break;
                }
                if (j == cout_up.length-1) {
                    cout_up[j+1] = cout_up_temp; 
                    break;
                }
            }
        }
    }
    if (!config.ordreListe_croissant) cout_up = retournerArray(cout_up);
    return cout_up;
}


function recuperer_niveauMine() { // lit dans la page ressources et y trouve le niveau des mines
    var niveau = new Array();   
    for (var i=0 ; i<=3 ; i++) niveau[i] = parseInt(document.getElementById("building").getElementsByClassName("level")[i].innerHTML.replace(reg_espace,""));
    return niveau;
}


function recuperer_installationPlaneteCourante() { // lit dans la page ressources et y trouve le niveau de toutes les installations
    var niveau = new Array();
    for (var i=0 ; i<=6 ; i++) niveau[i] = parseInt(document.getElementById("stationbuilding").getElementsByClassName("level")[i].innerHTML.replace(reg_espace,""));
    return niveau;
}


function recuperer_ressourcesCourantes() {
    return new Array(
        parseInt(document.getElementById("resources_metal").innerHTML.replace(reg_espace,"")),
        parseInt(document.getElementById("resources_crystal").innerHTML.replace(reg_espace,"")),
        parseInt(document.getElementById("resources_deuterium").innerHTML.replace(reg_espace,""))
    );
}


// ****** autres fonctions ******

function adapterInfo(num_tr) {
    if ((num_tr == 1)||(num_tr == 2)) var info = new Array(config.mineMetal_base_metal, config.mineMetal_base_cristal, config.mineMetal_coeff, texte.mineMetal);
    if ((num_tr == 3)||(num_tr == 4)) var info = new Array(config.mineCristal_base_metal, config.mineCristal_base_cristal, config.mineCristal_coeff, texte.mineCristal);
    if ((num_tr == 5)||(num_tr == 6)) var info = new Array(config.syntheDeut_base_metal, config.syntheDeut_base_cristal, config.syntheDeut_coeff, texte.syntheDeut);
    if ((num_tr == 7)||(num_tr == 8)) var info = new Array(config.CES_base_metal, config.CES_base_cristal, config.CES_coeff, texte.CES);
    Math.floor(num_tr/2) == num_tr/2 ? info[4] = -1 : info[4] = 1;
    return info;
}


function coutMine(base_metal,base_cristal,coeff,niveau) { // donne le coùt en métal et cristal de nimporte quelle mine de nimporte quel niveau (return un array de 2 cases)
    return new Array(
        Math.floor(base_metal*Math.pow(coeff,niveau-1)),
        Math.floor(base_cristal*Math.pow(coeff,niveau-1)));
}


function temps_construction_batiment(metal,cristal,udr,nanite) { // en secondes
    return (((metal+cristal)/(5000*vitesseUnivers))*(7200/(1+udr))*Math.pow(0.5,nanite));
}


function initialiserDonneesUtilisateur() { // initialise les données utilisateur du script
    var proprietes = new Array();  
    localStorage.setObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_proprietesPlanetes_installation",proprietes);
    localStorage.setObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution",false);
    return proprietes;
}


function testPlaneteExiste(id) { // test su la planète existe déjà dans la table
    for (var i=0 ; i<proprietesPlanetes_installation.length ; i++) if (proprietesPlanetes_installation[i][0][0].split(":")[0] == id) return i;
    return -1;
}


function ajouterPlanete(info,proprietesAAjouter,tableProprietes,nomVariablePersistante) { // ajout d'une planète (id) +ses proprietes (array de 3 cases) à la liste
    var pos = 0;
    if (tableProprietes.length != 0) for (var pos=0 ; pos<tableProprietes.length ; pos++) if (positionPlanete2nombre(info[1]) < positionPlanete2nombre(tableProprietes[pos][0][1])) break;
    insererLigneArray(new Array(info,proprietesAAjouter),tableProprietes,pos);
    localStorage.setObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_"+ nomVariablePersistante,tableProprietes);
    affichage_alerte(texte.script +": " +texte.alerte_installationAjoutee); // affiche alerte de confirmation
}


const pseudoJeu = document.getElementsByName("ogame-player-name")[0].getAttribute("content");
const langue = document.getElementsByName("ogame-language")[0].getAttribute("content");
const vitesseUnivers = document.getElementsByName("ogame-universe-speed")[0].getAttribute("content");
const universJeu = document.getElementsByName("ogame-universe")[0].getAttribute("content").split(".")[0].replace("uni","");

if (langue == "fr") var texte = {
    script:"Script cachette",
    alerte_installationAjoutee:"Installation ajoutée",
    alerte_proprietesModifiees:"Propriétés modifiees",
    mine:"mine",
    jour:"j ",
    heure:"h ",
    minute:"m ",
    seconde:"s ",
    mineMetal:"Mine de métal",
    mineCristal:"Mine de cristal",
    syntheDeut:"Synthé de deut",
    CES:"Centrale solaire",
    metal:"Métal",
    cristal:"Cristal",
    duree:"Durée",
    construction_nom:"Construction",
    destruction:"Destruction",
};

// ****** Paramètres utilisateur ******

var config = {
    // Paramètres généraux
    limiteAlerte:50000000, // Ressources maximales à obtenir pour lancer la construction (affichage en orange)
    ordreListe_croissant:false, // Ordre du tableau
    
    // Paramètres généraux du tableau
    table_width:440,
    table_alignement:"center",
    table_bgColor:"#000000",
    table_fontColor:"#FFFFFF",
    table_fontSize:11,
    tailleImage_level:2, // taille des images (flèche rouge + flèche verte) : 1= 8x5 , 2= 16x9
    col2_width:110, // largeur de la 2ème colonne
    col3_4_width:90, // largeur de la 3ème, et la 4ème ; la largeur de la 5ème colonne est déduite des autres, la largeur de la 1ère est fixe
    
    // En-tête des colonnes
    headerColonne_fontColor:"#FFFF00", // Couleur de la police des titres
    headerColonne_fontSize:12, // Taille de la police des titres
    headerColonne_fontBold:"bold", // Police des titres = gras (true) ou non gras (false)
    headerColonne_bgColor:"#00002D", // Couleur de fond des titres
    
    // Couleur des cases
    alerte_niv0_bgColor:"#005B00",
    alerte_niv1_bgColor:"#C46200",
    alerte_niv2_bgColor:"#800000",
    
    // Alerte !
    alerte_fontColor:"#FFFFFF",
    alerte_fontSize:9,
    alerte_fontBold:"bold",
    alerte_bgColor:"#FF0000",
    alerte_textAlign:"center",
    
    // Coûts de base
    mineMetal_base_metal:60,
    mineMetal_base_cristal:15,
    mineMetal_coeff:1.5,
    mineCristal_base_metal:48,
    mineCristal_base_cristal:24,
    mineCristal_coeff:1.6,
    syntheDeut_base_metal:225,
    syntheDeut_base_cristal:75,
    syntheDeut_coeff:1.5,
    CES_base_metal:75,
    CES_base_cristal:30,
    CES_coeff:1.5,
};

const reg_espace = new RegExp("[^0-9]","g"); // expression régulière, utilisée ensuite pour la foncion replace()

if (config.tailleImage_level == 1) { // adresse des images stockées dans 2 variables en fonction du paramètre utilisateur config.tailleImage_level
    url_image_level_up = "http://img35.imageshack.us/img35/8778/levelup8x5.gif";
    url_image_level_down = "http://img31.imageshack.us/img31/7777/leveldown8x5.gif";
} else {
    url_image_level_up = "http://img850.imageshack.us/img850/8930/levelup16x9.gif";
    url_image_level_down = "http://img837.imageshack.us/img837/515/leveldown16x9.gif";
}

// ****** script ******

creer_CSS();
var url = location.href.split("page=")[1].split("&")[0].split("#")[0];

// localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution");// A DECOMMENTER POUR INITIALISER LES DONNES UTILISATEUR

if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution") != false) { // teste si l'utilisateur est à sa première exécution ou non
    var proprietesPlanetes_installation = initialiserDonneesUtilisateur();
} else {
    var proprietesPlanetes_installation = localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_proprietesPlanetes_installation");
}

if (url == "resources") { 
    var ressourcesCourantes = recuperer_ressourcesCourantes();
    var infoPlanete = recuperer_infoPlaneteCourante();
    var niveauMine = recuperer_niveauMine();
    var coutMine = recuperer_coutMine();
    constructionElementHTML_coutMine();
}

if (url == "station") {
    var infoPlanete = recuperer_infoPlaneteCourante();
    var installationPlaneteCourante = recuperer_installationPlaneteCourante();
    
    if (infoPlanete[3] == "planet") { // teste si la planète courante n'est pas une lune
        // teste si la planète courante a déjà été enregistrée
        var existe = testPlaneteExiste(infoPlanete[0]);
        if (existe == -1) { // si la planète n'existe pas dans la liste
            ajouterPlanete(infoPlanete,installationPlaneteCourante,proprietesPlanetes_installation,"proprietesPlanetes_installation"); // le type des données sauvegardées est [ info_planète[id, coord, nom, type] , installation[ bat1 , bat2 , bat3 , bat4]]
        } else {
            if ((proprietesPlanetes_installation[existe][0][1] != infoPlanete[1])
                || (proprietesPlanetes_installation[existe][0][2] != infoPlanete[2])
                || (existe_difference_array(proprietesPlanetes_installation[existe][1],installationPlaneteCourante))) {
                proprietesPlanetes_installation[existe] = new Array(infoPlanete,installationPlaneteCourante);
                localStorage.setObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_proprietesPlanetes_installation",proprietesPlanetes_installation);
                affichage_alerte(texte.script +": " +texte.alerte_proprietesModifiees);
            }
        }
    }
}