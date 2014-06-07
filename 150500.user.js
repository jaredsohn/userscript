// ==UserScript==
// @name       Expe-3000
// @namespace  http://userscripts.org/scripts/show/150500
// @version    3.12
// @description  Compte les expéditions
// @include    http://*.ogame.*/game/index.php?page=messages*
// @include    http://*.ogame.*/game/index.php?page=overview*
// @include    http://*.ogame.*/game/index.php?page=combatreport*
// @include    http://userscripts.org/scripts/show/150500
// @date       11 octobre 2012
// @author     nitneuc -- Libre d'être modifié ou reproduit, tant que cette ligne @author reste complète
// ==/UserScript==
/*
	**************************
	****** Informations ******
	**************************
	
	Expédition-3000:
	----------------
	http://userscripts.org/scripts/show/150500
	compatible : Firefox & Google chrome
	
	Variables persistantes stockées:
	--------------------------------
	*booléen=  texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution"
	*booléen=  texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2"
	*array=    texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message" (abandon)
	*string=   texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit"
	*array=    texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2"
	*objet=    texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur"
	*objet=    texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC" // ce sont les messages d'expédition dont le(s) RC correspondant attend(ent) d'être lu
	*array=    texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position"
	*string=   texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante" // sauvegarde de la version utilisée lors de la précédente exécution
	*array=	texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat"
	*number=	texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee"
	*array= 	texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user"
	NOTE: Procédure d'ajout d'une variable persistante
	1) Initialisation données utilisateur (installation)
	2) MAJV2
	3) MAJ (premier lancement)
	4) Début script
	5) Fin de tour
	
	Bugs connus:
	------------
	*Mauvaise reconnaissance des messages si ceux-cis s'affichent sur plusieurs pages ET que le temps passé sur une page est < 'config_user.delaiActualisation'
	*Si les variables 'conservationMessages' mal configuré, des messages faux peuvent apparaître
	*Parfois, le rapport d'expédition ne s'ajoute pas du premier coup (signalé v1.x)
	*Un nouveau RExp est mal reconnu si une fenêtre 'RC détaillé' est ouverte à côté
	*Les RExp ne s'ajoutent pas si une fenêtre RC détaillée est restée ouverte
	*nombre expé par jour abbérant pour un petit nombre d'expés enregistrées
		
	ChangeLog:
	----------
	
	v1:
	*première version stable
	
	v1.1:
	*Compatibilité Firefox
	*Corrections mineures
	
	v1.2:
	*Corrections mineures
	*Si consulter un RC détaillé n'apporte rien: alerte
	
	v1.3:
	*Correction bug: sonde non prise en compte
	*Ajout de mots-clés pour la détection des REx
	*Prise en charge d'éventuels bugs mots-clés
	
	v1.4:
	*Ajout de mots-clés
	*Quelques modifications interface/langue
	*Ajout d'un graphique des résultats
	
	v1.4.1:
	*Ajout d'un mot-clé
	
	v1.5:
	*Ajout d'un mot-clé
	*Correction d'un bug d'affichage
	
	v1.6:
	*Ajout d'un compteur du compteur
	
	v1.7:
	*Rétablissement de l'affichage après 'contentWrapper' en raisons de retours de bugs
	*Appel direct à la variable temporaire "liste_message" pour le compteur du compteur
	
	v1.7.1:
	*Réctification mineure
	
	v1.7.2:
	*Ajout d'un mot-clé
	
	v1.8:
	*Ajout d'une ligne 'trou noir' dans la table 'flotte'
	
	v1.9:
	*Ajout d'un spoiler
	
	v1.9.1:
	*Simplification du code du spoiler
	
	v1.10:
	*Structuration de l'appel du spoiler
	*Ajout du paramètre utilisateur 'spoilerDefault'
	*Ajout + correction de mots-clés
	*2 couleurs d'alerte
	*Ajout d'un message d'erreur pour les phrases inconnues
	
	v1.10.1:
	*Correction mineure
	
	v1.10.2:
	*Correction mineure
	
	v2:
	*Simplification de l'initialisation utilisateur
	*Modification du taux de refresh 'config_user.delaiActualisation' de 2000 à 1500ms
	*Affichage: Suppression vaisseaux gagnés pour EDLM,VC,Rcy
	*Affichage: Alternance couleurs lignes
	*Introduction de la variable 'config.conservationMessages'
	*Allègement données sauvegardées: division du tableau d'objets 'liste_message' en 3 variables persistantes
	*Allègement données sauvegardées: nettoyage systématique des données périmées 
	*correction date 1er message (correction rétrocompatible)
	*Ajout d'une fonction de MAJ v1->v2
	
	v2.1:
	*Ajout rubrique 'bugs connus'
	*Ajout d'une phrase-clé
	*Suppression variable 'etat'
	*Suppression bug affichage navigation pages 'message'
	
	v2.1.1:
	*modif mot-clé
	
	v2.2:
	*Modification du bouton 'spoiler' et restriction de son usage
	*Ajout d'un bouton interctif 'install'
	
	v2.2.1:
	*Arrangement initialisation
	*Externalisation des données textes restantes
	
	v2.2.2:
	*Ajout de purge_message_RC
	
	v2.3:
	*Ajout d'une console d'affichage
	
	v2.4:
	*Ajout de 2 boutons liens documentation
	*Graphisme des boutons
	
	v3:
	*Uniformisation des masquages
	*Ajout conservationMessages_marge
	*Ajout mot-clé
	*Correction bug console<>installation
	*Modification du taux de refresh 'config_user.delaiActualisation' de 1500 à 900ms
	*Ajout d'une interface utilisateur pour modifier les valeurs par défaut
	*Ajout de composés CSS
	
	v3.1:
	*Valeurs actuelles dans les options
	*Alerte si position épuisée
	*Correction texte mineure
	*%points gagnés ressources/flotte
	
	v3.2:
	*Mélange lvl1/lvl2 'alerte position épuisée' (manque infos)
	*Alerte 'phrase non reconnue' pour les 'alertes position épuisée'
	
	v3.3:
	*Modif texte
	*1000ème ligne dépassée !
	*Ajout mot-clé
	*Uniformisation des dates
	*Suppression dateFormatOgame2nombre() + Date.prototype.toNombre
	*Ajout 'points/j'
	*Correction bug bouton radio
	*Couleur fond noire 'graph' et 'options'
	*La fenêtre 'options' se ferme après changement
	*Ajout d'un bouton MAJ
	*Inclusion de la page userScript vec vérif MAJ
	*Mise en place d'une variable "versionCournte"
	*a=a+b -> a+=b
	
	v3.3.1:
	*Version test, suppr proto soustractionTables()
	
	v3.3.2:
	*Fonction debug changt de version
	*Affichage console pour config_user par default
	
	v3.3.3:
	*Remaniement complet de l'intro du script (detection version...)
	
	v3.4:
	*Modification fonctionnememnt options
	*Numéro de version dans le titre
	*BBCode
	
	v3.4.1:
	*Ajout texte mineur
	
	v3.4.2:
	*Ajout mot-clé
	
	v3.4.3:
	*Ajout mot-clé
	
	v3.5:
	*Ajout mot-clé
	*Prise en charge des items
	*Règlage auto délai conservation msg (détection commandant)
	*Ajout menu 'trou noir': y entrer détails flotte perdue
	*Suppression ligne 'flottes perdues trou noir'
	*Version courante dans BBCode
	*Ajustements divers
	
	v3.5.1:
	*Corrections mineure
	
	v3.6:
	*Option afficher/masquer table 'items'
	*Remaniement des commentaires et compactage du code
	*Correction titre graph
	*La 'table_secondaire' ne s'affiche plus au-dessous des options
	*Ajout d'une table positions visitées + adaptation/MAJ
	*Correction erreur d'affichage date
	*Si RC attend d'être ouvert, alerte s'affiche sur son entrée page 'messages'
	*Remplacement des 3 fonctions date+idExiste en une seule elementExiste
	*Extraction des couleurs des variables 'texte'
	*Extraction des coûts de vaisseaux des variables 'texte'
	*Gain par booster ajouté
	
	v3.7
	*Correction texte
	*Correction bugs affichage BBCode
	*Correction largeur liste_position
	*Modif séparateur milliers (confusion avec décimales)
	*Nouvelle stat: expé/jour
	*Nouvelle table de statistiques
	
	v3.8
	*Modification texte
	*Alerte 'RC détaillé inutile' décalé
	*Initiation fonction compatibilité 'RC détaillé dans fenêtre'
	
	v3.9:
	*Modification texte
	*Correction: des RExp ne s'affichaient pas comme 'à sauvegarder"
	*Compatibilité option 'RC détaillé dans fenêtre'
	*Modification aspect liste_position
	*La liste des position apparaît dans l'ordre (MAJ/ordonnement automatique/nettoyage de la liste)
	*Lien image bouton BBCode incorrect
	*L'affichage peut être écrit sous forme raccourcie pour les grands nombres
	*Bug sur page userscripts
	*Nouvelle stat: combat avec/sans perte
	*Nouvelle stat: zones épuisées
	
	v3.9.1:
	*Corrections ordonnement liste_position
	*Espace avant unité (k/m/g)
	*Corrections de texte
	
	v3.10:
	*Amélioration de l'ordonnement liste_positions
	*Changement de pseudo possible
	*Phrase clé ajoutée
	
	v3.11:
	*Ajout phrase clé
	
	v3.12:
	*Ajout phrase clé
	
	Projets
	-------
	*Requête HTTP userscripts => sortir du toString() => incompatibilité FF
	*'RC détaillé' en fenêtre: pas d'id pseudo
	*si comptes teste (par ex compteurExpe_testetest): toujours le problème de bas de page vue générale: problème: array.ordonner
	*%age combat avec/sans perte à arrondir
	
	*traduction à poursuivre
	*utiliser GM_info pour la version du script (voir topic 'script pour les nuls') chrome.x n'est pas reconnu (x= par exemple runtime)
	*bug manifest.json mal généré
	*proposer des sauvegardes quotidiennes/hebdo/mensuelles/anuelles/n jours paramétrables avec possibilité de restitution
	
	Traduction			 
	----------
	new Array("Small Cargo","S.Cargo"
	new Array("Large Cargo","L.Cargo"
	new Array("Light Fighter","L.Fighter"
	new Array("Heavy Fighter","H.Fighter"
	new Array("Cruiser","Cruiser"
	new Array("Battleship","Battleship"
	new Array("Colony ship","Col. Ship"
	new Array("Recycler","Recy."
	new Array("Espionage Probe","Esp.Probe"
	new Array("Bomber","Bomb."
	new Array("Destroyer","Destr."
	new Array("Death star","Death star"
	new Array("Battlecruiser","Battlecr."
	"aucun" "There was not even one small asteroid","expedition needed to be aborted","the expedition collapsed","unfortunately returned empty handed","didn't bring anything back","wasn't really successful","Nothing new could be obtained from the expedition","brings nothing thrilling back"
	new Array("pirates","9999CC","Pirates","primitive barbarians"),
	"aliens" "unknown species"
	"avance" "home earlier than expected"
	"retard" "longer than thought","As soon as the needed repair","return with a big delay","took quite some time","The return trip will take a bit longer","take a lot more time"
	new Array("ress_gain","Resources","FF99CC","You got Metal","You got Crystal","You got Deuterium"),
	"vaiss_gain" "The following ships are now part"
	"marchand" "with goods to trade to your worlds"
	"am" "You got Dark Matter"
	"trouNoir" "destroys the entire expedition","the fleet is never heard from again"
*/
var strFunc = (function(){		
	const version_courante = "3.12";
	
	// ************************
	// ****** Prototypes ******
	// ************************
	
    Number.prototype.ajoutSeparateurMilliers = function(car) {// v1: fonction ; v2: prototype ; v2.1: prise en charge des nombres négatifs ; v2.2: prise en charge des nombre décimaux
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
    
    Number.prototype.estPair = function() {
        return ((this/2) == Math.floor(this/2))?true:false;
	};
    
    Number.prototype.estEntier = function() {
        return (Math.round(this) == this)?true:false;
	};
	
	Number.prototype.arrondi_decimal = function(nbDec) {
		return Math.round(this*Math.pow(10,nbDec))/Math.pow(10,nbDec);
	};
	
	Number.prototype.toUniteRaccourci = function(nbDec) {
		if (this/1000 > 1) {
			var lettre = "k";
			var coeff = 1000;
		}
		if (this/1000000 > 1) {
			var lettre = "M";
			var coeff = 1000000;
		}
		if (this/1000000000 > 1) {
			var lettre = "G";
			var coeff = 1000000000;
		}
		return (this/coeff).arrondi_decimal(nbDec) +" "+ lettre;
	};
	
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj));
	};
    
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key));
	};
    
    String.prototype.charAt_multi = function(pos,long) {
        var str = "";
        for (var a=pos ; a<pos+long ; a++) str = str+ this.charAt(a);
        return str;
	};
    
    String.prototype.motSuivant = function(mot,carFinal) {
        if (this.indexOf(mot) == -1) return;
        var car = this.indexOf(mot)+mot.length+1;
        return this.charAt_multi(car,this.substr(car,30).indexOf(carFinal)); 
	};
    
    Array.prototype.somme = function() {
		var somme = 0;
        for (var tmp=0; tmp<this.length; tmp++) somme = somme + this[tmp];
		return somme;
	};
    
    Array.prototype.sommeBidirect = function() {
        var somme = 0;
        for (var tmp=0; tmp<this.length; tmp++) for (var tmp_2=0; tmp_2<this[tmp].length; tmp_2++) somme = somme + this[tmp][tmp_2];
        return somme;
	};
    
    Array.prototype.additionTables = function(table2) {
        var tableF = new Array();
        for (var tmp=0; tmp<this.length; tmp++) tableF[tmp] = this[tmp]+table2[tmp];
        return tableF;
	};
    
    Array.prototype.pourcentage = function(somme,nbDec) {
        var tableF = new Array();
        for (var tmp=0; tmp<this.length; tmp++) tableF[tmp] = (100*this[tmp]/somme).arrondi_decimal(nbDec);
		return tableF;
	};
    
    Array.prototype.cloner = function(table) {
        for (var tmp=0; tmp<table.length; tmp++) this[tmp] = table[tmp];
	};
    
	Array.prototype.insererLigne = function(el,nLigne) {
		for (var tmp=this.length-1; tmp>=nLigne; tmp--) this[tmp+1] = this[tmp];
		this[nLigne] = el;
	};
	
	Array.prototype.ordonner = function() { // prototype valable pour les tableaux imbriqués
		for (var tmp=0; tmp<this.length; tmp++) { // revue préliminaire de la liste
			if ((this[tmp] == null)||(this[tmp].length != 2)) this.splice(tmp,1);
			else {
				if (this[tmp][0].indexOf(":16") != -1) this[tmp][0] = this[tmp][0].split(":")[0] +"."+ this[tmp][0].split(":")[1];
			}
		}
		var tableI = new Array(); // Table intermédiaire contiendra les positions en fonrme entière
		for (var tmp=0; tmp<this.length; tmp++) tableI[tmp] = position2nombre(this[tmp][0]);
		var tableF = new Array();
		var tmpF = 0; // taille de tableF ; s'incrémente
		while (this.length>0) {	
			var positionMinimum = tableI.el2pos(tableI.minimum());
			tableF[tmpF] = this[positionMinimum];
			// Suppression des cellules rangées
			this.splice(positionMinimum,1);
			tableI.splice(positionMinimum,1);
			tmpF++;
		}
		return tableF;
	};
	
	Array.prototype.minimum = function() {
		var min = this[0];
		for (var tmp=0; tmp<this.length; tmp++) if (this[tmp]<min) min=this[tmp];
		return min;
	};
	
	Array.prototype.el2pos = function(el) { // renvoie la position du premier élément el trouvé
		for (var tmp=0; tmp<this.length; tmp++) if (this[tmp] == el) return tmp;
		return -1;
	};
	
	String.prototype.ajout0 = function() { // ajoute un 0 en début d'un nombre stringé pour qu'il ait 2 chiffres, si nécessaire
		return (this.length == 1)?"0"+this:this;
	};
	
	// ****************************
	// ****** Fonctions hard ******
	// ****************************
	
	function ressource2point(nb) {
		return Math.floor(nb/1000);
	}
	
	function elementExiste(table,el,supp) {
		for (var i=0 ; i<table.length ; i++) if (eval("table[i]" + supp) == el) return i;
		return -1;
	}
	
	function dateFormatOgame2date(date) { // transforme une date ogame au format objet 'Date'
		return new Date(date.split(".")[2].split(" ")[0], date.split(".")[1]-1, date.split(".")[0], date.split(" ")[1].split(":")[0], date.split(":")[1], date.split(":")[2]);
	}
	
	function date2dateFormatOgame(date) { // transforme une date format objet 'Date' en date ogame
		return (date.getDate()+"").ajout0() +"."+ (date.getMonth()+1+"").ajout0() +"."+ date.getFullYear() +" "+ (date.getHours()+"").ajout0() +":"+ (date.getMinutes()+"").ajout0() +":"+ (date.getSeconds()+"").ajout0();
	}
	
	function max_planete(table,n) { // fonction inventaireTools
		var table_temp = new Array();
		for (var tmp=0; tmp<table.length; tmp++) table_temp[tmp] = table[tmp][1][n];
		return max_array(table_temp);
	}
	
	function max_array(liste) { // fonction récupérée sur http://www.journaldunet.com/ ; fonction inventaireTools
		var max = liste[0];
		for (var i=0; i<liste.length; i++) if (liste[i]*1>max) max = liste[i];
		return max;
	}
	
	function jourActif() { // retourne le nombre de jours d'activité du script (entre  dateInit et aujourd'hui)
		return (((new Date()).getTime())-(dateFormatOgame2date(dateInit).getTime()))/86400000;
	}
	
	function position2nombre(pos) { // transforme une position de système solaire type x:y en entier
		return parseInt(pos.split(".")[0])*1000+parseInt(pos.split(".")[1]);
	}
	
	// ***********************************
	// ****** Fonctions d'affichage ******
	// ***********************************
	
	function afficher_formRExp() {
		var elHTML = document.getElementsByClassName("showmessage")[0];     
		var inner = elHTML.innerHTML;
		var ajoutHTML = '<div id="trouNoirParam" class="compteurExpe_tdPadding" align="center"><table class="compteurExpe_table2 compteurExpe_option"><tr><td>'+ texte.trouNoir +'</td></tr>';
		for (var i=0; i<vaisseau.length; i++) ajoutHTML+= '<tr><td>'+ vaisseau[i][0] + '</td><td><input type="text" id="trouNoir_vaiss'+i +'" value="0" size="4"/></td></tr>';
		ajoutHTML+= '<tr><td align="center"><input type="button" id="boutonValider_trouNoir" value="'+ texte.boutonValider_trouNoir +'"/></td></tr></table></div>';
		elHTML.innerHTML = inner + ajoutHTML;
		ecouteBouton_trouNoir();
	}
	
	function creer_CSS() { // ajoute des classes CSS
		var headDocument = document.getElementsByTagName("head")[0];
		var inner = headDocument.innerHTML;
		var ajoutHTML = '<style type="text/css">'
		+ '.compteurExpe_table1 { padding-bottom: 15px; width: 100%; }'
		+ '.compteurExpe_table2 { width:100%; border-width: 3px; border-style: double; border-color: #666666; background-color:' +config.valeur_bgColor +'; text-align: center; font-size:' +config.valeur_fontSize +'px ; }'
		+ '.compteurExpe_tdPadding { padding: 7px; }'
		+ '.compteurExpe_header1 { background-color:' +config.header1_bgColor +'; color:' +config.header1_fontColor +'; font-size:' +config.header1_fontSize +'px ; font-weight:' +config.header1_fontBold +'; font-family:' +config.header1_textType +'; text-align:' +config.header1_textAlign +'; }'       
		+ '.compteurExpe_header2 { background-color:' +config.header2_bgColor +'; color:' +config.header2_fontColor +'; font-size:' +config.header2_fontSize +'px ; font-weight:' +config.header2_fontBold +'; }'       
		+ '.compteurExpe_header1Ligne { text-align: left; padding-left: 3px; }'        
		+ '.compteurExpe_headerLigne { padding-left: 3px; background-color:' +config.headerLigne_bgColor +'; color:' +config.headerLigne_fontColor +'; font-size:' +config.headerLigne_fontSize +'px ; font-weight:' +config.headerLigne_fontBold +'; text-align:' +config.headerLigne_textAlign +'; }'
		+ '.compteurExpe_valeur { color:' +config.valeur_fontColor +'; font-weight:' +config.valeur_fontBold +'; }'
		+ '.compteurExpe_valeurBis { background-color:' +config.valeurBis_bgColor +'; }'
		+ '.compteurExpe_valeurTotal { background-color:' +config.valeurTotal_bgColor +'; color:' +config.valeurTotal_fontColor +'; font-size:' +config.valeurTotal_fontSize +'px ; font-weight:' +config.valeurTotal_fontBold +'; }'
		+ '.compteurExpe_alerte { color:' +config.alerte_fontColor +'; font-size:' +config.alerte_fontSize +'px ; font-weight:' +config.alerte_fontBold +'; text-align:' +config.alerte_textAlign +'; }'
		+ '.compteurExpe_alerteOK { background-color:' +config.alerteOK_bgColor +'; }'
		+ '.compteurExpe_alerteAtt { background-color:' +config.alerteAtt_bgColor +'; }'
		+ '.compteurExpe_alerteError { background-color:' +config.alerteError_bgColor +'; }'
		+ '.compteurExpe_console { padding-left: 5px; border-width: 1px; border-style: double; border-color: #FFFFFF ; color:' +config.console_fontColor +'; font-size:' +config.console_fontSize +'px ; font-weight:' +config.console_fontBold +'; font-family:' +config.console_textType +'; text-align:' +config.console_textAlign +'; }'
		+ '.compteurExpe_dateInit { background-color:' +config.dateInit_bgColor +'; color:' +config.dateInit_fontColor +'; font-size:' +config.dateInit_fontSize +'px ; font-weight:' +config.dateInit_fontBold +'; text-align:' +config.dateInit_textAlign +'; }'
		+ '.compteurExpe_option { padding-left: 3px; color:' +config.option_fontColor +'; font-size:' +config.option_fontSize +'px ; font-weight:' +config.option_fontBold +'; text-align: left; }'
		+ '.compteurExpe_bouton { width:'+ config.bouton_width +'; padding-left: 1px; }'
		+ '#compteurExpe_titre .compteurExpe_bouton { background-color:' +config.header1_bgColor +'; }'
		+ '#optionScript td { height:'+ config.option_hauteurLigne +'px ; }'
		+ '</style>';
		headDocument.innerHTML = inner+ ajoutHTML;
	}
	
	function creer_partieFixeTableaux(numTableau) {// Construction de la partie fixe tableaux affichés (les titres)
		// fabrique 4 variables globales chacune étant un tableau de 5 cases de la forme (x,y,header1,header2,headerLigne) où:   
		// x: int; le nombre de colonnes
		// y: int; le nombre de lignes
		// header1: string; le titre général du tableau
		// header2: tableau de string; les titres des colonnes
		// headerLigne: tableau de string; les titres des lignes
		if (numTableau == 1) { // Tableau 'Résultats'
			var fixe = new Array(3,14,texte.titre_h2_resultat,new Array(texte.titre_h3_resultat_resultat,texte.titre_h3_resultat_nombre,texte.titre_h3_resultat_pourct));
			fixe[4] = new Array();
			for (var i=0; i<param_resultat.length; i++) fixe[4][i] = param_resultat[i][1];
			fixe[4][11] = texte.titre_hLigne_resultat_total;
		}
		if (numTableau == 2) { // Tableau 'Flotte'
			var fixe = new Array(4,16,texte.titre_h2_flotte,new Array(texte.titre_h3_flotte_vaisseau,texte.titre_h3_flotte_gain,texte.titre_h3_flotte_perte,texte.titre_h3_flotte_solde));
			fixe[4] = new Array();
			for (var i=0; i<vaisseau.length; i++) fixe[4][i] = vaisseau[i][0];
			fixe[4][13] = texte.titre_hLigne_flotte_ressources;
		}
		if (numTableau == 3) { // Tableau 'Ressources'
			var fixe = new Array(2,6,texte.titre_h2_ressources,new Array(texte.titre_h3_ressources_ressource,texte.titre_h3_ressources_quantite));
			fixe[4] = new Array();
			for (var i=0; i<ressource.length; i++) fixe[4][i] = ressource[i];
			fixe[4][3] = texte.antiMatiere;
		}
		// Tableau 'Points'
		if (numTableau == 4) var fixe = new Array(3,5,texte.titre_h2_points,new Array(texte.titre_h3_points_domaine,texte.titre_h3_points_points,texte.titre_h3_points_pourct),new Array(texte.titre_hLigne_points_ressources,texte.titre_hLigne_points_flotte,texte.titre_hLigne_points_total));
		// Tableau 'Items'
		if (numTableau == 5) var fixe = new Array(5,8,texte.titre_h2_item,new Array(texte.titre_h3_item_nom,item_niv_texte[0],item_niv_texte[1],item_niv_texte[2],texte.titre_h3_item_gain),item_nom_texte);
		// Tableau 'Autres stats'
		if (numTableau == 6) var fixe = new Array(3,7,texte.titre_h2_divers,new Array(texte.titre_h3_divers_nom,texte.titre_h3_divers_nombre,texte.titre_h3_divers_pourct),new Array(texte.titre_hLigne_divers_resNeg,texte.titre_hLigne_divers_resNul,texte.titre_hLigne_divers_resPos,texte.titre_hLigne_divers_ptExp, texte.titre_hLigne_divers_zoneEpuisee));
		return fixe;
	}
	
	function affichage_alerte(texteAAfficher,elHTML,classType,identifiant) { // affiche alerte de confirmation ; le paramètre 'identifiant' est facultatif
		var inHTML = elHTML.innerHTML;
		var ajHTML = '<div id="'+ identifiant +'" class="compteurExpe_alerte '+ classType +'">' +texteAAfficher +'</div>';
		elHTML.innerHTML = ajHTML +inHTML;
	}
	
	function afficherAlerte_message() { // affiche les alertes sur les entrées page 'messages'
		var mail = document.getElementById("mailz").getElementsByClassName("entry trigger");
		if (mess_pageCourante == mail[0].getAttribute("id")) return; // si on a pas changé de page, retour
		mess_pageCourante = mail[0].getAttribute("id");
		for (var i=0; i<mail.length; i++) {
			var titreEntree = mail[i].getElementsByClassName("subject")[0].getElementsByClassName("dark_highlight_tablet")[0].innerHTML;
			var dateEntree = mail[i].getElementsByClassName("date")[0].innerHTML;
			//affichage_alerte(titreEntree,document.getElementById("boxBG"),"compteurExpe_alerteAtt");
			if (((titreEntree.indexOf(texte.rapport_expe) != -1)&&(elementExiste(liste_message_v2,dateEntree,"[1]") == -1))
			||((titreEntree.indexOf(texte.rapport_combat) != -1)&&(titreEntree.indexOf(":16]") != -1)&&(elementExiste(liste_message_RC,dateEntree,".date") != -1))) {
				affichage_alerte(texte.alerte_nonSauve,mail[i].getElementsByClassName("date")[0],"compteurExpe_alerteError"); // (l'entrée du message lue par le script est un rapport d'expédition ET qu'il n'est pas dans la liste sauvegardée) OU ( il est un RC d'expé ET ce RC d'expé est en attente de lecture)
			}
		}
	}
	
	function afficherTable() {
		compteur_v22tableaux(0);		
		var elHTML = document.getElementById("overviewBottom");     
		var inner = elHTML.innerHTML;
		var ajoutHTML = '<div align="center"><table class="compteurExpe_table1">'
		+ '<tr><td valign="top" class="compteurExpe_tdPadding">'
		+ '<table width="100%"><tr><td>'
		+ ecrireTableau(creer_partieFixeTableaux(1),compteur_v2.rapport_resultat,new Array(11,-1))
		+ '</td><td valign="top">'
		+ '<table width="100%"><tr><td class="compteurExpe_tdPadding">'
		+ ecrireTableau(creer_partieFixeTableaux(3),compteur_v2.rapport_ressources,new Array(-1,-1))
		+ '</td></tr><tr><td class="compteurExpe_tdPadding">'
		+ ecrireTableau(creer_partieFixeTableaux(4),compteur_v2.rapport_points,new Array(2,-1))
		+ '</td></tr></table></td></tr></table></td></tr>'
		+ '<tr><td id="compteurExpe_titre" class="compteurExpe_tdPadding"><table class="compteurExpe_table2"><tr><td colspan=2><table><tr><td id="boutonSpoiler" class="compteurExpe_bouton" valign="middle"><img title="'+texte.boutonSpoiler_title +'" src="'+ config.boutonSpoiler_url+ '"/></td>'
		+ '<td class="compteurExpe_header1" width="'+ (recuperer_CSSOgame_width()-2*config.bouton_width-100) +'px">'+ texte.titre_h1_rapport + '<td class="compteurExpe_dateInit" width="100px">'+ texte.version+' '+ version_courante+'</td></td>'
		+ '<td id="boutonOption" class="compteurExpe_bouton" valign="middle"><img title="'+texte.boutonOption_title +'" src="'+ config.boutonOption_url+ '"/></td></tr></table></td></tr>'
		+ '<tr><td class="compteurExpe_dateInit" width="'+ (100-config.console_width) +'%">'+ texte.titre_h1_sousTitre + dateInit +'</td>'
		+ '<td id="compteurExpe_console" style="background-color:'+ config.console_bgColor +'" class="compteurExpe_console" width="'+ config.console_width +'%">'+ texte.console_base +'</td>'
		+ '</tr></table></td></tr></table></div><div id="espace_contenuSpoiler"></div>';
		elHTML.innerHTML = inner + ajoutHTML;
		(config_user.spoilerDefault)?afficherTable_secondaire():ecouteBouton_option();
	}
	
	function afficherTable_secondaire(){
		compteur_v22tableaux(1);
		var elHTML_2 = document.getElementById("espace_contenuSpoiler");     
		var inner_2 = elHTML_2.innerHTML;
		var ajoutHTML_2 = '<div align="center" id="contenuSpoiler"><table class="compteurExpe_table1"><tr><td class="compteurExpe_tdPadding">'
		+ ecrireTableau(creer_partieFixeTableaux(2),compteur_v2.rapport_flotte,new Array(-1,3))
		+ '</td></tr>';
		if (config_user.itemVisible) {
			ajoutHTML_2 += '<tr><td class="compteurExpe_tdPadding">'
			+ ecrireTableau(creer_partieFixeTableaux(5),compteur_v2.rapport_item,new Array(-1,-1))
			+ '</td></tr>';
		}
		ajoutHTML_2 += '<tr><td class="compteurExpe_tdPadding">'
		+ ecrireTableau(creer_partieFixeTableaux(6),compteur_v2.rapport_divers,new Array(-1,-1))
		+ '</td></tr><tr><td class="compteurExpe_tdPadding"><table class="compteurExpe_table2"><tr><td><img src="'+ creer_graphique_img() +'"/></td><td>';
		if ((liste_position != null)||(issue_combat.somme() != 0)) { // Partie de droite
			ajoutHTML_2 += '<div align="left" style="height:'+ config.graph_img_h +'px; width:'+ Math.floor((recuperer_CSSOgame_width()-config.graph_img_w)*.7) +'px; overflow:auto; margin-right:10px;">';
			
			if (liste_position != null) { // Liste des positions
				ajoutHTML_2 += '<table width="100%">'; // largeur du cadre = (largeur bande (donnée ogame) - largeur image google )*70%
				var somm=0;
				for (var i=0; i<liste_position.length; i++) {
					ajoutHTML_2 += '<tr><td align="left">'+ liste_position[i][0] +'</td><td align="right">'+ liste_position[i][1] +' '+ texte.liste_position_expedition;
					if (liste_position[i][1] > 1) ajoutHTML_2 += 's';
					ajoutHTML_2 += '</td></tr>';
					somm += liste_position[i][1];
				}
				var expeNonRep = parseInt(compteur_v2.rapport_resultat[0][compteur_v2.rapport_resultat[0].length-1])-somm;
				if (expeNonRep != 0) {
					ajoutHTML_2 += '<tr><td colspan=2>('+ expeNonRep +' '+ texte.liste_position_nonRep;
					if (expeNonRep > 1) ajoutHTML_2 += 's';
					ajoutHTML_2 += ')</td></tr>';
				}
				ajoutHTML_2 += '<tr><td colspan=2><hr size=1></td></tr></table>';
			}
			
			if (issue_combat.somme() != 0) { // Issues des combats
				var combatNonRep = compteur_v2.rapport_resultat[0][1]+compteur_v2.rapport_resultat[0][2]-issue_combat.somme(); // Les combats sauvegardés avant la MAJ de ce tableau sont considérés comme non listés
				
				ajoutHTML_2 += issue_combat[0] +' '+ texte.issue_combat_combat;
				if (issue_combat[0] > 1) ajoutHTML_2 += 's';
				ajoutHTML_2 += ' '+ texte.issue_combat_0perte +' ('+ (100*(issue_combat[0]/issue_combat.somme()))+ '%)<br>';
				ajoutHTML_2 += issue_combat[1] +' '+ texte.issue_combat_combat;
				if (issue_combat[1] > 1) ajoutHTML_2 += 's';
				ajoutHTML_2 += ' '+ texte.issue_combat_perte +' ('+ (100*(issue_combat[1]/issue_combat.somme()))+ '%)<br>';
				ajoutHTML_2 += issue_combat.somme() +' '+ texte.issue_combat_combat;
				if (issue_combat.somme() > 1) ajoutHTML_2 += 's';
				ajoutHTML_2 += ' '+ texte.issue_combat_total +'<br>';
				ajoutHTML_2 += '('+ combatNonRep +' '+ texte.issue_combat_nonRep;
				if (combatNonRep > 1) ajoutHTML_2 += 's';
				ajoutHTML_2 += ')';
			}
			ajoutHTML_2 += '</div>';
		}
		
		ajoutHTML_2 += '</td></tr></table></td></tr></table></div>';
		elHTML_2.innerHTML = inner_2 + ajoutHTML_2;
		ecouteBouton_option();
	}
	
	function creer_graphique_img() {
		var codeGraph = 'http://chart.apis.google.com/chart?cht=p&chf=bg,s,efefef00&chs='+ config.graph_img_w +'x'+ config.graph_img_h +'&chld=M&&chtt='+ texte.graphGoogle_titre +' ('+compteur_v2.rapport_resultat[0][compteur_v2.rapport_resultat[0].length-1] +')&chl=';
		// Paramètres du graphique
		var ajoutHTML_2_1 = ""; // Légende
		var ajoutHTML_2_2 = ""; // Couleurs
		var ajoutHTML_2_3 = ""; // Valeurs
		for (var i=0; i<param_resultat.length; i++) {
			ajoutHTML_2_1 += param_resultat[i][1] +'%20';
			ajoutHTML_2_2 += param_resultat_color[i];
			ajoutHTML_2_3 += compteur_v2.rapport_resultat[1][i];
			if (i != param_resultat.length-1) {
				ajoutHTML_2_1 += '|';
				ajoutHTML_2_2 += ',';
				ajoutHTML_2_3 += ',';
			}
		}
		codeGraph += ajoutHTML_2_1 +'&chco='+ ajoutHTML_2_2 +'&chd=t:'+ ajoutHTML_2_3;
		return codeGraph;	
	}
	
	function creer_graphique_txt() {
		var codeGraph = '[color=#FFFFFF][size='+ config.BBCode_valeur_fontSize +'][b]';
		for (var i=0; i<param_resultat.length; i++) {
			codeGraph += '[color=#FF'+ ((i*9)+'').ajout0()+ '00]'; // .ajout0() pour que le 0 s'affiche 00
			for (var j=0; j<config.graph_txt_w*(compteur_v2.rapport_resultat[1][i]/100) ; j++) codeGraph += "█";
			codeGraph += '[/color] '+param_resultat[i][1] +' - '+ compteur_v2.rapport_resultat[0][i] +'\n';
		}
		codeGraph += '[/b][/size][/color]';
		return codeGraph;
	}
	
	function afficherOption() {
		var elHTML_3 = document.getElementById("overviewBottom");     
		var inner_3 = elHTML_3.innerHTML;
		var ajoutHTML_3 = '<div id="optionScript" class="compteurExpe_tdPadding" align="center"><table class="compteurExpe_table2 compteurExpe_option"><tr><td>'+ texte.option_nbDec +'</td><td><input type="text" id="option_nbDec" size="2" maxlength="1" value="'+ config_user.nbDec +'"/></td></tr>'
		+ '<tr><td>'+ texte.option_delaiActualisation +'</td><td><input type="text" id="option_delaiActualisation" value="'+ config_user.delaiActualisation +'"/></td></tr>'
		+ '<tr><td>'+ texte.option_spoilerDefault +'</td><td><input type="radio" value="true" name="option_spoilerDefault" id="option_spoilerDefault_aff"/><label for="option_spoilerDefault_aff">'+ texte.option_spoilerDefault_aff +'</label>'
		+ '<input type="radio" value="false" name="option_spoilerDefault" id="option_spoilerDefault_mas"/><label for="option_spoilerDefault_mas">'+ texte.option_spoilerDefault_mas +'</label></td></tr>'
		+ '<tr><td>'+ texte.option_itemVisible +'</td><td><input type="radio" value="true" name="option_itemVisible" id="option_itemVisible_aff"/><label for="option_itemVisible_aff">'+ texte.option_itemVisible_aff +'</label>'
		+ '<input type="radio" value="false" name="option_itemVisible" id="option_itemVisible_mas"/><label for="option_itemVisible_mas">'+ texte.option_itemVisible_mas +'</label></td></tr>'
		+ '<tr><td>'+ texte.option_conservationMessages_marge +'</td><td><input type="text" id="option_conservationMessages_marge" value="'+ config_user.conservationMessages_marge +'"/></td></tr>'
		+ '<tr><td>'+ texte.option_uniteRaccourci +'</td><td><input type="radio" value="true" name="option_uniteRaccourci" id="option_uniteRaccourci_complet"/><label for="option_uniteRaccourci_complet">'+ texte.option_uniteRaccourci_complet +'</label>'
		+ '<input type="radio" value="false" name="option_uniteRaccourci" id="option_uniteRaccourci_racc"/><label for="option_uniteRaccourci_racc">'+ texte.option_uniteRaccourci_racc +'</label></td></tr>'
		+ '<tr><td>'+ texte.option_uniteRaccourci_seuil +'</td><td><input type="radio" value="k" name="option_uniteRaccourci_seuil" id="option_uniteRaccourci_seuil_k"/><label for="option_uniteRaccourci_seuil_k">'+ texte.option_uniteRaccourci_seuil_k +'</label>'
		+ '<input type="radio" value="m" name="option_uniteRaccourci_seuil" id="option_uniteRaccourci_seuil_m"/><label for="option_uniteRaccourci_seuil_m">'+ texte.option_uniteRaccourci_seuil_m +'</label>'
		+ '<input type="radio" value="g" name="option_uniteRaccourci_seuil" id="option_uniteRaccourci_seuil_g"/><label for="option_uniteRaccourci_seuil_g">'+ texte.option_uniteRaccourci_seuil_g +'</label>	</td></tr>'
		+ '<tr><td align="center"><input type="button" id="boutonValider" value="'+ texte.boutonValider +'"/></td></tr>'
		+ '<tr><td>'+ texte.boutonBBCode_title + '</td><td id="boutonBBCode" class="compteurExpe_bouton" valign="middle"><img title="'+texte.boutonBBCode_title +'" src="'+ config.boutonBBCode_url+ '"/></td></tr>'
		+ '<tr><td>'+ texte.boutonForum_title +'</td><td class="compteurExpe_bouton" valign="middle"><a href="'+ config.boutonForum_lien +'" target="_blank"><img title="'+texte.boutonForum_title +'" src="'+ config.boutonForum_url+ '"/></a></td></tr>'            
		+ '<tr><td>'+ texte.boutonUserScripts_title +'</td><td class="compteurExpe_bouton" valign="middle"><a href="'+ config.boutonUserScripts_lien +'" target="_blank"><img title="'+texte.boutonUserScripts_title +'" src="'+ config.boutonUserScripts_url+ '"/></a></td></tr>'
		+ '<tr><td>'+ texte.boutonMAJ_title + '</td><td class="compteurExpe_bouton" valign="middle"><a href="'+ config.boutonMAJ_lien +'"><img title="'+texte.boutonMAJ_title +'" src="'+ config.boutonMAJ_url+ '"/></a></td></tr>'
		+ '<tr><td>'+ texte.boutonDefault_title + '</td><td id="boutonDefault" class="compteurExpe_bouton" valign="middle"><img title="'+texte.boutonDefault_title +'" src="'+ config.boutonDefault_url+ '"/></td></tr>'
		+ '<tr><td>'+ texte.boutonInstall_title + '</td><td id="boutonInstall" class="compteurExpe_bouton" valign="middle"><img title="'+texte.boutonInstall_title +'" src="'+ config.boutonInstall_url+ '"/></td></tr></table></div>';
		elHTML_3.innerHTML = inner_3 + ajoutHTML_3;
		// checked par défaut
		(config_user.spoilerDefault) ? document.getElementById("option_spoilerDefault_aff").setAttribute("checked","checked") : document.getElementById("option_spoilerDefault_mas").setAttribute("checked","checked");
		(config_user.itemVisible) ? document.getElementById("option_itemVisible_aff").setAttribute("checked","checked") : document.getElementById("option_itemVisible_mas").setAttribute("checked","checked");
		(config_user.uniteRaccourci) ? document.getElementById("option_uniteRaccourci_complet").setAttribute("checked","checked") : document.getElementById("option_uniteRaccourci_racc").setAttribute("checked","checked");
		document.getElementById("option_uniteRaccourci_seuil_"+ config_user.uniteRaccourci_seuil).setAttribute("checked");
		ecouteBouton_option();
	}
	
	function afficher_BBCode() {
		var elHTML_4 = document.getElementById("overviewBottom");  
		var inner_4 = elHTML_4.innerHTML;
		var ajoutHTML_4 = '<div id="BBCode" class="compteurExpe_tdPadding" align="center"><table width="100%" class="compteurExpe_table2 compteurExpe_option compteurExpe_tdPadding"><tr><td>'+ texte.option_BBCode +'<br><textarea name="BBCode" cols="'+ config.option_BBCode_textArea_w +'" rows="'+ config.option_BBCode_textArea_h +'">'+ ecrireBBCode() +'</textarea></td></tr>'
		+ '<tr><td><table width="100%"><tr><td>'+ texte.option_BBCode_titre +'</td>'
		+ '<td><label for="option_BBCode_titre_pseudo">'+ texte.option_BBCode_titre_pseudo +'</label></td><td><input type="checkbox" value="pseudo" id="option_BBCode_titre_pseudo"/>'
		+ '<td><label for="option_BBCode_titre_uni">'+ texte.option_BBCode_titre_uni +'</label></td><td><input type="checkbox" value="uni" id="option_BBCode_titre_uni"/>'
		+ '<td><label for="option_BBCode_titre_langue">'+ texte.option_BBCode_titre_langue +'</label></td><td><input type="checkbox" value="langue" id="option_BBCode_titre_langue"/></td></tr></table>'
		+ '<tr><td>'+ texte.option_BBCode_perso +'<br><textarea id="option_BBCode_perso" cols="'+ config.option_BBCode_textArea_w +'" rows="'+ config.option_BBCode_textArea_perso_h +'">'+ config_user.option_BBCode_perso +'</textarea></td></tr>'
		+ '<tr><td><table width="100%"><tr><td>'+ texte.option_BBCode_perso_place +'</td><td><input type="radio" value="haut" name="option_BBCode_perso_place" id="option_BBCode_perso_place_haut"/><label for="option_BBCode_perso_place_haut">'+ texte.option_BBCode_perso_place_haut +'</label></td>'
		+ '<td><input type="radio" value="bas" name="option_BBCode_perso_place" id="option_BBCode_perso_place_bas"/><label for="option_BBCode_perso_place_bas">'+ texte.option_BBCode_perso_place_bas +'</label></td>'
		+ '<td><input type="radio" value="mas" name="option_BBCode_perso_place" id="option_BBCode_perso_place_mas"/><label for="option_BBCode_perso_place_mas">'+ texte.option_BBCode_perso_place_mas +'</label></td></tr></table></td></tr>'
		+ '<tr><td align="center"><input type="button" id="boutonValider_BBCode" value="'+ texte.boutonValider_BBCode +'"/></td></tr>'
		+ '</table></div>';
		elHTML_4.innerHTML = inner_4 + ajoutHTML_4;
		// checked par défaut
		if (config_user.option_BBCode_titre_pseudo) document.getElementById("option_BBCode_titre_pseudo").setAttribute("checked");
		if (config_user.option_BBCode_titre_uni) document.getElementById("option_BBCode_titre_uni").setAttribute("checked");
		if (config_user.option_BBCode_titre_langue) document.getElementById("option_BBCode_titre_langue").setAttribute("checked");
		document.getElementById("option_BBCode_perso_place_"+ config_user.option_BBCode_perso_place).setAttribute("checked");
		ecouteBouton_option();
	}
	
	function effacerContenu(idAEffacer) {
		var table_secondaire = document.getElementById(idAEffacer);
		table_secondaire.parentNode.removeChild(table_secondaire);
	}
	
	function ecouteBouton_option() { // attente action utilisateur sur les boutons
		document.getElementById("boutonSpoiler").addEventListener("click",function() {
			(document.getElementById("contenuSpoiler")) ? effacerContenu("contenuSpoiler") : afficherTable_secondaire();
		},false);    
		document.getElementById("boutonOption").addEventListener("click",function() {            
			(document.getElementById("optionScript")) ? effacerContenu("optionScript") : afficherOption();
		},false);
		if (document.getElementById("boutonInstall")) document.getElementById("boutonInstall").addEventListener("click",function() { // ecoute bouton si ce bouton est affiché
			modifierConsole(config.alerteError_bgColor,texte.console_installDebut);
			((confirm(texte.confirm_Install))&&(confirm(texte.confirm_Install_2))) ? initialiserDonneesUtilisateur() : modifierConsole(config.alerteError_bgColor,texte.console_installAnnulee);  // les 2 clics de confirmation   
		},false);
		if (document.getElementById("boutonValider")) document.getElementById("boutonValider").addEventListener("click",function(){
			modifier_config(new Array(option_nbDec.value, option_delaiActualisation.value, interpreter_boutonRadio(new Array(option_spoilerDefault_aff, option_spoilerDefault_mas)), option_conservationMessages_marge.value, interpreter_boutonRadio(new Array(option_itemVisible_aff, option_itemVisible_mas)), interpreter_boutonRadio(new Array(option_uniteRaccourci_complet, option_uniteRaccourci_racc)), interpreter_boutonRadio(new Array(option_uniteRaccourci_seuil_k, option_uniteRaccourci_seuil_m, option_uniteRaccourci_seuil_g))));
			effacerContenu("optionScript");
		},false);
		if (document.getElementById("boutonDefault")) document.getElementById("boutonDefault").addEventListener("click",function() {
			modifierConsole(config.alerteError_bgColor,texte.console_optionDebut);
			if (confirm(texte.confirm_default)) {
				default_config();
				liste_position = liste_position.ordonner();
				localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position",liste_position);
				modifierConsole(config.alerteOK_bgColor,texte.console_optionFin);
				effacerContenu("optionScript");
			} else modifierConsole(config.alerteError_bgColor,texte.console_optionAnnulee);
		},false);
		if (document.getElementById("boutonValider_BBCode")) document.getElementById("boutonValider_BBCode").addEventListener("click",function(){ // ecoute bouton si ce bouton est affiché
			modifier_config(new Array("","","","","","","",
			interpreter_boutonCheckbox(new Array(option_BBCode_titre_pseudo,option_BBCode_titre_uni,option_BBCode_titre_langue)),
			interpreter_boutonRadio(new Array(option_BBCode_perso_place_haut,option_BBCode_perso_place_bas,option_BBCode_perso_place_mas)),
			document.getElementById("option_BBCode_perso").value));
			effacerContenu("BBCode");
		},false);
		if (document.getElementById("boutonBBCode")) document.getElementById("boutonBBCode").addEventListener("click",function(){
			(document.getElementById("BBCode")) ? effacerContenu("BBCode") : afficher_BBCode();
		},false);
	}
	
	function ecouteBouton_trouNoir() {
		document.getElementById("boutonValider_trouNoir").addEventListener("click",function() {
			for (var tmp=0; tmp<compteur_v2.vaiss_perte.length; tmp++) compteur_v2.vaiss_perte[tmp] += parseInt(document.getElementById("trouNoir_vaiss"+tmp).value);
			effacerContenu("trouNoirParam");
			affichage_alerte(texte.alerte_trouNoirParam,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteOK");     
		},false);
	}
	
	function ecrireTableau(fixe,contenu,lTotal) { // fixe est d'un format particulier, renvoyé par la fonction 'creer_partieFixeTableaux' ; lTotal est le numéro de ligne ou de colonne à marquer de la classe 'compteurExpe_valeurTotal', array de 2 cases
		var code = '<table class="compteurExpe_table2 compteurExpe_valeur"><tr><td colspan="'+fixe[0]+'" class="compteurExpe_header2">'+ fixe[2] +'</td></tr><tr>';
		for (var i=0; i<fixe[3].length; i++) {
			code += '<td class="compteurExpe_header2';
			if (i == 0) code += ' compteurExpe_header1Ligne';
			code += '">' + fixe[3][i]+ '</td>';
		}
		for (var i=0; i<fixe[4].length; i++) {
			for (var j=0; j<fixe[3].length; j++) {
				if (j == 0) {
					code += '<tr><td class="compteurExpe_headerLigne';
					if (!i.estPair()) code += ' compteurExpe_valeurBis';
					if (i == lTotal[0]) code += ' compteurExpe_valeurTotal';
					code += '">' +fixe[4][i] +'</td>';
					} else {
					code += '<td';
					if ((i == lTotal[0])||(j == lTotal[1])) code += ' class="compteurExpe_valeurTotal"';
					if (!i.estPair()) code += ' class="compteurExpe_valeurBis"';
					if (typeof contenu[j-1][i] != "number") {
						code += '>'+ contenu[j-1][i] +'</td>';
						} else { 
						code += '>';
						if ((config_user.uniteRaccourci)
						&&(((config_user.uniteRaccourci_seuil == "k")&&(contenu[j-1][i]>=1000))
						||((config_user.uniteRaccourci_seuil == "m")&&(contenu[j-1][i]>=1000000))
						||((config_user.uniteRaccourci_seuil == "g")&&(contenu[j-1][i]>=1000000)))) {
							code += contenu[j-1][i].toUniteRaccourci(config_user.nbDec) +'</td>';
							} else {
							code += contenu[j-1][i].ajoutSeparateurMilliers(config.separateurMilliers) +'</td>';
						}
					}
				}
			}
			code += '</tr>';
		}
		code += '</tr></table>';
		return code;
	}
	
	function ecrireBBCode() {
		var BBCode = '[align=center][size='+ config.BBCode_intro_fontSize +'][color=#FF9900][b]Rapport expéditions';
		if (config_user.option_BBCode_titre_pseudo) BBCode += ' de [color=#FFFF00]'+ pseudoJeu +'[/color]';
		if (config_user.option_BBCode_titre_uni) BBCode += ', univers [color=#FFFF00]'+ universJeu +'[/color]';
		if (config_user.option_BBCode_titre_langue) {
			BBCode += '[color=#FFFF00]';
			if (config_user.option_BBCode_titre_uni) BBCode += '.'+ langue +'[/color]';
			else BBCode += ', ogame.'+ langue +'[/color]';
		}
		BBCode += '[/b][/color][/size][/align]\n';
		
		if (config_user.option_BBCode_perso_place == "haut") BBCode += config_user.option_BBCode_perso;
		BBCode += ecrireTableau_BBCode(creer_partieFixeTableaux(1),compteur_v2.rapport_resultat,new Array(11,-1)) +'\n'
		+ creer_graphique_txt() +'\n'
		+ ecrireTableau_BBCode(creer_partieFixeTableaux(3),compteur_v2.rapport_ressources,new Array(-1,-1))
		+ ecrireTableau_BBCode(creer_partieFixeTableaux(4),compteur_v2.rapport_points,new Array(2,-1))
		+ ecrireTableau_BBCode(creer_partieFixeTableaux(2),compteur_v2.rapport_flotte,new Array(-1,3))
		+ ecrireTableau_BBCode(creer_partieFixeTableaux(5),compteur_v2.rapport_item,new Array(-1,-1))
		+ ecrireTableau_BBCode(creer_partieFixeTableaux(6),compteur_v2.rapport_divers,new Array(-1,-1))
		+ '\n\n[size='+ config.BBCode_valeur_fontSize +'][color=#3333FF]Première expédition comptabilisée le [color=#3399FF]'+ dateInit +'[/color][/color][/size]\n';
		if (config_user.option_BBCode_perso_place == "bas") BBCode += config_user.option_BBCode_perso +'\n';
		BBCode += '[size='+ config.BBCode_conclu_fontSize +'][color=#FF9900]BBCode généré le: [color=#FFFF00]'+ date2dateFormatOgame(new Date()) +'[/color] '
		+ 'par le script [url="'+ config.boutonForum_lien +'"][u][color=#FFFF00]'+ texte.script_texte +' v'+ version_courante +'[/color][/u][/url][/color][/color][/size]';
		return BBCode;
	}
	
	function ecrireTableau_BBCode(fixe,contenu,lTotal) {
		var code = '[color='+ config.header2_fontColor +'][align=center][size='+ config.BBCode_header_fontSize +'][u]'+ fixe[2] +'[/u][/size][/align]\n';
		for (var i=0; i<fixe[3].length; i++) {
			code += fixe[3][i];
			if (i != fixe[3].length-1) code += config.BBCode_separateur;
		}
		code += '[/color]\n[size='+ config.BBCode_valeur_fontSize +'][color='+ config.BBCode_separation_fontColor +']';
		for (var j=0; j<fixe[3].length; j++) code += '----------------';
		code += '\n[/color][color='+ config.valeur_fontColor +']';
		for (var i=0; i<fixe[4].length; i++) {
			for (var j=0; j<fixe[3].length; j++) {
				if (j == 0) {
					code += (i == lTotal[0]) ? '[color='+ config.valeurTotal_fontColor +'][b]' : '[color='+ config.headerLigne_fontColor +']';
					code += fixe[4][i];
					if (i == lTotal[0]) code += '[/b]';
					code += config.BBCode_separateur +'[/color]';
					} else {
					code += ((i == lTotal[0])||(j == lTotal[1])) ? '[color='+ config.valeurTotal_fontColor +'][b]' : '[color=#33'+ j*33 +'FF]';
					code += (typeof contenu[j-1][i] == "number") ? contenu[j-1][i].ajoutSeparateurMilliers(config.separateurMilliers) : contenu[j-1][i];
					if (j != fixe[3].length-1) code += config.BBCode_separateur; // on affiche pas le séparateur dans la dernière colonne des tables
					if ((i == lTotal[0])||(j == lTotal[1])) code += '[/b]';
					code += '[/color]';
				}
			}
			code += '\n';
		}
		code += '[/size]';
		return code;
	}
	
	function modifierConsole(couleur,texte) { // l'attribut style et le contenu inner du td 'console' sont modifiés ici
		if (document.getElementById("compteurExpe_console")) { // la console se modifie seulement si elle est affiché (of course !!)
			var consoleTmp = document.getElementById("compteurExpe_console");
			consoleTmp.setAttribute("style","background-color:"+ couleur);
			consoleTmp.innerHTML = texte;  
		}
	}
	
	// ***********************************
	// ****** Construction d'objets ******
	// ***********************************
	
	function messageExpe(contenu) { // construction de l'objet 'messageExpe'
		this.id = contenu.getAttribute("data-message-id");
		this.date = recuperer_enTete_message(3);
		this.coord = recuperer_enTete_message(2).split("[")[1].split("]")[0];
		this.coord = this.coord.split(":")[0] + "." + this.coord.split(":")[1];
		
		var contenu_texte = contenu.getElementsByClassName("note")[0].innerHTML;
		this.mess_sonde = message_sonde(contenu_texte); // mess_sonde est un entier, + élevé = + alerte élevée
		
		for (var i=0; i<param_resultat.length; i++) for (var j=2; j<param_resultat[i].length; j++) if (contenu_texte.indexOf(param_resultat[i][j]) != -1) this.resultat = param_resultat[i][0]; // recherche du type d'expédition par les mots clefs du message
		
		if (this.resultat == param_resultat[6][0]) {
			this.vaiss_gain = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0); // recherche de vaisseaux gagnés
			for (var i=0; i<vaisseau.length; i++) if (contenu_texte.indexOf(vaisseau[i][0]) != -1) this.vaiss_gain[i] = parseInt(contenu_texte.motSuivant(vaisseau[i][0],"<").replace(reg_nonNum,""));
		}
		if (this.resultat == param_resultat[5][0]) {
			this.ress_gain = new Array(0,0,0); // recherche de ressources gagnées
			for (var i=0; i<=ressource.length; i++) if (contenu_texte.indexOf(ressource[i]) != -1)  this.ress_gain[i] = parseInt(contenu_texte.motSuivant(ressource[i],"<").replace(reg_nonNum,""));
		}
		if (this.resultat == param_resultat[8][0]) this.am_gain = parseInt(contenu_texte.motSuivant(texte.am,"<").replace(reg_nonNum,""));
		
		if (this.resultat == param_resultat[10][0]) {
			this.item = new Array(new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0));
			var nom = -1;
			var niv = -1;
			for (var i=0; i<item_nom.length; i++) if (contenu_texte.indexOf(item_nom[i]) != -1) nom = i;
			for (var i=0; i<item_niv.length; i++) if (contenu_texte.indexOf("en "+ item_niv[i]) != -1) niv = i; // obligé d'ajouter 'en ' pour ne pas confondre 'or' avec des mots contenant 'or'
			if ((nom != -1)&&(niv != -1)) this.item[nom][niv] += 1;
			else delete this.resultat; // si l'un des éléments (ni=om ou niv) n'a pas été reconnu, pour que la fonction 'parcours_message' le considère comme 'message non reconnu'
		}
	}
	
	function messageExpe_RC(message) { // construction de l'objet 'messageExpe_RC' ; l'objet 'messageExpe' correspondant est passé en paramètre ; au moment de la construction de l'objet, les RC n'ont pas été consultés ; Le paramètre 'ress_vaiss_perte' sera construit plus tard ; 'vaiss_perte ne sera jamais construit car cet objet sera supprimé dès que l'user consultera la page 'RC détaillé'
		this.id = message.id;
		this.date = message.date;
		this.resultat = message.resultat;
	}
	
	function compteurExpe(liste) { // construction de l'objet compteurExpe ; Intitialisation des sommes
		this.resultat = new Array(0,0,0,0,0,0,0,0,0,0,0);
		this.am_gain = 0;
		this.ress_gain = new Array(0,0,0);
		this.vaiss_gain = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
		this.vaiss_perte = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
		this.ress_vaiss_perte = 0;
		this.item = new Array(new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0));
		this.ress_item_gain = new Array(0,0,0);
	}
	
	function incrementation_compteur_v2(compteurIncr,donnee) { // v2 ; Etant impossible d'appliquer correctement des méthodes à un objet sorti d'une variable persistante par la méthode JSON, c'est une fonction qui est chargée d'incrémenter le compteur
		for (var j=0; j<param_resultat.length; j++) if (donnee.resultat == param_resultat[j][0]) compteurIncr.resultat[j]++;        
		if (donnee.resultat == param_resultat[8][0]) compteurIncr.am_gain = compteurIncr.am_gain+donnee.am_gain;
		if (donnee.resultat == param_resultat[5][0]) compteurIncr.ress_gain = compteurIncr.ress_gain.additionTables(donnee.ress_gain);
		if (donnee.resultat == param_resultat[6][0]) compteurIncr.vaiss_gain = compteurIncr.vaiss_gain.additionTables(donnee.vaiss_gain);
		if (typeof donnee.vaiss_perte != "undefined") compteurIncr.vaiss_perte = compteurIncr.vaiss_perte.additionTables(donnee.vaiss_perte);
		if (typeof donnee.ress_vaiss_perte != "undefined") compteurIncr.ress_vaiss_perte = compteurIncr.ress_vaiss_perte+donnee.ress_vaiss_perte;
		if (donnee.resultat == param_resultat[10][0]) {
			for (var j=0; j<compteurIncr.item.length; j++) compteurIncr.item[j] = compteurIncr.item[j].additionTables(donnee.item[j]);
			if (invenTools_etat) compteurIncr.ress_item_gain.additionTables(gainBooster(donnee.item,localStorage.getObj(texte.script_invenTools + "_"+ idPseudoJeu+ "_" + universJeu + "_" + langue + "_proprietesPlanetes_production")));
		}
		return compteurIncr;
	}
	
	function incrementation_liste_position(coord) { // incrémente de 1 la position envoyée en argument
		// CAS 1: La posiion a déjà été enregistrée
		for (var tmp=0; tmp<liste_position.length; tmp++) {
			if (liste_position[tmp][0] == coord) {
				liste_position[tmp][1] += 1;
				return;
			}
		}
		// CAS 2: La position est inférieure à l'une déjà entrée dans le tableau
		for (var tmp=0; tmp<liste_position.length; tmp++) {
			if (((liste_position.length == 1)&&(position2nombre(coord) < position2nombre(liste_position[0][0])))
			||((liste_position.length > 1)&&(tmp != liste_position.length-1)&&(position2nombre(coord) > position2nombre(liste_position[tmp][0]))&&(position2nombre(coord) < position2nombre(liste_position[tmp+1][0])))) {
				liste_position.insererLigne(new Array(coord,1),tmp);
				return;
			}
		}
		// CAS 3: La postion est la + grande
		liste_position[liste_position.length] = new Array(coord,1);
	}
	
	function compteur_v22tableaux(type) {  // Transformation des sommes en 5 tableaux prêts à l'affichage ; ajout de propriétés à l'objet 'compteurExpe'
		if (type == 0) { // partie supérieure des tableaux
			compteur_v2.rapport_resultat = new Array(new Array());
			compteur_v2.rapport_resultat[0].cloner(compteur_v2.resultat);
			compteur_v2.rapport_resultat[0][11] = compteur_v2.resultat.somme();
			compteur_v2.rapport_resultat[1] = compteur_v2.resultat.pourcentage(compteur_v2.resultat.somme(),config_user.nbDec);
			compteur_v2.rapport_resultat[1][11] = (compteur_v2.rapport_resultat[0][11]/jourActif()).arrondi_decimal(config_user.nbDec).ajoutSeparateurMilliers(config.separateurMilliers) + texte.parJour;
			
			compteur_v2.rapport_ressources = new Array(new Array());
			compteur_v2.rapport_ressources[0].cloner(compteur_v2.ress_gain);
			compteur_v2.rapport_ressources[0][3] = compteur_v2.am_gain;
			
			compteur_v2.rapport_points = new Array(new Array(),new Array());
			compteur_v2.rapport_points[0][0] = ressource2point(compteur_v2.ress_gain.somme());
			compteur_v2.rapport_points[0][1] = ressource2point(coutListeVaisseau(compteur_v2.vaiss_gain,vaisseau_cout).sommeBidirect()-coutListeVaisseau(compteur_v2.vaiss_perte,vaisseau_cout).sommeBidirect()-compteur_v2.ress_vaiss_perte);
			compteur_v2.rapport_points[0][2] = compteur_v2.rapport_points[0][0]+compteur_v2.rapport_points[0][1];   
			compteur_v2.rapport_points[1][0] = (100*compteur_v2.rapport_points[0][0]/compteur_v2.rapport_points[0][2]).arrondi_decimal(config_user.nbDec);
			compteur_v2.rapport_points[1][1] = (100*compteur_v2.rapport_points[0][1]/compteur_v2.rapport_points[0][2]).arrondi_decimal(config_user.nbDec);
			compteur_v2.rapport_points[1][2] = (compteur_v2.rapport_points[0][2]/jourActif()).arrondi_decimal(0).ajoutSeparateurMilliers(config.separateurMilliers) + texte.parJour;
		}
		if (type == 1) { // partie inférieure des tableaux
			compteur_v2.rapport_flotte = new Array(new Array(),new Array(),new Array());
			compteur_v2.rapport_flotte[0].cloner(compteur_v2.vaiss_gain);
			compteur_v2.rapport_flotte[0][6] = compteur_v2.rapport_flotte[0][7] = compteur_v2.rapport_flotte[0][11] = compteur_v2.rapport_flotte[0][13] = ""; // VC+Rcy+EDLM effacés
			compteur_v2.rapport_flotte[1].cloner(compteur_v2.vaiss_perte);
			compteur_v2.rapport_flotte[1][13] = compteur_v2.ress_vaiss_perte;
			var tableTmp = new Array();
			for (var tmp=0; tmp<compteur_v2.vaiss_gain.length; tmp++) tableTmp[tmp] = compteur_v2.vaiss_gain[tmp]-compteur_v2.vaiss_perte[tmp]; // retrait du prototype soustractionTables après signalement d'un bug
			compteur_v2.rapport_flotte[2] = tableTmp;
			compteur_v2.rapport_flotte[2][13] = (compteur_v2.ress_vaiss_perte*-1);
			
			compteur_v2.rapport_item = new Array(new Array(),new Array(),new Array());
			for (var tmp=0; tmp<compteur_v2.item.length; tmp++) for (var tmp_2=0; tmp_2<compteur_v2.item[tmp].length; tmp_2++) compteur_v2.rapport_item[tmp_2][tmp] = compteur_v2.item[tmp][tmp_2];
			compteur_v2.rapport_item[3] = compteur_v2.ress_item_gain;
			compteur_v2.rapport_item[3][3] = compteur_v2.rapport_item[3][4] = compteur_v2.rapport_item[3][5] = "";
			
			compteur_v2.rapport_divers = new Array(new Array(),new Array());
			var res = new Array();
			res.cloner(compteur_v2.resultat);
			var negNulPos = new Array(0,0,0);
			for (var tmp=0; tmp<res.length; tmp++) negNulPos[param_resultat_negNulPos[tmp]+1] += res[tmp];
			compteur_v2.rapport_divers[0] = negNulPos;
			compteur_v2.rapport_divers[1] = negNulPos.pourcentage(negNulPos.somme(),config_user.nbDec);
			compteur_v2.rapport_divers[0][3] = (compteur_v2.rapport_points[0][2]/compteur_v2.resultat.somme()).arrondi_decimal(0).ajoutSeparateurMilliers(config.separateurMilliers) + texte.parExpe;
			compteur_v2.rapport_divers[1][3] = "";
			compteur_v2.rapport_divers[0][4] = zone_epuisee;
			compteur_v2.rapport_divers[1][4] = "";
		}
	}
	
	// *********************************
	// ****** Fonctions récupérer ******
	// *********************************
	
	function recuperer_etatCommandant() {
		var menu = document.getElementById("menuTable").getElementsByTagName("li");
		for (var i=0; i<menu.length; i++) if (menu[i].getElementsByClassName("textlabel")[0].innerHTML == texte.menu_empire) return true;
		return false;
	}
	
	function recuperer_CSSOgame_width() {
		var styleTmp = document.getElementById("overviewBottom").currentStyle || window.getComputedStyle(document.getElementById("overviewBottom"), null); // récupéré sur http://javascript.developpez.com/faq/javascript/?page=CSS (FAQ JS) ; multi-naviguateur (d'où l'emploi du ||)
		return parseInt(styleTmp.width.replace(reg_nonNum,""));
	}
	
	function recuperer_dateMax() { // renvoie la date format objet 'Date' actuelle-delai conservation messages
		var dateTmp = new Date();
		dateTmp.setTime(dateTmp.getTime()-(config.conservationMessages+config_user.conservationMessages_marge)*86400000); // 86 400 000 étant le nombre de ms qu'il y a dans une journée
		return dateTmp;
	}
	
	function recuperer_enTete_message(rubrique) {
		return document.getElementsByClassName("showmessage")[0].getElementsByClassName("infohead")[0].getElementsByTagName("tr")[rubrique].getElementsByTagName("td")[0].innerHTML;
	}
	
	function recuperer_info_round(rnd) {
		var table_rnd = rnd.getElementsByClassName("round_defender textCenter")[0].getElementsByClassName("newBack")[0].getElementsByTagName("table")[0];
		if (typeof table_rnd == "undefined") return -1;
		var i=1;
		var vaiss_rnd = new Array();
		while (typeof table_rnd.getElementsByTagName("tr")[0].getElementsByTagName("th")[i] != "undefined") {
			vaiss_rnd[i-1] = new Array(table_rnd.getElementsByTagName("tr")[0].getElementsByTagName("th")[i].innerHTML.toUpperCase(),table_rnd.getElementsByTagName("tr")[1].getElementsByTagName("td")[i].innerHTML);
			i++;
		}
		return vaiss_rnd;
	}
	
	function recuperer_perte_rcDetaille(rc) { // entrée: table des codes HTML de chacun des rounds, sortie: table de la perte de chaque vaisseau
		var rnd_1 = recuperer_info_round(rc[0]);
		var rnd_n = recuperer_info_round(rc[rc.length-1]);
		if ((rnd_1 == -1)||(rnd_n == -1)) return -1;
		var rnd_orga = new Array(new Array(0,0,0,0,0,0,0,0,0,0,0,0,0),new Array(0,0,0,0,0,0,0,0,0,0,0,0,0));
		
		for (var i=0; i<rnd_1.length; i++) {
			for (var j=0; j<vaisseau.length; j++) {
				if (rnd_1[i][0] == vaisseau[j][1]) rnd_orga[0][j] = rnd_1[i][1];
				if ((typeof rnd_n[i] != "undefined")&&(rnd_n[i][0] == vaisseau[j][1])) rnd_orga[1][j] = rnd_n[i][1]; // la double condition est pour le cas où la table rnd_n serait plus petite que la table rnd_1, càd qu'un type entier de vaisseau aurait été détruit
			} 
		}
		var rnd_perte = new Array();
		for (var i=0; i<rnd_orga[0].length; i++) rnd_perte[i] = rnd_orga[0][i]-rnd_orga[1][i];  
		return rnd_perte;    
	}
	
	function recuperer_infoCompte() { // renvoie une table de 4 cases (pseudo, uni, langue, idPseudoJeu)
		var varJeu = new Array();
		if (location.href.indexOf("page=combatreport") == -1) { // Si la page est n'importe quelle page
			varJeu[0] = document.getElementsByName("ogame-player-name")[0].getAttribute("content");
			varJeu[1] = document.getElementsByName("ogame-universe")[0].getAttribute("content").split(".")[0].replace("uni","");
			varJeu[2] = document.getElementsByName("ogame-language")[0].getAttribute("content");
			varJeu[3] = document.getElementsByName("ogame-player-id")[0].getAttribute("content");			
			} else { // Si la page est le RC détaillé en mode fenêtre (si option activée)
			varJeu[0] = recuperer_pseudoDefenseur();
			varJeu[1] = location.href.split("/game/")[0].split(".ogame.")[0].split("uni")[1];
			varJeu[2] = location.href.split("/game/")[0].split(".ogame.")[1];
			varJeu[3] = -1; // Sur une page 'RC détaillé', on ne peut pas connaître l'id du joueur
		}
		return varJeu;
	}
	
	function recuperer_pseudoDefenseur() { // renvoie le pseudo du joueur récupéré dans le RC détaillé courant
		return  document.getElementsByClassName("combatreport")[0].getElementsByClassName("combat_round")[0].getElementsByClassName("round_defender textCenter")[0].getElementsByClassName("name textBeefy")[0].innerHTML.split("<figure")[0].split("Défenseur")[1].replace(/ /g,"");
	}
	
	// ******************************
	// ****** Autres fonctions ******
	// ******************************
	
	function gainBooster(item,prod) {
		var gainBoo = new Array(0,0,0);
		for (var i=0; i<=2; i++) for (var j=0; j<item[i].length; j++) gainBoo[i] += item[i][j]*max_planete(prod,i)*168*((j+1)/10); // formule 'inventaire tools' ; 168 heures = 7 jours
		return gainBoo;
	}	
	
	function maintenance_supprMessage(id_mess) {
		for (var tmp=0; tmp<liste_message_v2.length; tmp++) {
			if  (liste_message_v2[tmp][0] == id_mess) {
				liste_message_v2.splice(tmp,1);
				alert("message "+ id_mess +" supprimé");
			}
		}	
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2",liste_message_v2);		
	}
	
	function verifier_MAJ(page) {
		return (page.getElementById("summary").getElementsByTagName("p")[1].innerHTML.replace(reg_nonVersion,"") == version_courante) ? false : true;
	}
	
	function message_sonde(donnee_texte) {
		if (donnee_texte.indexOf(mess_sonde_existe) == -1) return -1; // aucune sonde n'a été envoyée
		for (var i in mess_sonde) { for (var j in mess_sonde[i]) { if (donnee_texte.indexOf(mess_sonde[i][j]) != -1) return i;}}
		return 99; // la phrase affichée par la sonde n'est pas reconnue, code 99
	}
	
	function interpreter_boutonRadio(tableRadio) { // entrée: toutes les options d'une même question ; sortie: la réponse sélectionnée ou -1 si rien de selectionné
		for (var tmp=0; tmp<tableRadio.length; tmp++) if (tableRadio[tmp].checked) return tableRadio[tmp].value;   
		return -1;
	}
	
	function interpreter_boutonCheckbox(tableCheck) {
		var tableTmp = new Array();
		for (var tmp=0; tmp<tableCheck.length; tmp++) tableTmp[tmp] = (tableCheck[tmp].checked) ? true : false;
		return tableTmp;
	}
	
	function purger_liste_message() {
		var dateMax = recuperer_dateMax();
		for (var i=0; i<liste_message_v2.length; i++) if (dateFormatOgame2date(liste_message_v2[i][1]).getTime() < dateMax.getTime()) liste_message_v2.splice(i,1);   
		for (var i=0; i<liste_message_RC.length; i++) if (dateFormatOgame2date(liste_message_RC[i].date).getTime() < dateMax.getTime()) liste_message_RC.splice(i,1);   
	}
	
	function coutListeVaisseau(table,prixBase) { // prixBase est une liste de prix (M,C,D)
		var coutTmp = new Array();
		for (var tmp=0; tmp<prixBase.length; tmp++) {
			coutTmp[tmp] = new Array;
			for (var tmp_2=0; tmp_2<3; tmp_2++) coutTmp[tmp][tmp_2] = table[tmp]*prixBase[tmp][tmp_2];
		}
		return coutTmp;
	}
	
	function parcours_message() { // fonction 'colonne vertébrale'
		if (typeof document.getElementsByClassName("combatreport")[0] == "undefined") { // Si page courante n'est pas 'RC détaillé', 2 possibilités
			if (typeof document.getElementsByClassName("showmessage")[0] == "undefined") { // Si on est dans la page 'messages' sans qu'un message soit affiché
				afficherAlerte_message();
				} else { // Soit page courante = 'RC simple'  
				var message_enCours = recuperer_enTete_message(2);
				if (message_enCours.indexOf(texte.rapport_combat) != -1) {                  
					var expeCorrespondante_v2 = elementExiste(liste_message_RC,recuperer_enTete_message(3),".date");// c'est le numéro qu'occupe l'objet 'messageExpe_RC' dans 'liste_message_RC'
					// SI le RC n'est pas sans combat (flotte descendue au 1er tour)
					if ((expeCorrespondante_v2 != -1)
					&&(document.getElementsByClassName("showmessage")[0].getElementsByClassName("note")[0].innerHTML.indexOf(texte.RC_contactPerdu) == -1)
					&&(typeof liste_message_RC[expeCorrespondante_v2].ress_vaiss_perte == "undefined")) {                
						liste_message_RC[expeCorrespondante_v2].ress_vaiss_perte = parseInt(document.getElementById("shortreport").getElementsByTagName("tr")[1].getElementsByTagName("td")[4].innerHTML.replace(reg_nonNum,""));
						compteur_v2.ress_vaiss_perte = compteur_v2.ress_vaiss_perte + liste_message_RC[expeCorrespondante_v2].ress_vaiss_perte; // Incrémentation du compteur
						if (liste_message_RC[expeCorrespondante_v2].ress_vaiss_perte == 0) { // si il n'y a pas de perte de vaisseaux
							liste_message_RC.splice(expeCorrespondante_v2,1);  // Le compteur est incrémenté & la consultation du RC détaillé est inutile, on supprime donc l'objet 'message_RC'
							issue_combat[0]++;
							affichage_alerte(texte.alerte_rcDetailleInutile,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteError");
							// précédemment affiché: 'document.getElementsByClassName("textCenter next")[0]'
						} else issue_combat[1]++;
						affichage_alerte(texte.alerte_rcSimpleAjoute,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteOK");
					}    
				}
				if (message_enCours.indexOf(texte.rapport_expe) != -1) {   // Soit page courante = 'Rapport d'expé'
					var mesg = new messageExpe(document.getElementsByClassName("showmessage")[0]);
					if (typeof mesg.resultat == "undefined") { // si aucun résultat n'est enregistré
						if (document.getElementById("nonReconnu") != null) { // si cet id est reconnu, c'est que l'alerte est déjà affichée, donc on l'efface pour en afficher une nouvelle ensuite
							var alerte_nonReconnu = document.getElementById("nonReconnu");
							alerte_nonReconnu.parentNode.removeChild(alerte_nonReconnu);
						}
						affichage_alerte(texte.alerte_messageNonReconnu,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteError","nonReconnu");
						} else {
						if (elementExiste(liste_message_v2,mesg.id,"[0]") == -1) {
							incrementation_liste_position(mesg.coord);
							compteur_v2 = incrementation_compteur_v2(compteur_v2,mesg); // migration v2: incrémentation du compteur
							if ((mesg.resultat == "pirates")||(mesg.resultat == "aliens")) liste_message_RC[liste_message_RC.length] = new messageExpe_RC(mesg); // ajout à la liste d'un objet messageRC, jusqu'à qu'il en soit effacé                            
							liste_message_v2[liste_message_v2.length] = new Array(mesg.id,mesg.date); // migration v2: ajout de la date et de l'identifiant dans la liste
							var dateMax = recuperer_dateMax(); // si 'dateInit' est inférieure au délai de conservation des messages, on ne modifie plus 'dateInit'
							if ((dateFormatOgame2date(dateInit).getTime() > dateMax.getTime())&&(dateFormatOgame2date(dateInit).getTime() > dateFormatOgame2date(mesg.date).getTime())) dateInit = mesg.date;
							purger_liste_message();
							if (mesg.mess_sonde == 1) { // zone épuisée
								zone_epuisee++;
								affichage_alerte(texte.alerte_posEpuisee,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteAtt");
							}
							if (mesg.mess_sonde == 99) affichage_alerte(texte.alerte_messSondeNonReconnu,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteError");
							affichage_alerte(texte.alerte_rExpeAjoute,document.getElementsByClassName("showmessage")[0],"compteurExpe_alerteOK");     
							if (mesg.resultat == "trouNoir") afficher_formRExp();
						}
					}
				}
			}
			} else { // Si page courante = 'RC détaillé'
			var round = document.getElementsByClassName("master")[0].getElementsByClassName("combat_round");
			var expeCorrespondante_v2 = elementExiste(liste_message_RC,round[0].getElementsByClassName("start")[0].innerHTML.split("(")[1].split(")")[0],".date");
			if (expeCorrespondante_v2 != -1) {
				var vaiss_perte = recuperer_perte_rcDetaille(round);  
				if ((vaiss_perte != -1)&&(typeof liste_message_RC[expeCorrespondante_v2].vaiss_perte == "undefined")) {
					compteur_v2.ress_vaiss_perte = compteur_v2.ress_vaiss_perte - liste_message_RC[expeCorrespondante_v2].ress_vaiss_perte; // Soustraction des données du RC simple, du compteur
					compteur_v2.vaiss_perte = compteur_v2.vaiss_perte.additionTables(vaiss_perte); // Incrémentation du compteur
					liste_message_RC.splice(expeCorrespondante_v2,1); // On supprime l'objet 'messageExpe_RC' de la liste
					affichage_alerte(texte.alerte_rcDetailleAjoute,document.getElementsByClassName("combatreport")[0],"compteurExpe_alerteOK");
				}
			}      
		}
		// Sauvegarde de variables persistantes en fin de tour
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2",liste_message_v2);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur",compteur_v2);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC",liste_message_RC);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit",dateInit);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position",liste_position);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat",issue_combat);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee",zone_epuisee);
	}	
	
	function modifier_config(option_table) { // array option_table(nbDec, delaiActualisation, spoilerDefault, conservationMessages_marge, itemVisible, uniteRaccourci, option_BBCode_perso_place, option_BBCode_titre, option_BBCode_perso)
		if (option_table[0]) config_user.nbDec = option_table[0];
		if (option_table[1]) config_user.delaiActualisation = option_table[1];
		if (option_table[2]) config_user.spoilerDefault = (option_table[2] == "true"); // pour convertir le texte "true"/"false" renvoyé par le code HTML 'input'
		if (option_table[3]) config_user.conservationMessages_marge = parseInt(option_table[3]);
		if (option_table[4]) config_user.itemVisible = (option_table[4] == "true"); // pour convertir le texte "true"/"false" renvoyé par le code HTML 'input'
		if (option_table[5]) config_user.uniteRaccourci = (option_table[5] == "true"); // pour convertir le texte "true"/"false" renvoyé par le code HTML 'input'
		if (option_table[6]) config_user.uniteRaccourci_seuil = option_table[6];
		
		if (option_table[7]) {
			config_user.option_BBCode_titre_pseudo = option_table[7][0];
			config_user.option_BBCode_titre_uni = option_table[7][1];
			config_user.option_BBCode_titre_langue = option_table[7][2];
		}
		if (option_table[8]) config_user.option_BBCode_perso_place = option_table[8];
		if (option_table[9]) config_user.option_BBCode_perso = option_table[9];
		
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user", config_user);
		modifierConsole(config.alerteOK_bgColor,texte.console_optionInit);
	}
	
	function default_config() {
		var config_user = { // configuration par défaut installée, modifiable IG par l'utilisateur ensuite
			nbDec:2,  // le nombre de décimal affichées lors des arrondis
			delaiActualisation:1000,
			spoilerDefault:true,// bas des tables + graph
			conservationMessages_marge:1,
			option_BBCode_titre_pseudo:true,
			option_BBCode_titre_uni:true,
			option_BBCode_titre_langue:true,
			option_BBCode_perso_place:"mas",
			option_BBCode_perso:"Texte personnalisé",
			itemVisible:true,
			uniteRaccourci:true,
			uniteRaccourci_seuil:"m",
		};
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user", config_user);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante", version_courante);
		modifierConsole(config.alerteOK_bgColor,texte.console_optionFin);
	}
	
	function initialiserDonneesUtilisateur() { // initialise les données utilisateur du script
		modifierConsole(config.alerteError_bgColor,texte.console_installDebut);// si l'installation se fait automatiquement, sans passer par le bouto 'install', on affiche le message console de cette manière
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2", new Array());
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit", date2dateFormatOgame(new Date()));
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur", new compteurExpe(new Array()));
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC", new Array());
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante", version_courante);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position", new Array());
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat", new Array(0,0));
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee", 0);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2", true); // en ré-initialisant les données, on les ré-enregistre sous le format v2, donc la MAJ ne sera pas à faire
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution", false);
		default_config(); // initialise les options config_user à leurs valeurs par défaut
		modifierConsole(config.alerteOK_bgColor,texte.console_installFin);
	}
	
	function MAJV2() { // transformation de la liste d'objets 'liste_message' vers les 3 variables composantes de la v2 ; en ré-initialisant les donées, on les ré-enregistre sous le format v2, donc la MAJ ne sera pas à faire
		var liste_message_aSupprimer = localStorage.getObj("Compteur expe_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message"); // ancienne variable
		if (liste_message_aSupprimer == null) { // si rien n'a été enregistré dans la v1, on réinstalle le script
			initialiserDonneesUtilisateur();
			return;
		}
		var dateInit_constr = liste_message_aSupprimer[0].date; // récupération de la date du 1er message ; la v1 utilisait le 1er objet: erreur rectifiée ici
		for (var i=0; i<liste_message_aSupprimer.length; i++) if (dateFormatOgame2date(liste_message_aSupprimer[i].date).getTime() < dateFormatOgame2date(dateInit_constr).getTime()) dateInit_constr = liste_message_aSupprimer[i].date;
		
		var liste_message_v2_constr = new Array();
		var compteur_v2_constr = new compteurExpe(new Array());
		var liste_message_RC_constr = new Array();
		for (var i=0; i<liste_message_aSupprimer.length; i++) { // pour chaque élément, on récupère les informations qu'on transvase dans les 3 variables
			liste_message_v2_constr[liste_message_v2_constr.length] = new Array(liste_message_aSupprimer[i].id,liste_message_aSupprimer[i].date);
			compteur_v2_constr = incrementation_compteur_v2(compteur_v2_constr,liste_message_aSupprimer[i]);
			liste_message_RC_constr[i] = new messageExpe_RC(liste_message_aSupprimer[i]);
		}
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2",liste_message_v2_constr);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur",compteur_v2_constr);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC",liste_message_RC_constr);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit",dateInit_constr);
		localStorage.removeItem("Compteur expe_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message"); // on sauvegarde 'liste_message' dans une variable persistante BACKUP, qui sera effacée lors d'une MAJ suivante quand je me serai assuré que la migration v2 a été OK
		default_config();
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante",version_courante);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position",new Array());
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat", new Array(0,0));
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee",0);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2",true);
		localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution",false);
		alert(texte.alerte_finMAJV2);
	}
	
	function MAJV310() { // Transformation des noms de variables persistantes pour ne plus qu'elles dépenden du nom du joueur, mais de son Id 
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit"));
		if (localStorage.getObj("Compteur expe_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message") != null) localStorage.setObj("Compteur expe_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message", localStorage.getObj("Compteur expe_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message")); // Dans le cas où la MAJ se fait depuis une ancienne version utilisant cette variable
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante") != null)localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution"));
		if (localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user") != null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user", localStorage.getObj(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user"));
		
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit"); 
		localStorage.removeItem("Compteur expe_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution"); 
		localStorage.removeItem(texte.script+ "_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user"); 
		alert(texte.alerte_finMAJV310);
	}
	
	// ***********************
	// ****** Variables ******
	// ***********************
	
	const reg_nonNum = new RegExp("[^0-9]","g");
	const reg_nonVersion = new RegExp('[<>Version:"/b \n]','g');
	
	if (location.href != "http://userscripts.org/scripts/show/150500") { // si la page n'est pas userscripts
		// Définition des constantes du jeu
		var varJeu = recuperer_infoCompte();
		const pseudoJeu = varJeu[0];
		const universJeu = varJeu[1];
		const langue = varJeu[2];
		const idPseudoJeu = varJeu[3];
		
		if (langue == "fr") {
			var vaisseau = new Array(new Array("Petit transporteur","P.TRANSP."),new Array("Grand transporteur","G.TRANSP."),new Array("Chasseur léger","CH.LÉGER"),new Array("Chasseur lourd","CH.LOURD"),new Array("Croiseur","CROISEUR"),new Array("Vaisseau de bataille","V.BATAILLE"),new Array("Vaisseau de colonisation","V.COLO"),new Array("Recycleur","RECYCLEUR"),new Array("Sonde d`espionnage","SONDE"),new Array("Bombardier","BOMBARDIER"),new Array("Destructeur","DESTR."),new Array("Etoile de la mort","RIP"),new Array("Traqueur","TRAQUEUR"));
			
			var param_resultat = new Array( // phrases des messages d'expéditions ; la première case de chaque type de résultat est réservée à la nomination du résultat ;  la 2ème à la nomination telle qu'elle sera affichée" ; la 3ème à la couleur d'affichage dans le graphique
			new Array("aucun","Aucun","votre flotte fera demi-tour","sans résultat aucun","l`expédition a dû être interrompue","ne ramène rien de spécial","a découvert... le vide","C`est d`ailleurs la seule info recueillie","aucune information vraiment passionnante","aucun résultat intéressant","plusieurs musées de la planète-mère","revient les mains et les soutes vides","Peut-être saurons nous","revient donc sans aucun résultat","ne nous a pas apporté grand chose"),
			new Array("pirates","Pirates","pirates","Des barbares primitifs"),
			new Array("aliens","Aliens","espèce inconnue","petit groupe de vaisseaux inconnus","sans avertissement et sans raison","les agresseurs n'ont pas pu être identifiés","les agresseurs n`ont pas pu être identifiés","vaisseaux cristallins va entrer en collision","faisons feu"),
			new Array("avance","Avance","avec un peu d`avance","pour accélérer son retour"),
			new Array("retard","Retard","retard","plus longtemps qu`initialement prévu","fallu plus de temps"),
			new Array("ress_gain","Ressources","L`attaquant obtient Métal","L`attaquant obtient Cristal","L`attaquant obtient Deutérium"),
			new Array("vaiss_gain","Flotte trouvée","Votre flotte s`est agrandie","si nous pouvons sauver quelques vaisseaux","découvert une forteresse stellaire"),
			new Array("marchand","Marchand","chargé de ressources à échanger","liste de clients privilégiés"),
			new Array("am","Anti-matière","L`attaquant obtient Antimatière","unités de Antimatière"),
			new Array("trouNoir","Trou noir","krrzrzzzt Cela zrrrtrzt ressemble","un trou noir en cours de formation","détruisant toute l`expédition","la flotte semble perdue"),
			new Array("item","Item","précieux artefact","y a trouvé un objet","Elle a laissé un objet")
			);
			
			var ressource = new Array("Métal","Cristal","Deutérium");
			var mess_sonde_existe = "Extrait du journal de bord d`un officier de communication"; // phrase devant être trouvée pour qu'une recherche d'alerte épuisement soit lancée
			var mess_sonde = new Array(
			new Array("personne ne soit jamais venu","jamais été explorée","se savoir le premier à explorer"),
			new Array("découvert de très vieilles traces","Nous percevons des signaux d'autres expéditions","la présence d`autres flottes","nous joindre aux autres expéditions","installer des feux de signalisation","plus judicieux d'installer une stèle","collision avec une autre flotte d`expédition","contact radio amical avec d`autres flottes","autre flotte d`expédition qui se trouvait dans le même")
			);
			
			var item_nom = new Array("Booster de métal","Booster de cristal","Booster de deutérium","DETROID","KRAKEN","NEWTRON");
			var item_niv = new Array("bronze","argent","or");
			var item_nom_texte = new Array("Booster de métal","Booster de cristal","Booster de deutérium","Detroïd","Kraken","Newtron");
			var item_niv_texte = new Array("Bronze","Argent","Or");
			
			var texte = {
				script:"CompteurExpe",
				script_texte:"Compteur expédition 3000",
				script_invenTools:"Inventaire tools",
				version:"version",
				graphGoogle_titre:"Résultats des expéditions",
				
				rapport_expe:"Résultat de l`expédition",
				rapport_combat:"Rapport de combat",
				unites:"unités",
				am:"(AM)",
				RC_contactPerdu:"Nous avons perdu le contact",
				antiMatiere:"Anti-matière",
				parJour:"/j",
				parExpe:"/expé",
				menu_empire:"Empire",
				
				alerte_rExpeAjoute:"Rapport d'expédition ajouté",
				alerte_rcSimpleAjoute:"RC ajouté",
				alerte_rcDetailleAjoute:"RC détaillé ajouté",
				alerte_nonSauve:"A sauvegarder",
				alerte_messageNonReconnu:"Message d'expédition non reconnu !",
				alerte_messSondeNonReconnu:"Rapport communication non reconnu !",
				alerte_rcDetailleInutile:"Aucune perte alliée: Détails inutiles",
				alerte_finMAJV2:"La Mise-à-jour Expé-3000 v2 est terminée",
				alerte_finMAJV310:"La Mise-à-jour Expé-3000 v3.10 est terminée",
				alerte_posEpuisee:"Position épuisée !",
				alerte_trouNoirParam:"Trou noir paramétré !",
				
				confirm_Install:"Voulez-vous installer le script ?\nATTENTION ! Cette opération effacera toutes les données d'expédition enregistrées !",
				confirm_Install_2:"Opération IRREVERSIBLE ! (au cas où :-))\nEn cas d'hésitation, cliquer 'annuler' et consulter la doc ou le forum",
				confirm_default:"Voulez-vous remettre les valeurs de configuration (pas les données des messages !), par défaut du script ?",
				confirm_chgtVersion:"En cas de bugs, voulez-vous remettre les valeurs de config par défaut ?\nCela n'affectera pas les données!\n\n-- Conseillé si une MAJ a été faite\n\nAutrement, cliquez sur 'annuler'",
				
				boutonSpoiler_title:"Afficher/Masquer le bas de la table",
				boutonInstall_title:"(re-)initialiser le script (données + config)",
				boutonUserScripts_title:"Test version à jour - Page UserScripts",
				boutonForum_title:"Page forum officiel ogame - Documentation, discussion",
				boutonOption_title:"Afficher les options du script",
				boutonDefault_title:"Rétablir valeurs de config par defaut",
				boutonMAJ_title:"Mettre le script à jour",
				boutonBBCode_title:"BBCode",
				boutonValider:"Sauver config",
				boutonValider_BBCode:"Sauver config BBCode",
				boutonValider_trouNoir:"Enregistrer",
				
				console_base:">",
				console_installDebut:"Début de l'installation...",
				console_installAnnulee:"Installation annulée !",
				console_installFin:"Script installé !",
				console_optionDebut:"Début de configuration...",
				console_optionAnnulee:"Configuration annulée !",
				console_optionFin:"Configuration modifiée",
				console_optionInit:"Config modifiée !",
				
				option_nbDec:"Décimales %",
				option_delaiActualisation:"Fréquence d'exécution du script page 'messages' (ms)",
				option_spoilerDefault:"Affichage table flotte+graphique par défaut",
				option_spoilerDefault_aff:"Afficher",
				option_spoilerDefault_mas:"Masquer",
				option_itemVisible:"Affichage table items",
				option_itemVisible_aff:"Afficher",
				option_itemVisible_mas:"Masquer",
				option_conservationMessages_marge:"Marge conservation des messages (j)",
				option_default:"Remettre les valeurs par défaut",
				option_uniteRaccourci:"Affichage des grands nombres",
				option_uniteRaccourci_complet:"Complet",
				option_uniteRaccourci_racc:"Raccourci (k/M/G)",
				option_uniteRaccourci_seuil:"|__ Quantité minimum",
				option_uniteRaccourci_seuil_k:"k",
				option_uniteRaccourci_seuil_m:"M",
				option_uniteRaccourci_seuil_g:"G",
				
				option_BBCode:"Export BBCode / Texte à copier-coller dans un forum ou autre interpréteur de BBCode",
				option_BBCode_perso:"Ce texte personnalisé s'affichera dans le BBCode",
				option_BBCode_titre:"Montrer dans le titre:",
				option_BBCode_titre_pseudo:"Pseudo:",
				option_BBCode_titre_uni:"Univers:",
				option_BBCode_titre_langue:"Langue:",
				option_BBCode_perso_place:"Emplacement du texte:",
				option_BBCode_perso_place_haut:"Haut",
				option_BBCode_perso_place_bas:"Bas",
				option_BBCode_perso_place_mas:"Masquer",
				
				trouNoir:"Trou noir !! :(<br><br>Connaissez-vous la composition exacte de la flotte perdue ?<br>Si oui, veuillez la saisir<br>on, laissez vide et validez, ou bien quittez:",
				
				liste_position_expedition:"expédition",
				liste_position_nonRep:"non listée",
				
				issue_combat_combat:"combat",
				issue_combat_0perte:"sans perte alliée",
				issue_combat_perte:"avec dégâts",
				issue_combat_total:"au total",
				issue_combat_nonRep:"non listé",
				
				titre_h1_rapport:">> EXPÉ-3000 <<",
				titre_h1_sousTitre:"Compteur démarré le: ",
				titre_h2_resultat:"RÉSULTAT",
				titre_h2_ressources:"RESSOURCES OBTENUES",
				titre_h2_points:"POINTS",
				titre_h2_flotte:"FLOTTE",
				titre_h2_item:"ITEMS",
				titre_h2_divers:"AUTRES STATISTIQUES",
				titre_h3_resultat_resultat:"Résultat",
				titre_h3_resultat_nombre:"Nombre",
				titre_h3_resultat_pourct:"%",
				titre_h3_ressources_ressource:"Ressource",
				titre_h3_ressources_quantite:"Quantité",
				titre_h3_points_domaine:"Domaine",
				titre_h3_points_points:"Points",
				titre_h3_points_pourct:"%",
				titre_h3_flotte_vaisseau:"Vaisseau",
				titre_h3_flotte_gain:"Gain",
				titre_h3_flotte_perte:"Perte",
				titre_h3_flotte_solde:"Solde",
				titre_h3_item_nom:"Nom de l'item",
				titre_h3_item_gain:"Gain",
				titre_h3_divers_nom:"Statistique",
				titre_h3_divers_nombre:"Nombre",
				titre_h3_divers_pourct:"%",
				titre_hLigne_resultat_total:"Total",
				titre_hLigne_flotte_ressources:"Ressources",
				titre_hLigne_flotte_trouNoir:"Trou noir",
				titre_hLigne_points_ressources:"Ressources",
				titre_hLigne_points_flotte:"Flotte",
				titre_hLigne_points_total:"Total",
				titre_hLigne_divers_resNeg:"Résultat négatif",
				titre_hLigne_divers_resNul:"Résultat nul",
				titre_hLigne_divers_resPos:"Résultat positif",
				titre_hLigne_divers_ptExp:"Moyenne de points",
				titre_hLigne_divers_zoneEpuisee:"Zone épuisée",
			};
		}
	}
	var param_resultat_color = new Array("0033FF","9999CC","FF0000","33CCFF","66FF66","FF99CC","FFFF00","990066","FF8000","CCCCCC","FF99CC"); // couleurs du graphique chaque cellule représente un résultat d'expé, dans l'ordre classique du script
	var param_resultat_negNulPos = new Array(0,-1,-1,1,-1,1,1,1,1,-1,1); // -1: resultat négatif ; 0: résultat neutre ; +1: résultat positif
	var vaisseau_cout = new Array(new Array(2000,2000,0),	new Array(6000,6000,0),new Array(3000,1000,0),new Array(6000,4000,0),new Array(20000,7000,2000),new Array(45000,15000,0),new Array(10000,20000,10000),new Array(10000,6000,2000),new Array(0,1000,0),new Array(50000,25000,15000),new Array(60000,50000,15000),new Array(5000000,4000000,1000000),new Array(30000,40000,15000)); // coûts de chaque vaisseau
	
	var config = {   
		header1_fontColor:"#FFFFFF",
		header1_fontSize:18,
		header1_fontBold:"bold",
		header1_bgColor:"#003366",
		header1_textType:"Arial black",
		header1_textAlign:"center",
		
		header2_fontColor:"#FFFF00",
		header2_fontSize:12,
		header2_fontBold:"bold",
		header2_bgColor:"#00002D",
		
		headerLigne_fontColor:"#FF8000",
		headerLigne_fontSize:9,
		headerLigne_fontBold:"bold",
		headerLigne_bgColor:"#000000",
		headerLigne_textAlign:"left",
		
		valeur_fontColor:"#FFFFFF",
		valeur_fontSize:9,
		valeur_fontBold:"normal",
		valeur_bgColor:"#000000",
		
		valeurBis_bgColor:"#070707",
		
		valeurTotal_fontColor:"#FF0000",
		valeurTotal_fontSize:9,
		valeurTotal_fontBold:"bold",
		valeurTotal_bgColor:"#111111",
		
		alerte_fontColor:"#FFFFFF",
		alerte_fontSize:9,
		alerte_fontBold:"bold",
		alerte_textAlign:"center",
		
		alerteOK_bgColor:"#009900",
		alerteAtt_bgColor:"#FF6600",
		alerteError_bgColor:"#D90000",
		
		console_fontColor:"#FFFFFF",
		console_fontSize:11,
		console_fontBold:"bold",
		console_bgColor:"#000000",
		console_textType:"Courier",
		console_textAlign:"left",
		console_width:30, // Valeur en % de la largeur totale
		
		dateInit_fontColor:"#FFFFFF",
		dateInit_fontSize:11,
		dateInit_fontBold:"normal",
		dateInit_bgColor:"#003366",
		dateInit_textAlign:"left",
		
		option_fontColor:"#FFFFFF",
		option_fontSize:12,
		option_fontBold:"bold",
		option_hauteurLigne:28,
		
		BBCode_separation_fontColor:"#666666",
		BBCode_separateur:" - -||- - ",
		BBCode_header_fontSize:14,
		BBCode_intro_fontSize:14,
		BBCode_valeur_fontSize:10,
		BBCode_conclu_fontSize:9,
		
		graph_img_h:200,
		graph_img_w:330,
		graph_txt_w:200,
		option_BBCode_textArea_h:8,
		option_BBCode_textArea_w:122,
		option_BBCode_textArea_perso_h:2,
		separateurMilliers:" ",
		
		boutonSpoiler_url:"http://img22.imageshack.us/img22/4239/boutonspoiler.png",
		boutonInstall_url:"http://img28.imageshack.us/img28/2411/boutoninstall3.png",
		boutonUserScripts_url:"http://img203.imageshack.us/img203/3286/boutonuserscripts.png",
		boutonForum_url:"http://img138.imageshack.us/img138/3918/boutonforum.png",
		boutonOption_url:"http://img820.imageshack.us/img820/5325/boutonoption.png",
		boutonDefault_url:"http://img820.imageshack.us/img820/8092/boutondefault.png",
		boutonMAJ_url:"http://img266.imageshack.us/img266/3448/boutonmaj.png",
		boutonBBCode_url:"http://imageshack.us/a/img821/7079/boutonbbcode.png",
		boutonUserScripts_lien:"http://userscripts.org/scripts/show/150500",
		boutonForum_lien:"http://board.ogame.fr/board1474-ogame-le-jeu/board641-les-cr-ations-ogamiennes/board642-logiciels-tableurs/1061937-exp-3000-compteur-d-exp-dition-autonome/",
		boutonMAJ_lien:"http://userscripts.org/scripts/source/150500.user.js",
		bouton_width:27,
	};        
	
	// ********************
	// ****** Script ******
	// ********************
	
	// test si 1ère exécution / MAJ <v2 / MAJ <  var version_courante / MAJ
	var ordonnerListePosition = false; // passera a true si il y a besoin d'ordonner la liste (au changement de version)
	if (location.href != "http://userscripts.org/scripts/show/150500") { 
		if ((idPseudoJeu != -1)&&(localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit") == null)) {// MAJ v3.10 - renommage des variables persistantes	
			MAJV310();
			ordonnerListePosition = true;
		}
		
		if ((localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution") != false)&&(localStorage.getObj("Compteur expe_"+ pseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_premiereExecution") != false)) initialiserDonneesUtilisateur();
		else {
			if (typeof localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante") == "string") {
				if ((localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_versionCourante") != version_courante)&&(confirm(texte.confirm_chgtVersion))) {
					default_config();
					ordonnerListePosition = true;
				} 
				} else {
				if (localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_MAJV2") != true) MAJV2();
				else {
					if (confirm(texte.confirm_chgtVersion)) {
						default_config();
						ordonnerListePosition = true;
					}
				}
			}
		}
	}
	creer_CSS();
	
	if (location.href == "http://userscripts.org/scripts/show/150500") {
		(verifier_MAJ(document)) ? affichage_alerte("Mise-à-jour disponible",document.getElementById("summary"),"compteurExpe_alerteAtt") : affichage_alerte("Script à jour",document.getElementById("summary"),"compteurExpe_alerteOK");
	}
	
	var url = location.href.split("page=")[1].split("&")[0].split("#")[0];
	config.conservationMessages = ((url != "combatreport") && (recuperer_etatCommandant())) ? 7 : 1; // Si le commandant est activé ou non, le délai de conservation des messages est fixé à 1 ou 7 jours
	var mess_pageCourante = -1; // Variable temporaire qui donne la page message actuellement visitée (en fournissant l'id du premier message) ; grâce à cette variable on sait si la page est changée (hors actualisation)
	var invenTools_etat = (localStorage.getObj(texte.script_invenTools + "_"+ idPseudoJeu+ "_" + universJeu + "_" + langue + "_proprietesPlanetes_production") == null) ? false : true;
	
	if (localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position") == null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position",new Array()); // MAJ v3.6
	if (localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat") == null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat",new Array(0,0)); // MAJ v3.9
	if (localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee") == null) localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee", 0); // MAJ v3.9
	
	var compteur_v2 = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur");
	var liste_message_RC = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_RC");
	var liste_message_v2 = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_message_v2");
	var dateInit = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_dateInit");
	var config_user = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_config_user");
	var liste_position = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_liste_position");
	var issue_combat = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_issue_combat");
	var zone_epuisee = localStorage.getObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_zone_epuisee");
	
	if (ordonnerListePosition) liste_position = liste_position.ordonner(); // la table_position est réordonnée en cas de changement de version (MAJ v3.9)
	if (compteur_v2.resultat.length == 10) compteur_v2.resultat[10] = 0; // MAJ v3.5
	if (typeof compteur_v2.item == "undefined") compteur_v2.item = new Array(new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0),new Array(0,0,0)); // MAJ v3.5
	if (typeof compteur_v2.ress_item_gain == "undefined") { // MAJ v6: attribut 'ress_item_gain' est crée ET on le remplit de la production des boosters (nécessite 'inventaire tools': les valeurs des boosters ne s'actualisent qu'une seule fois (à la MAJ du script), par la suite, elles s'ajouteront à un array (M,C,D) au moment de l'acquisition du booster seulement
		compteur_v2.ress_item_gain = new Array(0,0,0);
		if (invenTools_etat) compteur_v2.ress_item_gain = gainBooster(compteur_v2.item,localStorage.getObj(texte.script_invenTools + "_"+ idPseudoJeu+ "_" + universJeu + "_" + langue + "_proprietesPlanetes_production"));
	}
	localStorage.setObj(texte.script+ "_"+ idPseudoJeu+ "_"+ universJeu+ "_"+ langue+ "_compteur",compteur_v2); // ré-enregistrement après MAJ
	
	// maintenance_supprMessage("235871519"); // appel à une fonction de maintenance: suppression d'un message de la liste par son id
	
	if (url == "overview") afficherTable();
	if ((url == "messages") || (url == "combatreport")) setInterval(parcours_message,config_user.delaiActualisation);
}).toString();
var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);