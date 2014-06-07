// ==UserScript==
// @name           test hip->idref
// @namespace      http://vingtseptpointsept.fr/
// @description    Script expérimental : Enrichit le catalogue HIP de l'URCA en utilisant idref pour récupérer les formes d'autorité rejetées. Encore en test. Aucune garantie...
// @include        http://scdweb.univ-reims.fr/*
// ==/UserScript==

// Historique :
// Version 0.02 : 28/08/2011
// - Refonte du code : toutes les variables fonctions propres au script sont rassemblées dans une fonction unique hip_urca_idref
// - Ajout d'une détection du type de page (+ type de menu et d'onglet) d'HIP
// - Récupération du nombre de résultats en affichage liste dans HIP
// - Correction d'un bug qui perturbait certaines recherches : suppression des caractères " ? * ( ) dans HIP 
// Version 0.01 : 19/08/2011 

// A CORRIGER : trop de réponses avec Aristote (--> métaphysique, problèmes...)
// A CORRIGER : pas de "" dans idref si on veut utiliser les troncatures ou le ? alors que c'est possible dans HIP ("Orwell, ?eorg*")
// Défaut : l'index name_title_s donne peu de résultats, puisqu'il faudrait toujours indiquer le nom de l'auteur avant le titre... 
// Même quand il renvoie quelque chose, on ne peut pas l'utiliser dans HIP, car on est obligé d'enlever les ( ) après le nom de l'auteur
// Essayer l'index name_title_t ?
// Fonction à ajouter : améliorer les rebonds dans les notices (difficile...)



// 
// fonctions générales pour la gestion de l'affichage
//

function ajoute_css_dans_head (css_a_ajouter) {
// Ajoute le CSS passé en paramètre dans la balise HEAD. Ajoute la balise HEAD si nécessaire (si la balise HTML est présente et qu'ellen'est pas vide)
// paramètre : css_a_ajouter = string --> expression CSS valide
	var html_el, premier_el, head_el, style_el;
    head_el = document.getElementsByTagName('head')[0];
    if (!head_el) {
		html_el = document.getElementsByTagName('html')[0];
		premier_el= html_el.firstChild;		
		if (html_el) {		
			head_el = document.createElement('head');
			head_el.innerHTML = '<style type="text/css">'+css_a_ajouter+'</style>';
			if (premier_el) html_el.insertBefore(head_el, premier_el);
		}
	} 
	else {
		style_el = document.createElement('style');
		style_el.type = 'text/css';
		style_el.innerHTML = css_a_ajouter;
		head_el.appendChild(style_el);
	}
}

//
// fonctions pour faciliter la gestion du DOM avec Firefox (on saute les noeuds blancs)
// source : https://developer.mozilla.org/en/whitespace_in_the_dom
//

function noeud_blanc(noeud){
// repérage des noeuds blancs (spécificité du DOM dans Firefox)
// return : true si le noeud est un noeud de commentaire ou un noeud de texte uniquement composé de blancs (espaces, tablulations, retours à la ligne) 
  return ( noeud.nodeType == 8) || ((noeud.nodeType == 3) && (!(/[^\t\n\r ]/.test(noeud.data)))); 
 }

function first_child(noeud){
// adaptation de firstchild à Firefox : renvoie le 1er noeud avec du contenu après le noeud vide, ou null s'il n'y en a pas
  var res=noeud.firstChild;
  while (res) {
    if (!noeud_blanc(res)) return res;
    res = res.nextSibling;
  }
  return null;
}

function last_child(noeud){
// adaptation de lastchild à Firefox : renvoie le 1er noeud avec du contenu avant le noeud vide, ou null s'il n'y en a pas
  var res=noeud.lastChild;
  while (res) {
    if (!noeud_blanc(res)) return res;
    res = res.previousSibling;
  }
  return null;
}

function next_sibling(noeud){
// adaptation de nextSibling à Firefox : renvoie le 1er noeud avec du contenu après le noeud vide, ou null s'il n'y en a pas
  while ((noeud = noeud.nextSibling)) {
    if (!noeud_blanc(noeud)) return noeud;
  }
  return null;
}

function previous_sibling(noeud){
// adaptation de previousSibling à Firefox : renvoie le 1er noeud avec du contenu avant le noeud vide, ou null s'il n'y en a pas
  while ((noeud = noeud.previousSibling)) {
    if (!noeud_blanc(noeud)) return noeud;
  }
  return null;
}

// 
// fonctions générales pour la gestion des chaînes
//

function trim (chaine) {	
//supprime les caractères blancs en début et fin de chaîne
	return chaine.replace(/^\s+/g,'').replace(/\s+$/g,''); 
} 

function elimine_ponctuation_et_espaces (chaine) {
// supprime tous les espaces et signes de ponctuation
	return chaine.replace (/[\x01-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g,"");
} 
	
function trim_guillemetsdoubles (chaine) { 
// supprime les guillemets doubles en début et fin de chaine
// il faudrait aussi envisager la gestion des ''
	return chaine.replace(/^"+/g,'').replace(/"+$/g,''); 
} 	

function remplace_diacritiques (chaine) {
// remplace les diacritiques par des caractères simples
// valable pour le français, mais il faudrait améliorer la fonction pour le support d'autres langues
// index complet sur le site http://www.unicode.org/charts/PDF/U0080.pdf
	var diacritiques =[
        /[\xC0-\xC5]/g, /[\xE0-\xE5]/g,  // A, a
        /[\xC8-\xCB]/g, /[\xE8-\xEB]/g,  // E, e
        /[\xCC-\xCF]/g, /[\xEC-\xEF]/g,  // I, i
        /[\xD2-\xD6\xD8]/g, /[\xF2-\xF6\xF8]/g,  // O, o
        /[\xD9-\xDC]/g, /[\xF9-\xFC]/g,  // U, u
        /[\xD1]/g, /[\xF1]/g, // N, n
        /[\xC7]/g, /[\xE7]/g, // C, c
		/[\xC6]/g, /[\xE6]/g, // Ae, ae
		/[\xDE]/g, /[\xFE]/g, // Th, th
		/[\xD0]/g, /[\xF0]/g, // D (delta barré)
		/[\xDF]/g, // ss (eszett)
		/[\xDD]/g, /[\xFD\xFF]/g, // Y, y
		/[\u0178]/g, // Ÿ  ; en unicode
		/[\u0152]/g, // Œ ; en unicode
		/[\u0153]/g // œ ; en unicode
	];
	var car_sans_diacritiques = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c','Ae','ae', 'Th', 'th', 'D', 'd','ss','Y', 'y', 'Y', 'Oe', 'oe'];
	for (var i = 0; i < diacritiques.length; i++)    {
		chaine = chaine.replace(diacritiques[i],car_sans_diacritiques[i]);
	}
	return chaine;
}


//
// objet hip_urca_idref
// contient tout programme...
//

hip_urca_idref = function () {
// utilisation : 
// - créer une instance de cet objet. Par exemple var UrcaIdref = new hip_urca_idref ();
// - appeler les différentes méthodes de l'objet ou consulter ses propriétés
// liste des méthodes accessibles directement : 
// - analyse_page
// - initialise
// - get_page
// - get_menu
// - get_onglet
// - get_nb_resultats
// liste des propriétés accessibles directement :
// - uniquement les codes commençant par HIP et décrivant le type de page

// propriétés accessibles par les méthodes de page_courante, et depuis le corps du script sous la forme hip_urca_idref.propriete

	this.HIP_INTROUVABLE = 0;
	this.HIP_RECHERCHE = 1;
	this.HIP_COMPTE = 2;
	this.HIP_MA_SELECTION = 3;
	this.HIP_AIDE = 4;
	this.HIP_CONNEXION = 5;

	this.HIP_RECHERCHE_SIMPLE = 10;
	this.HIP_RECHERCHE_AVANCEE = 11;
	this.HIP_RECHERCHE_ALPHABETIQUE = 12;
	this.HIP_RECHERCHE_HISTORIQUE = 13;
	
	this.HIP_RESULTATS_NOTICE = 20;
	this.HIP_RESULTATS_LISTE = 21;
	this.HIP_RESULTATS_VIDE = 22;
	this.HIP_RESULTATS_ALPHABETIQUE = 23;
	
	this.HIP_COMPTE_APERCU = 30;
	this.HIP_COMPTE_EMPRUNTS = 31;
	this.HIP_COMPTE_RESERVATION = 32;
	this.HIP_COMPTE_BLOCAGES = 33;
	this.HIP_COMPTE_INFORMATIONS = 34;
	
// variables internes invisibles depuis le corps du script. Accessible par les fonctions internes privées et les méthodes de hip_urca_idref
// constantes : étapes pour la fonction modifie_affichage_recherche
	var INIT_AFFICHAGE = 0;
	var TRAITEMENT_EN_COURS = 1;
	var REQUETE_IDREF = 2;
	var TRAITEMENT_FINI = 3;
	var AUCUN_INDEX_REMPLI = 4;
	var ERREUR = 5;

// constantes : paramètres de la fonction modifie_affichage_recherches
	var MAX_MAXRESULT = 500 ; // liste déroulante de 500 items maximum
	var DOLLAR_A = 0;
	var DOLLAR_AB = 1;
	var DOLLAR_ABCF = 2;

// variables modifiables par la fonction
	var OPTION_SIMPLIFICATION = DOLLAR_A;
	var OPTION_MAXRESULT = 15; // modifiable avec une liste déroulante
	var OPTION_INDEX = 0; // modifiable en cliquant sur les boutons radios 
	var TAB_INDEX_TERM_OPER =  []; // tableau à trois éléments : index (GK...), terme recherché, opérateur booléen 
	var TAB_AUTRES_PARAMETRES =  []; //tableau rempli avec les champs session, menu, aspect, npp, ipp, spp, profile, ri et les champs de tri et de limitations

	var ONLGET_COURANT;
	var MENU_COURANT;
	var PAGE_COURANTE;
	var NB_RESULTATS;
// var URL_COURANTE;
// variable nécessaire pour que les fonctions internes privées (non définies comme méthodes) puissent accéder aux propriétés de hip_urca_idref
//	var this_hip_urca_idref = this;

// fonctions internes privées. Inaccessibles depuis le corps du script. Sont appelées depuis les méthodes publiques. Ne peuvent pas avoir accès au "this" de hip_urca_idref
	

// 
// fonctions spéciales pour la gestion de l'affichage
//

function set_option_index(evenement) {
// Appelée lors d'un clic sur l'un des boutons radios définis dans modifie_affichage_recherche pour choisir les options de recherche
// enregistre la valeur du bouton dans la variable globale OPTION_INDEX
	if (evenement.target.value) {
		OPTION_INDEX = parseInt (evenement.target.value,10);
	}
	return;
}

function set_option_simplification(evenement) {
// Appelée lors d'un clic sur l'un des boutons radios définis dans modifie_affichage_recherche pour choisir les options de recherche
// enregistre la valeur du bouton dans la variable globale OPTION_SIMPLIFICATION
	if (evenement.target.value) {
		OPTION_SIMPLIFICATION = parseInt (evenement.target.value,10);
	}
	return;
}

function set_option_maxresult(evenement) {
// Appelée lors d'un clic sur le menu déroulant
// enregistre la valeur dans la variable globale OPTION_MAXRESULT
	if (evenement.target.value) {
		OPTION_MAXRESULT = parseInt (evenement.target.value,10);
	}
	return;
}


// 
// fonctions générales pour la gestion des chaînes
//

	function est_oper_bool_HIP (chaine) {
// teste si une chaîne est un des opérateurs booléens d'HIP
	if ((chaine == 'not') || (chaine == 'or') || (chaine == 'and')) return true;
	else return false;
}

	function utf8_en_iso8859_Idref (chaine) {
// pour idref, après la transformation de l'url par encodeURIComponent, on transforme les représentations des caractères unicodes en représentations des caractères simples quand c'est possible
// fonction dérivée du tableau sur cette page : http://www.utf8-chartable.de/
	var car_utf8 =[
/%C2%A0/g,/%C2%A1/g,/%C2%A2/g,/%C2%A3/g,/%C2%A4/g,/%C2%A5/g,/%C2%A6/g,/%C2%A7/g,/%C2%A8/g,/%C2%A9/g,/%C2%AA/g,/%C2%AB/g,/%C2%AC/g,/%C2%AD/g,/%C2%AE/g,/%C2%AF/g,/%C2%B0/g,/%C2%B1/g,/%C2%B2/g,/%C2%B3/g,/%C2%B4/g,/%C2%B5/g,/%C2%B6/g,/%C2%B7/g,/%C2%B8/g,/%C2%B9/g,/%C2%BA/g,/%C2%BB/g,/%C2%BC/g,/%C2%BD/g,/%C2%BE/g,/%C2%BF/g,/%C3%80/g,/%C3%81/g,/%C3%82/g,/%C3%83/g,/%C3%84/g,/%C3%85/g,/%C3%86/g,/%C3%87/g,/%C3%88/g,/%C3%89/g,/%C3%8A/g,/%C3%8B/g,/%C3%8C/g,/%C3%8D/g,/%C3%8E/g,/%C3%8F/g,/%C3%90/g,/%C3%91/g,/%C3%92/g,/%C3%93/g,/%C3%94/g,/%C3%95/g,/%C3%96/g,/%C3%97/g,/%C3%98/g,/%C3%99/g,/%C3%9A/g,/%C3%9B/g,/%C3%9C/g,/%C3%9D/g,/%C3%9E/g,/%C3%9F/g,/%C3%A0/g,/%C3%A1/g,/%C3%A2/g,/%C3%A3/g,/%C3%A4/g,/%C3%A5/g,/%C3%A6/g,/%C3%A7/g,/%C3%A8/g,/%C3%A9/g,/%C3%AA/g,/%C3%AB/g,/%C3%AC/g,/%C3%AD/g,/%C3%AE/g,/%C3%AF/g,/%C3%B0/g,/%C3%B1/g,/%C3%B2/g,/%C3%B3/g,/%C3%B4/g,/%C3%B5/g,/%C3%B6/g,/%C3%B7/g,/%C3%B8/g,/%C3%B9/g,/%C3%BA/g,/%C3%BB/g,/%C3%BC/g,/%C3%BD/g,/%C3%BE/g,/%C3%BF/g];
	var car_iso8859 =[
"%A0","%A1","%A2","%A3","%A4","%A5","%A6","%A7","%A8","%A9","%AA","%AB","%AC","%AD","%AE","%AF","%B0","%B1","%B2","%B3","%B4","%B5","%B6","%B7","%B8","%B9","%BA","%BB","%BC","%BD","%BE","%BF","%C0","%C1","%C2","%C3","%C4","%C5","%C6","%C7","%C8","%C9","%CA","%CB","%CC","%CD","%CE","%CF","%D0","%D1","%D2","%D3","%D4","%D5","%D6","%D7","%D8","%D9","%DA","%DB","%DC","%DD","%DE","%DF","%E0","%E1","%E2","%E3","%E4","%E5","%E6","%E7","%E8","%E9","%EA","%EB","%EC","%ED","%EE","%EF","%F0","%F1","%F2","%F3","%F4","%F5","%F6","%F7","%F8","%F9","%FA","%FB","%FC","%FD","%FE","%FF"];
	for (var i = 0; i < car_utf8.length; i++)    { 
        chaine = chaine.replace(car_utf8[i],car_iso8859[i]);
    }
	return chaine;
}


	function guillemetise_expression (chaine) {
// si la chaine contient un espace, ou les caractères - + = . , ' ` & @ < > % # ; : [ ] ( ) { } | ! $ ^ / \ on la met entre guillemets
// sinon cela perturbe HIP	
	var motif = /[\s\-\+=\.,'`&@<>%#;:\(\)\[\]\{\}\|\!\$\^\\\/]+/;
	if (motif.test (chaine))  chaine = '"'+chaine+'"';
	return chaine;
}			

	function guillemetise_mots (chaine) {
// si la chaine contient des mots contenant un les caractères - + = . , ' ` & @ < > % # ; : [ ] ( ) { } | ! $ ^ / \ on met chaque mot entre guillemets
// sinon cela perturbe HIP	
	var tab_mots = chaine.split (/\s+/);
	var motif = /[\-\+=\.,'`&@<>%#;:\(\)\[\]\{\}\|\!\$\^\\\/]+/;
	for (var i=0;i<tab_mots.length;i++) {
		if (motif.test (tab_mots[i])) tab_mots[i]= '"'+tab_mots[i]+'"';
	}
	return tab_mots.join (" ");
}			


//
// fonctions de traitement de la requête
//

	function nom_Idref_to_nom_HIP (chaine) {
// Appelée par recherche_idref
// simplifie la forme récupérée dans IdRef pour limiter le nombre de nouvelles formes qui serviront à construire la requête dans HIP.
// Plusieurs comportements selon la valeur de OPTION_SIMPLIFICATION
// dans tous les cas, il faut purement et simplement supprimer certains caractèrs présents éventuellement dans le nom ou les qualificatifs de l'entité car leur présence dans HIP créerait un bug : ? * ( ) "
	switch (OPTION_SIMPLIFICATION) {
	case DOLLAR_A :
// on ne prend pas en compte les éléments qui seraient en $b en unimarc (prénoms...), ni en $c et $f (précisions de dates et de fonctions entre ()			
// Mais on ne peut pas directement accéder au $a. On va donc faire du bricolage. Attention : c'est assez risqué et peu satisfaisant. Il faut voir si cela pose problème pour certaines autorités !
// on élimine tout ce qui est après la "," (pour les noms propres, le prénom); et ce qui est entre ()
	var motif = /\([^\)\(]*\)/g;
	while ((chaine.indexOf("(") != -1) && (chaine.indexOf(")") != -1)) {
		chaine = chaine.replace (motif, '');
	}
	chaine = (chaine.indexOf(",") > 0) ? chaine.substring(0,chaine.indexOf(",")):chaine;
	chaine = trim(chaine.replace (/[\(\)\?\*"]/g, ''));
	break;
	
	case DOLLAR_AB :
//on ne prend pas en compte les éléments qui seraient en $c ou $f en unimarc (précisions de dates et de fonctions) en supprimant les () et tout leur contenu
	var motif = /\([^\)\(]*\)/g;
	while ((chaine.indexOf("(") != -1) && (chaine.indexOf(")") != -1)) {
		chaine = chaine.replace (motif, '');
	}	
	chaine = trim(chaine.replace (/[\(\)\?\*"]/g, ''));
	break;
	
	case DOLLAR_ABCF : 
// on laisse tout en place
	chaine = trim(chaine.replace (/[\(\)\?\*"]/g, ''));
	break;
	default:
	break;
	}
	return chaine;
	
}
	
	function fin_traitement () {
// Appelée par recherche_idref
// envoie la requête à HIP en prenant en compte les modifications 

// fusionner tous les index, termes et opérateurs dans une seule chaîne
// sans doute inutile... on pourrait garder les 'index' et les 'term' tels qu'ils sont.
	var url_requete_hip = "";
	var chaine = "";
	var tmp_chaine = "";
	var premierindex = TAB_INDEX_TERM_OPER[0][0];
	var base_url = "http://scdweb.univ-reims.fr/ipac20/ipac.jsp";
	var parametres_affichage =TAB_AUTRES_PARAMETRES.join ("&");
// pour chaque index
	for (var i=0;i<TAB_INDEX_TERM_OPER.length;i++) {
// pour chaque mot ou expression dans chaque index
		for (var j =0 ;j<TAB_INDEX_TERM_OPER[i][1].length;j++) {
			tmp_chaine = tmp_chaine + TAB_INDEX_TERM_OPER[i][1][j][0];
			if (TAB_INDEX_TERM_OPER[i][1][j][1] != "") tmp_chaine = tmp_chaine + " "+TAB_INDEX_TERM_OPER[i][1][j][1]+" ";
		} // for
		if (i == 0) chaine = tmp_chaine;
		else chaine = chaine +TAB_INDEX_TERM_OPER[i][0]+"="+tmp_chaine;
		if (TAB_INDEX_TERM_OPER[i][2]) {
		chaine = chaine+" "+TAB_INDEX_TERM_OPER[i][2]+" ";
		tmp_chaine = "";
		}
	} // for
	url_requete_hip = base_url +"?index="+premierindex+"&term="+encodeURIComponent(chaine)+"&"+parametres_affichage;
// on prévient que la requête est achevée et on affiche la requête HIP
	modifie_affichage_recherche(TRAITEMENT_FINI, "",url_requete_hip);
// réinitialisation : utile si on refait une recherche
	TAB_INDEX_TERM_OPER.length = 0;
	TAB_AUTRES_PARAMETRES.length = 0;
}

	function recherche_idref (indice1, indice2){
// le coeur du script : fonction récursive qui interroge idref, modifie la variable globale TAB_INDEX_TERM_OPER en conséquence, modifie l'affichage de la page en cours dans HIP
// paramètres : indice1 = position de l'index traité dans le tableau  TAB_INDEX_TERM_OPER
// 				indice2 = position du mot ou de l'expression traitée au sein de chaque index 
// exemple : pour une recherche ".AW stendhal and .TW rouge and noir", indice1 prend les valeurs 0 pour l'index .AW et 1 pour l'index .TW ; indice2 prend la valeurs 0 pour stendhal, 0 pour rouge et 1 pour noir

	var chemin = 'http://www.idref.fr/Sru/Solr?';
	var tab_index_idref =  [];
	var chaine_traitee = "";
	var url_requete_idref = "";

// le recours à idref n'est pertinent que pour les trois premiers index d'HIP :
// .GK = index global
// .AW = mots auteur
// .SW = mots sujet
// .TW = mots titre (sauf périodiques)
// .TPW = mots titre (périodiques)
// .SEW = mots collection
// .EW = mots éditeur
// .IN = isbn et issn
// BIB = n° de la notice dans la base

// --> on teste si l'index d'HIP mérite d'être transformé avec idref, sinon on passe au suivant, et si le dernier est atteint, on finit le traitement

	while ((indice1<TAB_INDEX_TERM_OPER.length) && (tab_index_idref.length < 1)) {	
	switch (TAB_INDEX_TERM_OPER[indice1][0]) {
		case '.TW':
			if (OPTION_INDEX == 0) tab_index_idref = ['all']; // par défaut, on interroge l'index global d'idref
			else tab_index_idref = ["uniformtitle_s"]; // index titre de HIP -> uniquement l'index titre uniforme de IdRef
		break;
		case '.AW':
			if (OPTION_INDEX == 0) tab_index_idref = ['all']; // par défaut, on interroge l'index global d'idref
			else tab_index_idref = ["persname_s", "corpname_s", "geogname_s", "famname_s", "uniformtitle_s", "name_title_s", "trademark_s"]; // index auteur de HIP -> tous les index mots de IdRef sauf l'index noms communs (Rameau + FMesh)
			break;
		case '.SW':
		case '.GK':	
			if (OPTION_INDEX == 0) tab_index_idref = ['all']; // par défaut, on interroge l'index global d'idref
			else tab_index_idref = ["persname_s", "corpname_s", "subjectheading_s", "geogname_s", "famname_s", "uniformtitle_s", "name_title_s", "trademark_s"]; // index sujet ou général de HIP -> tous les index mots de IdRef
			break;
		default:
			tab_index_idref.length = 0;
		break;
	} // switch
// on passe à l'index suivant si l'index examiné n'était pas intéressant				
		if (tab_index_idref.length < 1) indice1 ++;
	} // while
// si on a dépassé le dernier index, on lance la fin du traitement sans passer par GM_xmlhttpRequest
	if (indice1==TAB_INDEX_TERM_OPER.length) fin_traitement();
	else { 

// les index possibles sont détaillés ici : http://documentation.abes.fr/aideidref/developpeur/ch02s02.html

// on essaie 2 grands types d'interrogations : 
// 1. 'all' : index global 
// spéficités : tout mettre en minuscules et supprimer les diacritiques
// problème : trop large : 'Nicolas' recherche toutes les autorités avec le prénom Nicolas --> on ne pourra pas traiter tout cela et surtout construire une URI avec toutes les alternatives
// 2. en croisant tous les index de type 'phrase'.
// spécificités : 
// - tout mettre en minuscules, mais garder impérativement les diacritiques, y compris les majuscules accentuées ("Ecole" ne renverra pas "École"!)
// - supprimer les "" si l'expression recherchée est entre ""
// - échapper les espaces et les parenthèses par "\" : " "-> "\ " ; "(" -> "\(" ; ")" -> "\)""
// - nécessité de faire une troncature si la forme recherchée ne correspond pas exactement à la forme indexée
// 2.a) -- soit en ajoutant systématiquement une troncature *  --> trop large : "franc*" renverra "France", etc...
// 2.b) -- soit en croisant trois types de troncatures plus précises : on ajoute un caractère "neutre" avant la troncature : ",", ".", " ", ou "(" (avec un échappement pour les deux derniers) pour que "franc" renvoie "franc -- valeur" mais pas "france" ou que "martin" renvoie "martin, henri" mais pas "martinet, robert"

	switch (OPTION_INDEX) {
		case 0:	
// idref n'accepte pas les accents ni les diacritiques ni les majuscules pour les index mots
// il faut supprimer les " " qui peuvent entourer les mots contenant certains caractères problématiques (utile plus tard pour construire la requête HIP)
			chaine_traitee = remplace_diacritiques (TAB_INDEX_TERM_OPER[indice1][1][indice2][0].replace(/"/g,'')).toLowerCase ();
			url_requete_idref = chemin+'q='+tab_index_idref[0]+':'+encodeURIComponent('"'+chaine_traitee+'"')+'&start=&rows='+OPTION_MAXRESULT+'&wt=json&fl=affcourt_z';
			break;
		case 1:
// idref n'accepte pas les majuscules pour les index phrase
// dans l'url, les diacritiques ne doivent pas êtres transformés en unicode (utf-8) mais en iso-8859 -> nettoyer le résultat de la fonction "encodeURIComponent" par une fonction maison "utf8_en_iso8859_Idref" (par contre, pour HIP, l'utf 8 fonctionne)
// ex : é -> %E9 en iso-8859 et %C3%A9 en utf-8
// http://www.sudoc.abes.fr/DB=2.1/SET=2/TTL=1/CMD?ACT=SRCHA&IKT=1004&SRT=RLV&TRM=Grubi%C5%84ski n accentué --> fonctionne
// http://www.idref.fr/Sru/Solr?q=persname_s:grubi%C5%84ski* -> ne fonctionne pas
// http://www.idref.fr/Sru/Solr?q=persname_s:grubi?ski* non plus
// http://www.idref.fr/Sru/Solr?q=persname_s:grubi* non plus!

// il faut supprimer les " " qui peuvent entourer les mots contenant certains caractères problématiques (utile plus tard pour construire la requête HIP)
			chaine_traitee = (TAB_INDEX_TERM_OPER[indice1][1][indice2][0].replace(/"/g,'')).toLowerCase ();
// échapper les " ", "(" et ")"
			chaine_traitee = chaine_traitee.replace (/\s+/g,'\\ ').replace (/\(+/g,'\(').replace (/\)+/g,'\)');
			url_requete_idref = chemin+'q=%28';
			for (var i=0;i<tab_index_idref.length;i++) {
				url_requete_idref=url_requete_idref+tab_index_idref[i]+':'+utf8_en_iso8859_Idref(encodeURIComponent(chaine_traitee))+'*';
				if (i<tab_index_idref.length-1) url_requete_idref = url_requete_idref +"%20or%20";
			}				
			url_requete_idref= url_requete_idref+'%29&start=&rows='+OPTION_MAXRESULT+'&wt=json&fl=affcourt_z';
			break;
		case 2:
		
// idref n'accepte pas les majuscules pour les index 'phrase'
// il faut supprimer les " " qui peuvent entourer les mots contenant certains caractères problématiques (utile plus tard pour construire la requête HIP)
			chaine_traitee = (TAB_INDEX_TERM_OPER[indice1][1][indice2][0].replace(/"/g,'')).toLowerCase ();
// échapper les " ", "(" et ")"
			chaine_traitee = chaine_traitee.replace (/\s+/g,'\\ ').replace (/\(+/g,'\(').replace (/\)+/g,'\)');
			url_requete_idref = chemin+'q=%28';
			for (var i=0;i<tab_index_idref.length;i++) {
				url_requete_idref=url_requete_idref+tab_index_idref[i]+':'+utf8_en_iso8859_Idref(encodeURIComponent('('+chaine_traitee+' '+chaine_traitee+'\\ * '+chaine_traitee+'.* '+chaine_traitee+',*)'));
				if (i<tab_index_idref.length-1) url_requete_idref = url_requete_idref +"%20or%20";
			}				
			url_requete_idref= url_requete_idref+'%29&start=&rows='+OPTION_MAXRESULT+'&wt=json&fl=affcourt_z';
			break;
		default:
		break;
	}
	modifie_affichage_recherche(REQUETE_IDREF,"Requête IdRef sur le point d'être lancée.<br />Examen de l'index "+TAB_INDEX_TERM_OPER[indice1][0]+" de HIP.<br />Recours aux index "+tab_index_idref+" de IdRef pour rechercher l'expression : "+ chaine_traitee+".<br />URL de la requête Idref : ",url_requete_idref); // affiche des informations
	
GM_xmlhttpRequest(
   {method: 'GET',
    url: url_requete_idref,
    headers:{'User-Agent':window.navigator.userAgent,'Accept':'application/json'},
	onerror: function(responseDetails) {
		modifie_affichage_recherche (ERREUR, "Erreur dans la fonction GM_xmlhttpRequest");
		return;},
    onload: function(responseDetails) {
		if (responseDetails.status == 200){
			var reponse_texte = responseDetails.responseText;
			if (/^<error>/.test (reponse_texte)) { // contrôle d'erreur
				modifie_affichage_recherche (ERREUR, "Erreur dans la réponse du serveur Idref <br />"+reponse_texte);
				return;}		
			var reponse_JSON = JSON.parse (reponse_texte);
			var formes_alternatives =  []; // tableau qui contiendra les formes à ajouter à l'équation de recherche
			var nb_reponses = reponse_JSON.response.numFound;
			modifie_affichage_recherche(REQUETE_IDREF,"Nombre de réponses trouvées dans Idref : "+nb_reponses+ " dont "+((nb_reponses<OPTION_MAXRESULT) ? nb_reponses:OPTION_MAXRESULT )+ " ont été examinées."); 
			nb_reponses = (nb_reponses<OPTION_MAXRESULT) ? nb_reponses:OPTION_MAXRESULT; // on limite le nombre de réponses de manière arbitraire en fonction de OPTION_MAXRESULT
			for (var i=0 ; i<nb_reponses;i++) {
				var forme_tronquee = nom_Idref_to_nom_HIP(reponse_JSON.response.docs[i].affcourt_z).toLowerCase();
// la forme tronquée est différente de la chaîne envoyée à la fonction ET elle n'a pas encore été ajouté au tableau --> on l'ajoute, en l'encadrant de "" au besoin

// pas tout à fait satisfaisant : dans ce cas précis il faudrait peut-être que nom_Idref_to_nom_HIP(TAB_INDEX_TERM_OPER[indice1][1][indice2][0]).toLowerCase() conserve les prénoms mais pas les dates. A préciser...
				if ((forme_tronquee != nom_Idref_to_nom_HIP(TAB_INDEX_TERM_OPER[indice1][1][indice2][0]).toLowerCase())
					&& (formes_alternatives.indexOf(forme_tronquee) == - 1) 
					&& (formes_alternatives.indexOf('"'+forme_tronquee+'"') == - 1)) 
						{formes_alternatives.push (guillemetise_expression (forme_tronquee));}
			} // for
			modifie_affichage_recherche(REQUETE_IDREF,"Nombre de formes alternatives conservées : "+formes_alternatives.length);		
// rétablissement des guillemets pour ne pas perturber HIP
//			TAB_INDEX_TERM_OPER[indice1][1][indice2][0]  = guillemetise_expression (TAB_INDEX_TERM_OPER[indice1][1][indice2][0]);	
// modification de la variable globale TAB_INDEX_TERM_OPER pour ajouter les formes alternatives si elles existent
			if (formes_alternatives.length > 0)	 TAB_INDEX_TERM_OPER[indice1][1][indice2][0] = "("+TAB_INDEX_TERM_OPER[indice1][1][indice2][0]+" or "+formes_alternatives.join (" or ")+")";
// on analyse les mots suivants dans l'index en cours
			if (indice2 < (TAB_INDEX_TERM_OPER[indice1][1].length-1)) recherche_idref (indice1,indice2+1);
// récursion
			else if (indice1 < (TAB_INDEX_TERM_OPER.length-1))  recherche_idref (indice1+1,0);
// on analyse l'index suivant --> récursion
				else fin_traitement ();	
// on a examiné tous les mots de tous les index --> fin du traitement
				
		} // if
		else {
			modifie_affichage_recherche (ERREUR, "Erreur dans la requête idref (statut différent de 200)");
			return;}
	} // function onload
	}); // GM_xmlhttpRequest
} // else
return;
} // fonction

	function interception(evenement){
// fonction appelée lorsque le formulaire de recherche est validé (par un clic ou 'Entrée')
// le paramètre 'evenement' est transmis automatiquement par addEventListener
		
	evenement.preventDefault (); // bloque le fonctionnement normal du formulaire (donc sa validation)
	modifie_affichage_recherche(TRAITEMENT_EN_COURS); // affiche 'traitement en cours'
	var cible = evenement.target; 
// on affecte à 'cible' l'élément html de la page qui vient d'être activé par l'événement Submit --> il s'agit de l'élément FORM, avec toutes ses propriétés : cible.name ; cible.acceptCharset ; cible.action ; cible.enctype ; cible.encoding ; cible.method ; cible.target ; cible.length ; cible.elements.
// Les noms et les valeurs saisies dans les éléments INPUT de ce FORM sont accessibles par cible.elements[].name et cible.elements[].value. Le nombre d'INPUT est donné par cible.length

	var expression= "";
	var nom_element = "";
	var valeur_element = "";
	var temp_valeur = "";
	var temp_index= "";
	var index_term_oper =  []; // "triplet" qui sera rempli avec les index, les termes de recherche et les opérateurs booléens
	var index_trouve = 0;
	var ajoute_triplet = 0;		
	for (var i=0;i<cible.length;i++){	
// on examine chaque paire nom/valeur présente dans le formulaire :
// - les paramètres optionnels vont remplir le tableau TAB_AUTRES_PARAMETRES
// - chaque "triplet" index + termes de recherche + (éventuellement) booléens va remplir temporairement un tableau index_term_oper
// Quand un triplet est complet, il est ajouté au tableau TAB_INDEX_TERM_OPER
		nom_element = cible.elements[i].name;
		valeur_element = cible.elements[i].value;
		switch (nom_element) {
			case "term":
			if (index_trouve == 0) temp_valeur = valeur_element;
// l'expression de recherche est avant l'index dans l'url -> on la garde en mémoire pour l'ajouter quand on aura récupéré l'index
			else {
				index_term_oper.push (valeur_element);
				temp_valeur = "";
				index_trouve=0;}
			break;
			
			case "oper":
			index_term_oper.push (valeur_element);
			ajoute_triplet = 1;
// oper est le 3e terme du triplet, qui est donc complet et doit alimenter le tableau TAB_INDEX_TERM_OPER
			break;
			
			case "index":
			if (temp_valeur !="") {
// l'index est après l'expression de recherche dans l'url -> on inverse
				index_term_oper.push (valeur_element);
				index_term_oper.push (temp_valeur);
				index_trouve=0;}
			else {
				index_term_oper.push (valeur_element);
				index_trouve=1;}
			break;
			default:
// paramètres globaux : ri,session, menu, aspect, npp, ipp, spp, profile, ri
// paramètres de limitation et de tri : limitbox_1, limitbox_2, ultype, uloper, ullimit, ultype, uloper, ullimit, sort
			TAB_AUTRES_PARAMETRES.push (nom_element+"="+encodeURIComponent(valeur_element));
			break;
			
		} // switch

		if ((index_term_oper.length==2) && (i==cible.length-1)) {
// quand on a fini l'analyse de l'url, même sans oper final, on considère qu'on a un triplet
			index_term_oper.push ("");
			ajoute_triplet = 1;
		}				
		if (ajoute_triplet == 1) {
// si un triplet est complet, on alimente le tableau TAB_INDEX_TERM_OPER avec le contenu de index_term_oper
			ajoute_triplet = 0;		
			TAB_INDEX_TERM_OPER.push (index_term_oper.slice(0));
// on réinitialise index_term_oper			
			index_term_oper.length = 0;
		}
	} // for
// paramètre qui est normalement ajouté par le serveur (comment?). utilité à préciser...		
	if (TAB_AUTRES_PARAMETRES.indexOf ("source=~!scdreims") <0 ) TAB_AUTRES_PARAMETRES.push ("source=~!scdreims");

// éliminer les index sans termes de recherche
	for (var i=0;i<TAB_INDEX_TERM_OPER.length;i++) {
		if (elimine_ponctuation_et_espaces(TAB_INDEX_TERM_OPER[i][1])=="") {
			TAB_INDEX_TERM_OPER.splice(i,1);
			i--;}
	}
	var nb_index_remplis = TAB_INDEX_TERM_OPER.length;
	if (nb_index_remplis == 0) {
		modifie_affichage_recherche (AUCUN_INDEX_REMPLI); 
		return;}
// suppression de l'opérateur booléen après le dernier index
	TAB_INDEX_TERM_OPER[TAB_INDEX_TERM_OPER.length-1][2] = ""; 

// dans TAB_INDEX_TERM_OPER, la 2e valeur ('term') peut être une série d'expressions entre "" ou une série de mots
// or chaque mot ou expression doit être traité individuellement par recherche_idref
// donc on transforme la 2e valeur de TAB_INDEX_TERM_OPER par un tableau contenant la liste des mots et expressions recherchées

	for (var i=0;i<TAB_INDEX_TERM_OPER.length;i++) {
		var motif = /([^"\s]+)|("[^"]*")/g ;	// 1 ou plus caractères (tout sauf des " ou des espaces) OU 1 " + 0 ou plus caractères (tout sauf des " ) + 1 "
		var temp_array1 =  [];
		var temp_array2 =  [];
// on découpe l'expression en suivant les ""
		var temp_array1 = TAB_INDEX_TERM_OPER[i][1].match(motif);
// on entoure de guillemets les mots contenant certains caractères (sinon risque de bug) // et on supprime les autres ""
		for (var j=0;j<temp_array1.length;j++) {
			temp_array1[j] = trim ((temp_array1[j])).toLowerCase (); // trim_guillemetsdoubles
// on ne traite que les mots isolés (s'il reste des espaces c'est qu'on a plusieurs mots, la chaine sera de toute façon entourée de guillemets)			
			if (!(/[\s]+/.test (temp_array1[j]))) temp_array1[j] = guillemetise_mots (temp_array1[j]);
		}
		
		var temp_paire = ["",""];
		for (var j=0;j<temp_array1.length;j++) {
// ajout des "and" implicites et remplissage d'un tableau à deux dimensions [valeur] [operande]
			if (est_oper_bool_HIP(temp_array1[j])) temp_paire [1] = temp_array1[j];
			else {
// si les mots sont séparés par un espace, on ajoute un "and" (implicite dans HIP)
				temp_paire [0] = temp_array1[j];
				if ((j<temp_array1.length-1) && (est_oper_bool_HIP(temp_array1[j+1]))==false) temp_paire[1] = "and";
			}
			if (((temp_paire[0] != "") && (temp_paire[1] != "")) || (j == temp_array1.length-1)) {
				temp_array2.push (temp_paire.slice (0));
				temp_paire = ["",""];
			}
		}
// remplace l'expression de recherche par un tableau
		TAB_INDEX_TERM_OPER[i][1] = temp_array2.slice (0);
	}
// on lance la fonction récursive
	recherche_idref (0,0); 	
}


	function cherche_title_par_class (recherche_class, tableau_double,valeur_introuvable) { 
// renvoit un code correspondant à l'onglet (choix = 0) ou au menu (choix = 1) actif

/*
POUR LES ONGLETS : 
/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr/td[2]/a
<a alt="Catalogue" title="Catalogue" class="TabActive">Catalogue</a>
/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[2]/td[2]/table/tbody/tr/td[2]/a
<a alt="Compte utilisateur" title="Compte utilisateur" class="TabActive">Compte utilisateur</a>

POUR LES MENUS : 
/html/body/table[2]/tbody/tr/td/table/tbody/tr/a
*/
		var bon_a = [];
		var liste_a = document.getElementsByTagName('a');
		for (var i = 0; i<liste_a.length ; i++) {
			if (liste_a[i].className ==  recherche_class) {
				bon_a.push (liste_a[i]);
			}
		}
// aucun ou plusieurs (normalement ça ne devrait jamais être plusieurs...) éléments trouvés --> page_introuvable
		if (bon_a.length != 1 ) {return valeur_introuvable;}

		else {
			for (var i = 0; i<tableau_double.length ; i++) {
				if (tableau_double[i][0] == bon_a[0].title) {
					return tableau_double[i][1];
				}
			}
		}		
	} // function cherche_title_par_class
	
	function nb_element_par_contenu (chemin, chaine) {
// renvoit le nombre d'élements du chemin dont le contenu correspond à chaine
// effectue un 'trim' sur le contenu des éléments
		var nb = 0;
		var xpathChemin =chemin;
		var xpathResult = document.evaluate(xpathChemin, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
		var element_a_examiner = xpathResult.iterateNext();
		while (element_a_examiner  != null) {
			if (trim(element_a_examiner.textContent) == chaine) { nb++;}
			element_a_examiner = xpathResult.iterateNext();
		}
		return nb;			
	}	
	
		
	function ajoute_balise_dans_id_connu (id_element_a_modifier, balise, contenu,id_balise,class_balise) {
// Ajoute dans la page un enfant à l'élément ayant comme id "id_element_a_modifier". Le nouvel élément "balise" aura pour "contenu", pur id "id_balise", pour class "class_balise"
// pas de return
// paramètres : id_element_a_modifier, balise, contenu,id_balise,class_balise = String
// id_balise et class_balise peuvent être vides
		var element_parent = document.getElementById (id_element_a_modifier);
		var element_a_ajouter = document.createElement(balise);
		element_a_ajouter.innerHTML = contenu;
		if (id_balise != "") {element_a_ajouter.id = id_balise;}
		if (class_balise != "") {element_a_ajouter.className = class_balise;}	
		element_parent.appendChild(element_a_ajouter);					
	}
	
	function modifie_affichage_recherche (etape,texte,lien) {
// Modifie l'affichage de la page courante en fonction du paramètre étape
// pas de return
// paramètres : etape = Integer --> prend une des valeurs INIT_AFFICHAGE, TRAITEMENT_EN_COURS, REQUETE_IDREF, TRAITEMENT_FINI, AUCUN_INDEX_REMPLI, ERREUR
// texte, lien  = String --> texte ou lien à afficher. Peuvent être vides.

	if (typeof lien == 'undefined') {lien = '';}
	if (typeof texte == 'undefined') {texte = '';}
	switch (etape) {
		case INIT_AFFICHAGE:
// initialisation : ajout d'éléments HTML et du CSS
		ajoute_css_dans_head	('.demibloc { float:left; width: 45%; border : 1px outset black ; padding : 5px ; margin:0; margin-left: 0.5%; margin-right: 0.5%}');
		ajoute_css_dans_head	('.clean { clear:both ;  visibility:hidden ; line-height: 0 ; height : 0}');
		ajoute_css_dans_head	('#div_ancien_center { margin:0 ; padding:0 ; padding-left:5% ; width: auto%}');
		ajoute_css_dans_head	('#div_nouveau_panneau {background:grey}');
		
// Dans HIP, la page recherche simple et avancée est structurée avec un élément TABLE lui-même inclus dans un élement CENTER
// modifications à faire : 
// - remplacer le CENTER par un DIV auquel on attribue un id "div_ancien_center"
// - transformation de <TABLE width="60%"  class="tableBackground" cellpadding="5" border="0"> en <TABLE width = "" class="demibloc" cellpadding="5" border="0"> pour que le tableau soit encadré et ne prenne que la partie gauche de la page
// - ajout d'un DIV avec class="demibloc" et id "div_nouveau_panneau" pour afficher les informations complémentaires à droite de la page

// sélection de l'élément CENTER qui sera modifié (remplacé par un DIV, et contenu enrichi)
		var xpathExpression = '/html/body/form/center';
		var xpathResult = document.evaluate( xpathExpression, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
		var element_a_modifier = xpathResult.iterateNext();
// création d'un DIV avec comme ID "div_ancien_center" et comme contenu le contenu de CENTER
		var tmpdiv = document.createElement("div");
		tmpdiv.setAttribute("id", "div_ancien_center");
		tmpdiv.innerHTML = element_a_modifier.innerHTML;
// remplacement de CENTER par le DIV créé
		var parentDiv = element_a_modifier.parentNode;
		parentDiv.replaceChild(tmpdiv,element_a_modifier);

//il faudrait peut-être attendre un peu (settimeout 0 ?) pour être sûr à 100% que le DOM a été modifié?		

// modification de TABLE
		element_a_modifier = document.getElementById ("div_ancien_center");
		element_a_modifier = first_child (element_a_modifier);
		element_a_modifier.attributes.width.value = "";
		element_a_modifier.className = "tableBackground demibloc";

// ajout d'un DIV pour afficher les informations suppémentaires

		var tmp_nb_maxresult = "";
		for (var i = 1 ; i <MAX_MAXRESULT ; i++) {
			tmp_nb_maxresult = tmp_nb_maxresult + '<option';
			if (i == OPTION_MAXRESULT) {tmp_nb_maxresult = tmp_nb_maxresult + ' selected="selected"';}
			tmp_nb_maxresult = tmp_nb_maxresult + '>'+i+'</option>';
		}
		var tmp_inputs = "";
		var tmp_inputs_txt = ["index mot global (sans diacritiques, sans troncature)", "plusieurs index 'phrase' (avec les diacritiques ; troncature grossière)", "plusieurs index 'phrase' (avec les diacritiques ; troncature plus fine)"];
		for (i = 0 ; i <3 ; i++) {
			tmp_inputs = tmp_inputs + '<input type="radio" name="option_index" value="'+i+'"';
			if (i == OPTION_INDEX) {tmp_inputs = tmp_inputs + ' checked';}
			tmp_inputs = tmp_inputs + ' />'+tmp_inputs_txt[i]+'<br />';
		}
		var tmp_simplification = "";
		var tmp_simplification_txt = ["supprime les parenthèses (dates, fonctions) et ce qui suit la 1re virgule (prénom)", "supprime les parenthèses et leur contenu uniquement", "ne supprime rien (peut être risqué, notamment si les dates de l'entité diffèrent dans le Sudoc et dans le catalogue local)"];
		for (i = 0 ; i <3 ; i++) {
			tmp_simplification = tmp_simplification + '<input type="radio" name="option_simplification" value="'+i+'"';
			if (i == OPTION_SIMPLIFICATION) {tmp_simplification = tmp_simplification + ' checked';}
			tmp_simplification = tmp_simplification + ' />'+tmp_simplification_txt[i]+'<br />';
		}
		
		ajoute_balise_dans_id_connu ("div_ancien_center", "div", '<div><p class="boldBlackFont2">Essai d\'ajout de fonctions avec Greasemonkey.<br \>Script expérimental non destiné aux usagers.</p><ul><li>Récupération des formes d\'autorité dans Idref et intégration des formes utiles dans le catalogue de l\'URCA</li></ul><div><p><a href="http://userscripts.org/scripts/show/110349">Source consultable sur la plateforme Userscript</a>.</p><p><strong>Options pour la requête IDREF :</strong></p><form action="" method="get"><div><label for="OptionMaxResult">- Nombre de résultats à chercher dans idref à chaque requête :</label><select name="OptionMaxResult" id="OptionMaxResult">'+tmp_nb_maxresult+'</select></div><div id="OptionIndex">- Mode d\'interrogation d\'IdRef :<br />'+tmp_inputs+'</div><div id="OptionSimplification">- Simplification des résultats pour éviter d\'en traiter trop :<br />'+tmp_simplification+'</div></form> </div><p>&nbsp;</p><div id="EtatTraitement"><p>Le traitement n\'a pas encore commencé : formulez votre recherche et cliquez sur le bouton "Chercher"</p></div></div>',"div_nouveau_panneau","demibloc");

// ajout de 3 gestionnaires d'événements
		var el = document.getElementById("OptionIndex");
		el.addEventListener ("click", set_option_index, false);
		el = document.getElementById("OptionMaxResult");
		el.addEventListener ("click", set_option_maxresult, false);
		el = document.getElementById("OptionSimplification");
		el.addEventListener ("click", set_option_simplification, false);
								
// pour forcer le DIV principal à s'adapter à son contenu (vérifier si c'est utile...)
		ajoute_balise_dans_id_connu ("div_ancien_center", "div", "&nbsp;","","clean");
		break;	

	case TRAITEMENT_EN_COURS:
// peut-être inutile (ne s'affiche que quelques milisecondes...)
		ajoute_balise_dans_id_connu ("EtatTraitement", "p", 'Le traitement est en cours. Veuillez patienter...');
		break;
	
	case REQUETE_IDREF:
// affichage de la requete idref
		var newcontenu = "";
		if ((texte == "") && (lien = "")) {
			newcontenu = "La requête idref est en cours. Veuillez patienter";}
		else if (lien == "") {
			newcontenu = texte;}
		else newcontenu = texte+'<a href="'+lien+'">'+lien+'</a>';	
		ajoute_balise_dans_id_connu ("EtatTraitement", "p", newcontenu);
		
// ((texte == "") && (lien = ""))?"La requête Idref est en cours. Veuillez patienter":(lien == "")?texte:texte+'<a href="'+lien+'">'+lien+'</a>'
		break;

	case TRAITEMENT_FINI:
		ajoute_balise_dans_id_connu ("EtatTraitement", "p", 'Le traitement est achevé. <br />URL de la requête dans HIP : <a href="'+lien+'">'+lien+'</a><hr />');
		ajoute_balise_dans_id_connu ("EtatTraitement", "p", 'Vous pouvez faire une nouvelle recherche');
		break;

	case AUCUN_INDEX_REMPLI:
		ajoute_balise_dans_id_connu ("EtatTraitement", "p", 'Vous n\'avez saisi aucun terme de recherche valide. Veuillez faire une nouvelle recherche. <hr />');
		break;

	case ERREUR:
		var newcontenu = "";
		if (texte == "") {newcontenu = "ERREUR INCONNUE";}
		else {newcontenu = texte;}
		ajoute_balise_dans_id_connu ("EtatTraitement", "p", newcontenu);
		break;
		
	default:
// si un mauvais code est passé à la fonction
// return false;
	break;
	}
	// return;
	}
	

//
//	Méthodes accessibles depuis le corps du script
//	
		
	this.analyse_page = function () {
// Méthode appelée directement ou par get_onglet, get_page et get_menu (si les les variables onglet, menu et page ne sont pas encore initialisées)
// Analyse la page en cours et remplit les variables onglet, menu et page.

// recherche de l'onglet et du menu actifs
		NB_RESULTATS=null;
		// URL_COURANTE = document.URL;
		ONLGET_COURANT = cherche_title_par_class ("TabActive", [["Catalogue", this.HIP_RECHERCHE], ["Compte utilisateur", this.HIP_COMPTE]],this.HIP_INTROUVABLE);
		MENU_COURANT = cherche_title_par_class ("navBarCurrent", [["Recherche simple",this.HIP_RECHERCHE_SIMPLE], ["Recherche avancée",this.HIP_RECHERCHE_AVANCEE], ["Recherche par liste alphabétique", this.HIP_RECHERCHE_ALPHABETIQUE], ["Votre historique", this.HIP_RECHERCHE_HISTORIQUE],["Aperçu",this.HIP_COMPTE_APERCU], ["Emprunts", this.HIP_COMPTE_EMPRUNTS], ["Réservation",this.HIP_COMPTE_RESERVATION], ["Blocages",this.HIP_COMPTE_BLOCAGES], ["Informations",this.HIP_COMPTE_INFORMATIONS]],this.HIP_INTROUVABLE);
		
// recherche de la page active
// par défaut : type de page introuvable
		PAGE_COURANTE = this.HIP_INTROUVABLE;
		if (ONLGET_COURANT == this.HIP_INTROUVABLE) {
// pas de bandeau bleu
// page "panier" ?
			if (nb_element_par_contenu ("/html/body/form/table[3]/tbody/tr/td/table/tbody/tr/td/a","Ma sélection") == 1) {
				PAGE_COURANTE = this.HIP_MA_SELECTION;
			} 
// ou page d'aide ? (apparaît dans un popup)
			else {
				var liste_meta = document.getElementsByTagName('meta');
				for (var i = 0; i<liste_meta.length ; i++) {
					if (liste_meta[i].content =="RoboHELP by eHelp Corporation - www.ehelp.com") {
						PAGE_COURANTE = this.HIP_AIDE ; 
					}
				}	
			} // else
		} // if
		else {
// par défaut page = menu
			PAGE_COURANTE = MENU_COURANT;
// si on est sur la page de connexion
			if (nb_element_par_contenu("/html/body/form/table/tbody/tr/td/a","Connexion") == 1) {
				PAGE_COURANTE = this.HIP_CONNEXION;
			}
			else {
			if  ((MENU_COURANT == this.HIP_RECHERCHE_SIMPLE) || (MENU_COURANT == this.HIP_RECHERCHE_AVANCEE) || (MENU_COURANT ==this.HIP_RECHERCHE_ALPHABETIQUE)) {
// page de recherche ou page de résultats ?
				if (nb_element_par_contenu("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/a","Recherche:")== 1) {
// page de résultats
					if (MENU_COURANT == this.HIP_RECHERCHE_ALPHABETIQUE) {
						PAGE_COURANTE = this.HIP_RESULTATS_ALPHABETIQUE;
					}
					else {
// par défaut page = this.HIP_RESULTATS_VIDE, nb_resultats = 0
						PAGE_COURANTE = this.HIP_RESULTATS_VIDE;
						NB_RESULTATS = 0;
						var liste_form = document.getElementsByTagName('form');
						for (var i = 0; i<liste_form.length ; i++) {
							if (liste_form[i].name =="full") {
								PAGE_COURANTE = this.HIP_RESULTATS_NOTICE;
								NB_RESULTATS = 1;}
							else {
								if (liste_form[i].name =="mylist") {
									PAGE_COURANTE = this.HIP_RESULTATS_LISTE;
									NB_RESULTATS=null;}
							}
						} // for	 
					} // else
				} // if	
			} // if
			} // else

			if (PAGE_COURANTE == this.HIP_RESULTATS_LISTE) {
				var xpathChemin ="/html/body/table[4]/tbody/tr[2]/td/table/tbody/tr[2]/td/a/b"
				var xpathResult = document.evaluate(xpathChemin, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
				var element_a_examiner = xpathResult.iterateNext();
				if (element_a_examiner  != null) {
					NB_RESULTATS = parseInt(trim(element_a_examiner.textContent),10);}
			}		
			//if ((PAGE_COURANTE == this.HIP_RESULTATS_NOTICE) || (PAGE_COURANTE == this.HIP_RESULTATS_LISTE) || (PAGE_COURANTE == this.HIP_RESULTATS_VIDE ) || (PAGE_COURANTE ==this.HIP_RESULTATS_ALPHABETIQUE)) { }
				
		} // else

	}; // function analyse_page
	
	this.get_onglet = function () {
		if (typeof ONLGET_COURANT == "undefined") {this.analyse_page ();}
		return ONLGET_COURANT;
	};
	
	this.get_menu = function () {
		if (typeof MENU_COURANT == "undefined") {this.analyse_page ();}
		return MENU_COURANT;
	};
	
	this.get_page = function () {
		if (typeof PAGE_COURANTE == "undefined") {this.analyse_page ();}
		return PAGE_COURANTE;
	};
	
	this.get_nb_resultats = function () {
		if (typeof NB_RESULTATS == "undefined") {this.analyse_page ();}
		return NB_RESULTATS;
	};
	
	this.initialise = function () {
// modifie la page pour que lors de la soumission du formulaire de recherche, la fonction interception soit appelée
		if (typeof PAGE_COURANTE == "undefined") {this.analyse_page ();}
		if ((PAGE_COURANTE == this.HIP_RECHERCHE_SIMPLE) || (PAGE_COURANTE == this.HIP_RECHERCHE_AVANCEE)) {
			modifie_affichage_recherche (INIT_AFFICHAGE);
			document.getElementsByTagName("form")[0].addEventListener ("submit", interception , false);
		} 
		else {
			if (PAGE_COURANTE == this.HIP_RESULTATS_NOTICE) {
				modifie_affichage_recherche (INIT_AFFICHAGE);
				document.getElementsByTagName("form")[0].addEventListener ("submit", interception , false);
				
			console.log ('a développer');
			}
			else {
				if  (PAGE_COURANTE == this.HIP_RESULTATS_LISTE) {}
			}
		}
	};

} // fonction globale hip_urca_idref


//--------------------------------------------------------------------
// Corps du script
//--------------------------------------------------------------------

var UrcaIdref = new hip_urca_idref ();

// console.log ('ONGLET '+UrcaIdref.get_onglet ());
// console.log ('MENU '+UrcaIdref.get_menu ());
// console.log ('PAGE '+UrcaIdref.get_page ());
// console.log ('RESULTATS '+UrcaIdref.get_nb_resultats ());

// si on veut limiter le script à la recherche (hors résultats), ajouter la condition suivante :
// if ((UrcaIdref.get_page () == UrcaIdref.HIP_RECHERCHE_SIMPLE) || (UrcaIdref.get_page () == UrcaIdref.HIP_RECHERCHE_AVANCEE))

UrcaIdref.initialise (); // met en place les modifications de la page et active l'interception du formulaire


// Gestion des versions du script : vérification quotidienne des nouvelles versions + ajout d'une ligne dans le menu GM
// source : http://userscripts.org/scripts/review/20145 'Script Update Checker' de Jarett
var SUC_script_num = 110349; // N° du script dans userscript
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0'),10) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1],10);local_version=parseInt(GM_getValue('SUC_current_version', '-1'),10);if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('Une nouvelle version du script "'+script_name+'." est disponible\nVoulez-vous l\'installer maintenant (conseillé) ?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('Pas de nouvelle version pour le script "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (erreur){if (forced)alert('Erreur lors de la recherche des mises à jour :\n'+erreur.message);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Mise à jour manuelle', function(){updateCheck(true);});updateCheck(false);}catch(erreur){}