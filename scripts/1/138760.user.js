// ==UserScript==
// @name       Inventaire tools
// @namespace  http://userscripts.org/scripts/show/138760
// @version    3.2.2
// @description  Recupere les informations sur la page inventaire d'ogame et affiche le temps de reduction possible ainsi que la production supplémentaire acquise par les boosters
// @include    http://*.ogame.*/game/index.php?page=shop*
// @include    http://*.ogame.*/game/index.php?page=resources*
// @copyright  19 juillet 2012, nitneuc -- Libre d'être modifié ou reproduit, tant que cette ligne @copyright reste identique
// ==/UserScript==

/*
// ****** Informations ******
Inventaire tools
----------------

Installation:
-------------
http://userscripts.org/scripts/show/138760
compatible chrome et firefox


Variables persistantes stockées:
--------------------------------
*booléen= texte.script + "_" +  pseudoJeu + "_" + universJeu + "_" + langue + "_premiereExecution"
*array= texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_proprietesPlanetes_production"


ChangeLog:
----------

v1.0:
*première version stable

v1.1:
*Correction bug affichage
*Correction: le tableau ne s'affichait pas si on passait de la boutique à l'inventaire

v1.2:
*Simplification du code
*Amélioration de l'affichage

v2.0:
*intégration du changelog dans le script
*nom du script = Inventaire tools
*séparation de la fonction afficherSurPage() et constructionElementHTML()
*ajout du tableau de production hebdomadaire des boosters
*tableau des productions sur planète se MAJ si changement quantité production/déménagement/renommage

v2.1:
*les 2 tableaux sont mis-en-page et réunis en bas
*nouvel emplacement pour les variables persistantes
*simplification du code

v2.1.1:
*compatible Firefox

v2.1.2:
*correction: initialisation programme

v2.1.3:
*correction: les productions nulles étaient exclues
*correction: les lunes étaient incluses (production nulle)

v2.2:
*ajout du 3ème tableau: cumul des gains booster (en nombre de ressources)
*simplification du code du 1er tableau (temps cumulés)
*nouvelle mise-en-page du 1er tableau (temps cumulés)

v2.3:
*utilisation d'un CSS
*travail de compatibilité avec autres script (uniformisation)
*modification de la structure de la variable permanente des propriétés

v2.4:
*compatibilité v5
*modification de l'affichage des alertes

v3:
*modification du stockage des variables
*transformation de fonctions en prototypes
*Refonte et grande simplification de l'affichage

v3.1
*Correction bug d'affichage

v3.2
*rétablissement de l'affichage après 'contentWrapper' en raisons de retours de bugs

v3.2.1
*réctification mineure

v3.2.2
*correction de l'affichage
*/

var strFunc = (function(){    
    // ****** Prototypes ******
    
    Storage.prototype.setObj = function(key, obj) {
		return this.setItem(key, JSON.stringify(obj));
    };
    
	Storage.prototype.getObj = function(key) {
		return JSON.parse(this.getItem(key));
	};
    
    Number.prototype.ajoutSeparateurMilliers = function(car) {
        var dec = "";
        if (this < 0) var neg = true;
        if (this != Math.floor(this)) {
            dec = ((this-Math.floor(this))+"").substr(1,(this+"").length-(Math.floor(this)+"").length);
            var str = Math.floor(this)+"";
        } else {
            var str = this+"";
        }
        if (neg) str = str.substring(1);
        var str_decoupe = new Array();
        for (var tmp=0; tmp<Math.ceil(str.length/3) ; tmp++) str_decoupe[tmp] = str.substring(str.length-3*tmp-3,str.length-3*tmp); // on remplit un array() de groupes de 3 chiffres  
        var str_2 = str_decoupe[str_decoupe.length-1]; // on cree une string composée des groupes de 3 chiffres + du signe
        for (var tmp = str_decoupe.length-2; tmp>=0; tmp--) str_2 = str_2 + car + str_decoupe[tmp];
        if (neg) str_2 = "-"+str_2;
        return str_2+dec;
    };
    
    Array.prototype.niemeValeurDifferenteDe = function(n,val) {
        var tmp_2=0;
        for (var tmp=0; tmp<this.length; tmp++) {
            if (this[tmp] != val) tmp_2++;
            if (tmp_2 == n) return tmp;
        }
        return -1;       
    };
	
    // ****** fonctions 'hard' ******
    
    function minutes2hhmm(minutes) {
        var div = divEuclidienne(minutes,60);
        if (div[1] == 0) div[1] = "";
        return div;
    }
    
    function divEuclidienne(divise,diviseur) { // retourne le résultat d'une division euclidienne sous forme d'array(quotient , reste)
        return new Array(Math.floor(divise/diviseur) , divise-Math.floor(divise/diviseur)*diviseur);
    }
    
    function positionPlanete2nombre(position) {
        return 1000000*parseInt(position.split(":")[0])+1000*parseInt(position.split(":")[1])+parseInt(position.split(":")[2]);
    }
    
    function max_array(liste) { // fonction récupérée sur http://www.journaldunet.com/
        var max = liste[0];
        for (var i=0; i<liste.length; i++) if (liste[i]*1>max) max = liste[i];
        return max;
    }
    
    function insererLigneArray(element,table,numLigne) {
        for (var i=table.length-1 ; i>=numLigne ; i--) table[i+1] = table[i];
        table[numLigne] = element;
        return table;
    }
    
    function compterValeursArrayNonNulles(table) {
        var incr = 0;
        for (var j_4=0 ; j_4<table.length ; j_4++) if (table[j_4] != 0) incr++;
        return incr;
    }
    
    function removeElement(id) { // fonction recopiée sur http://www.roseindia.net
        var el = document.getElementById(id);
        var remElement = (el.parentNode).removeChild(el);
    }
    
    function testPlaneteExiste(id,tableProprietes) { // test su la planète existe déjà dans la table
        for (var i=0 ; i<tableProprietes.length ; i++) if (tableProprietes[i][0][0] == id) return i;
        return -1;
    }
    
    
    // ****** fonctions affichage ******
    
    function creer_CSS() { // ajoute des classes CSS
        var headDocument = document.getElementsByTagName("head")[0];
        var inner = headDocument.innerHTML;
        var ajoutHTML = '<style type="text/css">'
            +'.table1 { width:'+ config.table1_width +'px; padding-top: 20px; padding-bottom: 20px; }'
            +'.table { width:100%; border-width: 3px; border-style: double; border-color: #666666; text-align: center; font-size:' +config.valeur_fontSize +'px ; }'
            +'.header2 { background-color:'+ config.header2_bgColor+ '; color:'+ config.header2_fontColor +'; font-size:'+ config.header2_fontSize +'px ; font-weight:'+ config.header2_fontBold +'; text-align:'+ config.header2_textAlign +'; }'
            +'.header3 { background-color:'+ config.header3_bgColor+ '; color:'+ config.header3_fontColor +'; font-size:'+ config.header3_fontSize +'px ; font-weight:'+ config.header3_fontBold +'; text-align:'+ config.header3_textAlign +'; }'
            +'.headerLigne { background-color:'+ config.headerLigne_bgColor+ '; color:'+ config.headerLigne_fontColor +'; font-size:'+ config.headerLigne_fontSize +'px ; font-weight:'+ config.headerLigne_fontBold +'; }'
            +'.valeur { background-color:'+ config.valeur_bgColor+ '; color:'+ config.valeur_fontColor +'; font-size:'+ config.valeur_fontSize +'px ; font-weight:'+ config.valeur_fontBold +'; text-align:'+ config.valeur_textAlign +';}'
            +'.valeursMax { background-color:'+ config.valeursMax_bgColor+ '; color:'+ config.valeursMax_fontColor +'; font-size:'+ config.valeursMax_fontSize +'px ; font-weight:'+ config.valeursMax_fontBold +'; }'
            +'.alerte { background-color:'+ config.alerte_bgColor+ '; color:'+ config.alerte_fontColor +'; font-size:'+ config.alerte_fontSize +'px ; font-weight:'+ config.alerte_fontBold +'; text-align:'+ config.alerte_textAlign +' ;}'
            +'</style>';
        headDocument.innerHTML = ajoutHTML +inner;
    }
    
    
    function affichage_alerte(texteAAfficher) { // affiche alerte de confirmation
        var elHTML = document.getElementById("buttonz");
        var inHTML = elHTML.innerHTML;
        var ajHTML = '<div class="cachette_alerte">' +texteAAfficher +'</div>';
        elHTML.innerHTML = ajHTML +inHTML;
    }
    
    
    function afficherTable(tout,affichageTempsCumules,affichageGainBooster,affichageProdBooster) {
        var elHTML = document.getElementsByClassName("footer")[0];     
        var inner = elHTML.innerHTML;
        var ajoutHTML_2 = ""; // Déclaration
        var ajoutHTML_1 = '<div align="center"><table class="table1"><tr><td style="padding-bottom: 12px;" align="center"><table style="width:250px; align: center;" class="table">'
            +'<tr><td colspan="3" style="padding-top: 5px;  ; padding-bottom: 5px;" class="header2">CUMULS DES GAINS</td></tr><tr>';
        for (var i=0; i<=2 ; i++) ajoutHTML_1 = ajoutHTML_1 + '<td class="header3" width="33%">'+affichageTempsCumules[i].split(":")[0] +'</td>';
        ajoutHTML_1 = ajoutHTML_1 +  '</tr><tr>';
        for (var i=0; i<=2 ; i++) ajoutHTML_1 = ajoutHTML_1 + '<td class="valeur">'+affichageTempsCumules[i].split(":")[1] +'</td>';
        ajoutHTML_1 = ajoutHTML_1 +  '</tr>';
        if (tout) { // si tous les tableaux doivent être affichés
            ajoutHTML_1 = ajoutHTML_1 + '<tr>';
            for (var i=0; i<=2 ; i++) ajoutHTML_1 = ajoutHTML_1 + '<td class="header3" width="33%">'+ressource[0][i] +'</td>';
            ajoutHTML_1 = ajoutHTML_1 +  '</tr><tr>';
            for (var i=0; i<=2 ; i++) ajoutHTML_1 = ajoutHTML_1 + '<td class="valeur">'+affichageGainBooster[i].ajoutSeparateurMilliers(".")+'</td>';
            ajoutHTML_1 = ajoutHTML_1 + '</tr>';
        }
        ajoutHTML_1 = ajoutHTML_1 + '</table></td></tr>';
        if (tout) { 
            var nombre_type_booster = compterValeursArrayNonNulles(nombre_booster); // définit le nombre de colonnes à fabriquer dans le grand tableau      
            
            ajoutHTML_2 = '<tr><td style="padding-bottom: 30px;" align="center"><table class="valeur table" width="'+ (142+nombre_type_booster*(config.prodBooster_largeurColonne+2)) +'px"><tr><td colspan="'+(nombre_type_booster+2)+'" style="padding-top: 5px ; padding-bottom: 5px;" class="header2">GAIN SUR 1 SEMAINE</td></tr><tr>';
            for (var i=0; i<=nombre_type_booster+1 ;i++) {
                ajoutHTML_2 = ajoutHTML_2 + '<td class="header3" width=';
                if (i==0) ajoutHTML_2 = ajoutHTML_2+ '"91px" align="left">'+ affichageProdBooster.length + "/" + recuperer_nombreColonies().split("/")[0] + ' planètes</td>';
                if (i==1) ajoutHTML_2 = ajoutHTML_2+ '"45px">position</td>';
                if (i>=2) {
                    var j = nombre_booster.niemeValeurDifferenteDe(i-1,0);
                    ajoutHTML_2 = ajoutHTML_2+ '"'+ config.prodBooster_largeurColonne +'px">'+ (j-3*Math.ceil((j+1)/3)+4) + '0% '+ ressource[1][Math.floor(j/3)] +'/' + nombre_booster[j] +'</td>';
                }
            }
            ajoutHTML_2 = ajoutHTML_2+ '</tr>';
            for (var i=0; i<affichageProdBooster.length; i++) { // i = les lignes du tableau
                ajoutHTML_2 = ajoutHTML_2+ '<tr><td class="headerLigne" align="left">'
                    +'<a href="http://uni'+ universJeu +'.ogame.'+ langue +'/game/index.php?page=shop&cp='+ affichageProdBooster[i][0][0] + '#page=inventory" style="color:'+ config.headerLigne_fontColor +'; text-decoration:none;">';
                (affichageProdBooster[i][0][2].length > 14) ? ajoutHTML_2 = ajoutHTML_2+affichageProdBooster[i][0][2].substr(0,13)+"..." : ajoutHTML_2 = ajoutHTML_2+affichageProdBooster[i][0][2];
                ajoutHTML_2 = ajoutHTML_2+'</a></td><td class="headerLigne">'+ affichageProdBooster[i][0][1] +'</td>';
                for (var k=0; k<=2; k++) { // k= chaque ressource
                    var maxProd = max_planete(affichageProdBooster,k);  // maximum de production entre les planètes pour la ressource k
                    for (var l=1 ; l<=3 ; l++) {                        
                        if (nombre_booster[3*k+l-1] != 0) { // le contenu du td est nul si le booster n'est pas dans l'inventaire
                            ajoutHTML_2 = ajoutHTML_2+'<td';
                            if ((affichageProdBooster[i][1][k]) == maxProd) ajoutHTML_2 = ajoutHTML_2+ ' class="valeursMax"';
                            ajoutHTML_2 = ajoutHTML_2+ '>'+ Math.ceil((affichageProdBooster[i][1][k])*l*.1*168).ajoutSeparateurMilliers(".") +'</td>';  
                        }
                    }
                }
                ajoutHTML_2 = ajoutHTML_2+'</tr>';
            }
            ajoutHTML_2 = ajoutHTML_2 +'</table></td></tr>';
        }
        elHTML.innerHTML = inner+ ajoutHTML_1 + ajoutHTML_2;
    }
    
    
    function max_planete(table,n) {
        var table_temp = new Array;
        for (var tmp=0; tmp<table.length; tmp++) table_temp[tmp] = table[tmp][1][n];
        return max_array(table_temp);
    }
    
    
    // ****** Fonctions 'recuperer' ******
    
    function recuperer_infoInventaire() {
        
        var inventaire = document.getElementById("js_inventorySlider").getElementsByClassName("item_img_box"); // On récupère un élément HTML de la page
        var liste = new Array();
        
        for (var i=0 ; i < inventaire.length ; i++) { // fais le tour des objets de la page
            var inventaire2 = inventaire[i].getElementsByTagName("a");
            var nbObjet = inventaire2[0].getElementsByClassName("level amount")[0].innerHTML; // récupère le nombre de l'objet
            var attributObjet = inventaire2[0].getAttribute("title").split("|")[0]; // récupère le titre de l'objet
            liste[i] = (attributObjet.split(" en ")[0] + ":" + attributObjet.split(" en ")[1] + ":" + nbObjet).toLowerCase();
        }
        return liste;
    }
    
    
    function recuperer_nombreColonies() {
        return document.getElementById("countColonies").getElementsByTagName("span")[0].innerHTML;
    }
    
    
    function recuperer_infoPlaneteCourante() {
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
    
    
    function recuperer_productionCourante() { // renvoie la production M,C et D, sous forme d'Array()
        var production = new Array();
        for(var i=0 ; i<3 ; i++) production[i] = document.getElementById("resourceSettings").getElementsByClassName("label")[i].getElementsByClassName("undermark")[1].innerHTML.replace(/[^0-9-]/g,"");
        return production;
    }
    
    
    // ****** autres fonctions ******        
    
    function affichageInventaire() {
        if (document.getElementById("js_inventorySlider")) {
            if (pageCouranteEstInventaire == false) {
                pageCouranteEstInventaire = true;
                
                // Préparation du tableau tempsCumulés
                var duree_kraken = 0; // remise à zéro des compteurs de duree/nombre pour chaque type d'items
                var duree_detroid = 0;
                var duree_newtron = 0;
                var listeItem = recuperer_infoInventaire();
                
                for (var i=0 ; i<listeItem.length ; i++) { // modifie les compteurs de duree des 3 types d'item
                    if (listeItem[i].split(":")[0] == "kraken") duree_kraken = duree_kraken + niveauItem2temps(listeItem[i].split(":")[1],listeItem[i].split(":")[2]);
                    if (listeItem[i].split(":")[0] == "detroid") duree_detroid = duree_detroid + niveauItem2temps(listeItem[i].split(":")[1],listeItem[i].split(":")[2]);
                    if (listeItem[i].split(":")[0] == "newtron") duree_newtron = duree_newtron + niveauItem2temps(listeItem[i].split(":")[1],listeItem[i].split(":")[2]);
                    if ((listeItem[i].split(":")[0] == "booster de métal") || (listeItem[i].split(":")[0] == "booster de cristal") || (listeItem[i].split(":")[0] == "booster de deutérium")) {
                        //calcul l'emplacement de la case de l'array() à incrémenter                    
                        if (listeItem[i].split(":")[0] == "booster de métal") var a = 1;
                        if (listeItem[i].split(":")[0] == "booster de cristal") var a = 2;
                        if (listeItem[i].split(":")[0] == "booster de deutérium") var a = 3;
                        if (listeItem[i].split(":")[1] == "bronze") var b = 1;
                        if (listeItem[i].split(":")[1] == "argent") var b = 2;
                        if (listeItem[i].split(":")[1] == "or") var b = 3;
                        nombre_booster[3*a+b-4] = listeItem[i].split(":")[2];
                    }
                }                
                var affichage = new Array(// les valeurs à afficher à l'écran sont entrées dans un array()
                    "Bâtiments : "+ minutes2hhmm(duree_kraken)[0]+ "h"+ minutes2hhmm(duree_kraken)[1],
                    "Chantier spatial : "+ minutes2hhmm(duree_detroid)[0]+ "h"+ minutes2hhmm(duree_detroid)[1],
                    "Recherche : "+ minutes2hhmm(duree_newtron)[0]+ "h"+ minutes2hhmm(duree_newtron)[1]
                ); 
                if ((compterValeursArrayNonNulles(nombre_booster) != 0)&&(typeof proprietesPlanetes_production[0] != 'undefined')) { // si on affiche les 3 tables
                    afficherTable(true,affichage,gainTotalBooster(proprietesPlanetes_production),proprietesPlanetes_production);
                } else { // si on affiche qu'une table 
                    afficherTable(false,affichage);
                }
            }
        }
        else { // si la page courante n'est pas l'inventaire
            pageCouranteEstInventaire = false;
            removeElement("tempsCumules"); // efface les tableaux
            removeElement("prodBooster");
        }
    }
    
    
    function niveauItem2temps(niveau,nombre) { // renvoit la durée associée à chaque item en fonction de son nombre
        if (niveau == "bronze") return nombre*config.duree_bronze;
        if (niveau == "argent") return nombre*config.duree_argent;
        if (niveau == "or") return nombre*config.duree_or;
    }
    
    
    function ajouterPlanete(info,proprietesAAjouter,tableProprietes,nomVariablePersistante) { // ajout d'une planète (id) +ses proprietes (array de 3 cases) à la liste
        var pos = 0;
        if (tableProprietes.length != 0) for (var pos=0 ; pos<tableProprietes.length ; pos++) if (positionPlanete2nombre(info[1]) < positionPlanete2nombre(tableProprietes[pos][0][1])) break;
        insererLigneArray(new Array(info,proprietesAAjouter),tableProprietes,pos);
        localStorage.setObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_"+ nomVariablePersistante,tableProprietes);
        affichage_alerte(texte.alerte_planeteAjoutee); // affiche alerte de confirmation
    }
    
    
    function maxProdEmpire(tableProprietes) { // trouve les meilleures productions de l'empire, pour trouver les meilleures planètes où appliquer les boosters
        var maxProd_temp = new Array(0,0,0);
        for (var i=0 ; i<tableProprietes.length ; i++) for (var j=0 ; j<=2 ; j++) if (parseInt(tableProprietes[i][1][j]) > maxProd_temp[j]) maxProd_temp[j] = parseInt(tableProprietes[i][1][j]);
        return maxProd_temp;
    }
    
    
    function gainTotalBooster(tableProprietes) {
        var maxProd_temp = maxProdEmpire(tableProprietes);
        var gain_parRessource = new Array(0,0,0);
        for (var i=0 ; i<=2 ; i++) for (var j=3*i ; j<=3*i+2 ; j++) gain_parRessource[i] = gain_parRessource[i] + nombre_booster[j]*Math.ceil(maxProd_temp[i]*168*(j+1-3*Math.floor(j/3))/10);
        return gain_parRessource;
    }
    
    
    function initialiserDonneesUtilisateur() { // initialise les données utilisateur du script
        var proprietes = new Array();  
        localStorage.setObj(texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_proprietesPlanetes_production",proprietes);
        localStorage.setObj(texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_premiereExecution",false);
        return proprietes;
    }
    
    
    // ****** Script ******
    
    const langue = location.href.split("/")[2].split(".")[2];
    const universJeu = location.href.split("/")[2].split(".")[0].replace("uni","");
    const pseudoJeu = document.getElementsByName("ogame-player-name")[0].getAttribute("content");
    
    var pageCouranteEstInventaire = false;
    
    var nombre_booster = new Array(0,0,0,0,0,0,0,0,0); // array() contenant le nombre de chaque booster
    
    
    // ****** Paramètres utilisateur ******
    
    var config = {
        duree_bronze:30,
        duree_argent:120,
        duree_or:360,
        
        header2_fontColor:"#FFFFFF",
        header2_fontSize:"9",
        header2_fontBold:"bold",
        header2_bgColor:"#00002D",
        header2_textAlign:"center",
        
        header3_fontColor:"#FFFF00",
        header3_fontSize:"9",
        header3_fontBold:"bold",
        header3_bgColor:"#00002D",
        header3_textAlign:"center",
        
        headerLigne_fontColor:"#FF8000",
        headerLigne_fontSize:"9",
        headerLigne_fontBold:"bold",
        headerLigne_bgColor:"#000000",
        
        valeur_fontColor:"#FFFFFF",
        valeur_fontSize:"9",
        valeur_fontBold:"normal",
        valeur_bgColor:"#000000",
        valeur_textAlign:"center",
        
        
        valeursMax_fontColor:"#FFFFFF",
        valeursMax_fontSize:"9",
        valeursMax_fontBold:"normal",
        valeursMax_bgColor:"#FF0000",
        
        prodBooster_largeurColonne:70,
        
        alerte_fontColor:"#FFFFFF",
        alerte_fontSize:"9",
        alerte_fontBold:"bold",
        alerte_bgColor:"#FF0000",
        alerte_textAlign:"center",        
    };
    
    var texte = {
        script:"Inventaire tools",
        
        alerte_planeteAjoutee:"Inventaire tools: Planète ajoutée",
        alerte_proprietesModifiees:"Inventaire tools: Propriétés modifiees",
    };
    
    var ressource = new Array(
        new Array("Métal","Cristal","Deutérium"),
        new Array("mét","cri","deut")
    );
    
    // ****** script ******
    
    creer_CSS();
    
    // localStorage.removeItem(texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_premiereExecution");// A DECOMMENTER POUR INITIALISER LES DONNES UTILISATEUR
    
    if (localStorage.getObj(texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_premiereExecution") != false) { // teste si l'utilisateur est à sa première exécution ou non
        var proprietesPlanetes_production = initialiserDonneesUtilisateur();
    } else {
        var proprietesPlanetes_production = localStorage.getObj(texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_proprietesPlanetes_production");
    }
    
    var url = location.href.split("page=")[1].split("&")[0].split("#")[0];
    if (url == "resources") { // si la page courante est la page 'ressources'
        // Récuperation des infos sur la planète courante 
        var infoPlanete = recuperer_infoPlaneteCourante();
        var productionPlaneteCourante = recuperer_productionCourante();
        
        if (infoPlanete[3] == "planet") { // teste si la planète courante n'est pas une lune
            // teste si la planète courante a déjà été enregistrée
            var existe = testPlaneteExiste(infoPlanete[0],proprietesPlanetes_production);
            if (existe == -1) { // si la planète n'existe pas dans la liste
                ajouterPlanete(infoPlanete,productionPlaneteCourante,proprietesPlanetes_production,"proprietesPlanetes_production");
                
            } else { // si la planète est déjà dans la liste
                if ((proprietesPlanetes_production[existe][0][1] != infoPlanete[1])
                    || (proprietesPlanetes_production[existe][0][2] != infoPlanete[2])
                    || (proprietesPlanetes_production[existe][1][0] != productionPlaneteCourante[0])
                    || (proprietesPlanetes_production[existe][1][1] != productionPlaneteCourante[1])
                    || (proprietesPlanetes_production[existe][1][2] != productionPlaneteCourante[2])) { // on test si les valeurs des productions+nom+emplacement ont changées
                    proprietesPlanetes_production[existe] = new Array(infoPlanete,productionPlaneteCourante);
                    localStorage.setObj(texte.script + "_" + pseudoJeu + "_" + universJeu + "_" + langue + "_proprietesPlanetes_production",proprietesPlanetes_production);
                    affichage_alerte(texte.alerte_proprietesModifiees);
                }
            }  
        }
    }
    
    if (url == "shop") setInterval(affichageInventaire,500);
    
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);