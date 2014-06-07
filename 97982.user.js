// ==UserScript==
// @name		The West Kısayollar Pro
// @description		Oyuna pozisyonu değiştirilebilir kasaba binalarının kısayollarını ekler.
// @author		Gzahab
// @namespace		http://userscripts.org/scripts/show/92957
// @require		http://userscripts.org/scripts/source/57756.user.js
// @include		http://*.the-west.*/game.php*
// @version		1.30a
// @copyright		2011, Gzahab (http://www.gzahab.fr)
// @licence		(CC); http://creativecommons.org/licenses/by-nc/2.0/fr/
//
// @history		1.30a 	Correctif marchand suite mise à jour The West
// @history		1.30 	Ajout de la flèche de déplacement + icône marchand (avec décompte) + icône profil
// @history             1.29    Création de la barre de raccourcis
// ==/UserScript==

var VERSION = "1.30a" ;

//Création d'une fonction globale pour tout le script
(function(fonctionGZA){
	var documentGZA=document,scriptGZA=documentGZA.createElement("script");
	scriptGZA.type = "application/javascript";
	scriptGZA.textContent = "("+fonctionGZA.toString()+")()";
	(documentGZA.body||documentGZA.head||documentGZA.documentElement).appendChild(scriptGZA);
	scriptGZA.parentNode.removeChild(scriptGZA)
})(function(){

/////////////////////////////////////////////////////////
//
// DÉCLARATION DES CONSTANTES
//
/////////////////////////////////////////////////////////

//CADRE
var CADRE_bordure_couleur	= "#3B240B ;" ;				//couleur du bord du cadre
var CADRE_bordure_epaisseur	= "border: 0px solid " ;
var CADRE_bordure		= CADRE_bordure_epaisseur + CADRE_bordure_couleur ;

var CADRE_profondeur		= "z-index:2 ;" ;			//2 permet d'activer la souris sur l'image

var CADRE_position_haut_gauche	= "left: 33px; top: 6px ;" ;		//collé au menu de gauche à côté de "ville"


var CADRE_position_bas_droite	= "right: 12px ; bottom: 128px ;" ;	//collé au dessus de la croix "réglages cartes"

var CADRE_image_carre		= 40 ;					//taille côté du carré (43 x 43 par exemple)
var CADRE_image_fleche		= 20 ;					//taille d'une flèche
var CADRE_nb_icone_ville	= 14 ;
var CADRE_nb_icone_SDF		= 3 ;
var CADRE_image_larg_calcul_vil	= CADRE_image_carre * CADRE_nb_icone_ville + CADRE_image_fleche ;
var CADRE_image_larg_calcul_SDF = CADRE_image_carre * CADRE_nb_icone_SDF + CADRE_image_fleche ;
var CADRE_image_largeur		= "width: " + CADRE_image_larg_calcul_vil + "px ;" ;
var CADRE_image_largeur_SDF	= "width: " + CADRE_image_larg_calcul_SDF + "px ;" ;
var CADRE_image_hauteur		= "height: " + CADRE_image_carre + "px ;" ;

var CADRE_position_calc_centre	= 1 ; 					//initialisation sans centrage de la barre
var CADRE_position_haut_centre	= "top: 6px ; left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ;" ;
var CADRE_position_haut_centre	= "top: 6px ; left: 50% ;" ;
var CADRE_position_haut_droite	= "right: 33px ; top: 6px ;" ;		//collé au menu de droite à côté de "Travailler"
var CADRE_position_bas_gauche	= "left: 12px ; bottom: 98px ;" ;
var CADRE_position_bas_centre	= "left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ; bottom: 86px ;" ;

CADRE_SDF			= "" ;

var OUVRE_MARCHAND		= "AjaxWindow.show('item_trader', {action: 'index', h: h});" ;
var FERME_MARCHAND 		= "AjaxWindow.close('item_trader');" ;

//
//IMAGES DU MENU
//

//image de la case
var MENU_icone_case_plein	= "images/inventory/bag.png" ;
var MENU_icone_case_vide	= "images/transparent.png" ;
var MENU_icone_case		= MENU_icone_case_plein ; //Initialisation avec case
id_contenant 			= new Array();

var MENU_icone_armurier		= "images/items/right_arm/mini/schofield_accurate.png" ;
var MENU_icone_tailleur		= "images/items/body/mini/shirt_canvas.png" ;
var MENU_icone_epicerie		= "images/items/neck/mini/kerchief_blue.png" ;
var MENU_icone_hotel		= "images/items/head/mini/sleep_cap.png" ;
var MENU_icone_banque		= "images/items/yield/bag.png" ;
var MENU_icone_eglise		= "images/items/yield/bell.png" ;
var MENU_icone_pompes_funebres	= "images/items/yield/spade.png" ;
var MENU_icone_salle_poly	= "images/items/yield/birthcertificate.png" ;
var MENU_icone_saloon		= "images/items/yield/beer.png" ;
var MENU_icone_sherif		= "images/items/yield/sheriffstar.png" ;
var MENU_icone_marche		= "images/items/yield/stolen_goods.png" ;
var MENU_icone_marchand		= "images/items/yield/henrys_packet.png" ;
var MENU_icone_poteau		= "images/items/yield/flag.png" ;
var MENU_icone_invitations	= "images/items/yield/letter.png" ;
var MENU_icone_profil		= "images/items/yield/photo.png" ;
var MENU_fleches		= "images/main/map_arrows.png" ;
var MENU_config			= "images/items/yield/picture.png";

var OPACITE			= "0.8" ; // 0.7 => légère opacité |  0.2 => presque invisible

id_fleche_url			= "id_fleche_url" ;
id_fleche_style			= "id_fleche_style" ;

var APPEL_MARCHAND		= "GZA_rcs.recup_heure_marchand(time, servertime);";

/////////////////////////////////////////////////////////
//
// INITIALISATION DES VARIABLES
//
/////////////////////////////////////////////////////////
var ICONE_compteur			= 0 ;			//Compteur du nombre d'icônes
var MARCHAND_commentaire		= "" ;
var heure_prochain_changement_marchand	= "" ;
var contenu_ItemTraderpage_setTime	= "" ;

/////////////////////////////////////////////////////////
//
// FONCTIONS
//
/////////////////////////////////////////////////////////
function ajoute_icone(lien_url, id_icone, url_image)
{
	menu_raccourcis = document.getElementById('menu_raccourcis');
	if (!menu_raccourcis) return;		//sort si pb

	var icone_menu = document.createElement("a");
	var icone_decalage = ICONE_compteur * CADRE_image_carre ;
	icone_menu.href = lien_url;

	//Création du contenant
	id_contenant[ICONE_compteur] = "ID_CONTENANT" + ICONE_compteur ;
	var icone_contenant = "<img name=\"" + id_contenant[ICONE_compteur] + "\" src=\"" + MENU_icone_case + "\" WIDTH=" + CADRE_image_carre +" HEIGHT=" + CADRE_image_carre + " style=\"position:absolute;z-index:1;left:" + icone_decalage + "px;\">" ;

	//Création du contenu
	var icone_contenu = "<img id=\"" + id_icone + "\" src=\"" + url_image + "\" WIDTH=" + CADRE_image_carre + " HEIGHT=" + CADRE_image_carre + " style='position:absolute;z-index:2;left:" + icone_decalage + "px;'>";

	//Affichage de la case
	icone_menu.innerHTML = icone_contenant + icone_contenu ;
	menu_raccourcis.appendChild(icone_menu);
	ICONE_compteur = ICONE_compteur + 1 ;	//Incrément du compteur d'icônes
}

function ajoute_fleche(lien_url)
{
	menu_raccourcis = document.getElementById('menu_raccourcis');
	if (!menu_raccourcis) return;		//sort si pb

	var menu_fleche = document.createElement("a");
	var icone_decalage = ICONE_compteur * CADRE_image_carre ;
	menu_fleche.href = lien_url ;
	menu_fleche.name = id_fleche_url;

	//Calcul de la taille restante
	var taille_restante = CADRE_image_carre - CADRE_image_fleche ;

	//Création du contenu
	var icone_contenu = "<img name=\"" + id_fleche_style +"\" src=\"images/transparent.png\" style='background-image:url(" + MENU_fleches + "); width:" + CADRE_image_fleche + "px ; height:" + CADRE_image_fleche + "px ; position:absolute;z-index:2;left:" + icone_decalage + "px;top:" + taille_restante +"px;'></A>";

	//Affichage de la fleche
	menu_fleche.innerHTML = icone_contenu ;
	menu_raccourcis.appendChild(menu_fleche);
}

function ajoute_case_config(lien_url, id_icone)
{
	menu_raccourcis = document.getElementById('menu_raccourcis');
	if (!menu_raccourcis) return;		//sort si pb

	var menu_case_config = document.createElement("a");
	var icone_decalage = ICONE_compteur * CADRE_image_carre ;
	menu_case_config.href = lien_url;

	//Création du contenant
	id_contenant[ICONE_compteur] = "ID_CONTENANT" + ICONE_compteur ;
	var icone_contenant = "<img name=\"" + id_contenant[ICONE_compteur] + "\" src=\"" + MENU_icone_case + "\" WIDTH=" + CADRE_image_fleche +" HEIGHT=" + CADRE_image_fleche + " style='position:absolute;z-index:1;left:" + icone_decalage + "px;top:0px;'>" ;

	//Création du contenu
	var icone_contenu = "<img id=\"" + id_icone + "\" src=\"" + MENU_config + "\" WIDTH=" + CADRE_image_fleche +" HEIGHT=" + CADRE_image_fleche + " style='position:absolute;z-index:2;left:" + icone_decalage + "px;top:0px;'>" ;

	//Affichage de la fleche
	menu_case_config.innerHTML = icone_contenant + icone_contenu ;
	menu_raccourcis.appendChild(menu_case_config);
}

function ajout_commentaire_icone(nom_icone, commentaire)
{
	//Ces zones sont créées en début de page
	var commentaire_icone = document.getElementById('left_top');
	var script_commentaire = document.createElement("script");
	script_commentaire.type = "text/javascript";

	//Affiche le commentaire au format "The West"
	script_commentaire.innerHTML = "window.addEvent(\"domready\", function(){ $(\"" + nom_icone + "\").addMousePopup(new MousePopup(\"<B>" + commentaire + "</B>\")); });";
	commentaire_icone.parentNode.insertBefore(script_commentaire, commentaire_icone);
}

function lit_menu_case()
{
	//Lit le contenu de la variable
	var donnee = localStorage.getItem(MENU_icone_case_nom_var) ;

	if (donnee != null)
	{
		MENU_icone_case = donnee ;
	}
}

function lit_menu_position()
{
	//Lit le contenu de la variable
	var donnee = localStorage.getItem(MENU_position_nom_var) ;

	if (donnee != null)
	{
		deplace_barre(donnee); //déplace la barre après le chargement de la page
	}
}

function inverse_menu_case()
{
	if (MENU_icone_case == MENU_icone_case_vide)
	{
		MENU_icone_case = MENU_icone_case_plein ;
	}
	else
	{
		MENU_icone_case = MENU_icone_case_vide ;
	}

	//Stocke le contenu de la variable
	localStorage.setItem(MENU_icone_case_nom_var,MENU_icone_case) ;

	//Affichage
	for (i=0; i<=ICONE_compteur; i++){
		window.document[id_contenant[i]].src = MENU_icone_case ;
   	}
}

function deplace_barre(position)
{
	switch (position) {
		case "haut_gauche":
			CADRE_position = CADRE_position_haut_gauche ;
			var url_fleche = "javascript:GZA_rcs.deplace_barre('haut_centre');";
			var style_fleche = "0px 0px";
		break;
		case "haut_centre":
			CADRE_position = CADRE_position_haut_centre ;
			var url_fleche = "javascript:GZA_rcs.deplace_barre('haut_droite');";
			var style_fleche = "0px 0px";
		break;
		case "haut_droite":
			CADRE_position = CADRE_position_haut_droite ;
			var url_fleche = "javascript:GZA_rcs.deplace_barre('bas_droite');";
			var style_fleche = "20px 0px";
		break;
		case "bas_droite":
			CADRE_position = CADRE_position_bas_droite ;
			var url_fleche = "javascript:GZA_rcs.deplace_barre('bas_centre');";
			var style_fleche = "20px 20px";
		break;
		case "bas_centre":
			CADRE_position = CADRE_position_bas_centre ;
			var url_fleche = "javascript:GZA_rcs.deplace_barre('bas_gauche');";
			var style_fleche = "20px 20px";
		break;
		case "bas_gauche":
			CADRE_position = CADRE_position_bas_gauche ;
			var url_fleche = "javascript:GZA_rcs.deplace_barre('haut_gauche');";
			var style_fleche = "0px 20px";
		break;
		default:
	 		alert ("erreur dans la position, retour au départ") ;
			CADRE_position = CADRE_position_haut_gauche ;
 		break;
	}

	affectation_style() ;

	//Changement du lien de la flèche
	window.document.links[id_fleche_url].href = url_fleche ;
	window.document[id_fleche_style].style.backgroundPosition = style_fleche;

	//Stocke le contenu de la variable
	localStorage.setItem(MENU_position_nom_var,position) ;
}

function affectation_style()
{
	CADRE_position_complet	= CADRE_position + "position: absolute ;" + CADRE_profondeur;

	CADRE_style = CADRE_bordure + CADRE_profondeur + CADRE_position_complet + CADRE_image_largeur + CADRE_image_hauteur + CADRE_SDF;

	//Affectation du style
	menu_raccourcis.setAttribute('style', CADRE_style );

	//Affectation de la transparence
	affectation_transparence();
}

function affectation_transparence()
{
	var transparence = document.getElementById("left_top");
	var transparence_script = document.createElement("script");
	transparence_script.type = "text/javascript" ;
	transparence_script.innerHTML = "window.addEvent(\"domready\", function(){$(\"menu_raccourcis\").setOpacity(" + OPACITE + "); });";
	transparence.parentNode.insertBefore(transparence_script, transparence);
}

function recup_heure_marchand(heure_prochain_changement_marchand_temp,heure_actuelle)
{
	//Affectation de la variable globale à partir de celle récupérée dans la fonction
	heure_prochain_changement_marchand = heure_prochain_changement_marchand_temp ;

	//Ferme le marchand
	eval(FERME_MARCHAND) ;

	//Supprime l'appel à GZA_rcs.recup_heure_marchand
	eval('ItemTraderpage.setTime = ' + contenu_ItemTraderpage_setTime);

	//Lance l'affichage du commentaire du marchand
	affiche_decompte_marchand();
}

function affiche_icone_marchand()
{
	var lien_marchand_javascript = "javascript: " + OUVRE_MARCHAND ;
	//Affichage de l'icône
	ajoute_icone(lien_marchand_javascript,
		"icone_marchand",
		MENU_icone_marchand) ;
	ajout_commentaire_icone("icone_marchand", MARCHAND_commentaire);

	//Le décompte est à nouveau un lien
	var affichage_temps_marchand = document.createElement("a");
	affichage_temps_marchand.href = lien_marchand_javascript ;
	var icone_decalage = (ICONE_compteur -1 ) * CADRE_image_carre ; //Revient sur l'icône marchand

	//Calcul décalage vertical
	var decalage = CADRE_image_carre / 2 - 7 ;

	//Création du contenant
	affichage_temps_marchand.innerHTML = "<span id=\"temps_marchand\" style=\"display: block; text-align: center; position:absolute; z-index:3; left:" + icone_decalage + "px; font-weight:bolder; padding-top: " + decalage + "px; color:white;\"></span>" ;

	//Affichage de la case
	menu_raccourcis.appendChild(affichage_temps_marchand);

	//Vu que c'est un lien, on ajoute le commentaire
	ajout_commentaire_icone("temps_marchand", MARCHAND_commentaire);
}


function affiche_decompte_marchand()
{

	//Calcul du delta entre l'heure actuelle et le prochain changement du marchand
	var heure_actuelle = new Date().getTime() / 1000 ;
	var difference	= Math.round(heure_prochain_changement_marchand - heure_actuelle) ;

	//Affectation de l'heure, minutes et secondes
	var heures 	= Math.floor(difference / 3600);
	var minutes 	= Math.floor(difference / 60) - (heures * 60) ;
	var secondes	= difference - (heures * 3600) - (minutes * 60);

	var affichage_temps_marchand = $('temps_marchand');

	//Recherche de ce qu'il affiche
	if (heures > 2)
	{
		//Gère le "centrage"
		var espace = "" ;
		if (heures < 10) { var espace = "&nbsp;" ; }

		var duree_affichee = "- " + espace + heures + " s" ;
		var delai = (minutes * 60 + secondes) * 1000 ;
	}
	else if (heures >= 1)
	{
		//Affichage de la bordure
		window.document["icone_marchand"].style.outlineColor = "yellow" ;
		window.document["icone_marchand"].style.outlineStyle = "dashed" ;
		window.document["icone_marchand"].style.outlineWidth = "thin" ;

		var duree_affichee = "> &nbsp;" + heures + " h" ;
		var delai = (minutes * 60 + secondes) * 1000 ;
	}
	else if (minutes >= 1)
	{
		//Affichage de la bordure
		window.document["icone_marchand"].style.outlineColor = "orange" ;
		window.document["icone_marchand"].style.outlineStyle = "dotted" ;
		window.document["icone_marchand"].style.outlineWidth = "medium" ;

		//Gère le "centrage"
		var espace = "" ;
		if (minutes < 10) { var espace = "&nbsp;" ; }

		var duree_affichee = espace + minutes + " min" ;
		var delai = secondes * 1000 ;
	}
	else if (secondes > 0)
	{
		//Affichage de la bordure
		window.document["icone_marchand"].style.outlineColor = "red" ;
		window.document["icone_marchand"].style.outlineStyle = "solid" ;
		window.document["icone_marchand"].style.outlineWidth = "thick" ;

		//Gère le "centrage"
		var espace = "&nbsp;&nbsp;" ;
		if (secondes < 10) { var espace = "&nbsp;&nbsp;&nbsp;" ; }

		var duree_affichee = espace + secondes + " s" ;
		var delai = 1000 ;
	}
	else
	{
		var duree_affichee = "&nbsp;&nbsp;&nbsp;" + secondes + " s" ;
		var delai = 1000 ;

		//Ouverture du marchand
		eval(OUVRE_MARCHAND) ;
	}

	affichage_temps_marchand.innerHTML = duree_affichee ;

	//Redéclenche après le délai en millisecondes
	setTimeout(affiche_decompte_marchand,delai);;
}


/////////////////////////////////////////////////////////
//
// PROGRAMME PRINCIPAL
//
/////////////////////////////////////////////////////////

//Création d'une fonction globale pour éviter un pb de timedout
function programme_principal()
{

//Lit le n° du joueur
num_joueur = Character.playerId ;

//
//Le n° du joueur est intégré dans les noms des variables
//
MENU_icone_case_nom_var	= "GZA_MENU_CASE" + num_joueur ;
MENU_position_nom_var	= "GZA_MENU_POSITION" + num_joueur ;

//Lit le contenu de la variable MENU_icone_case_nom_var
lit_menu_case();

//Récupération de la partie "footer_menu_left" de la page initiale
footer_menu_left = document.getElementById("footer_menu_left");

if (footer_menu_left)
{
	//Création du style
	menu_raccourcis = document.createElement("div");
	menu_raccourcis.id = "menu_raccourcis";

	//Récupération du tableau "AjaxWindow.possibleValues" contenant les ALT des bâtiments

	var ALT_commentaires = AjaxWindow.possibleValues;
	MARCHAND_commentaire	= ALT_commentaires["item_trader"];

	//Initialisation en haut à gauche
	CADRE_position = CADRE_position_haut_gauche ;

	//Teste si faisant partie d'une ville ou pas
	if(Character.home_town != null)
	{
		//
		// FAIS PARTIE D'UNE VILLE
		//

		//Calcul de la position centré du cadre
		CADRE_position_calc_centre = CADRE_image_larg_calcul_vil / 2 ;
		CADRE_position_haut_centre	= "top: 6px ; left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ;" ;
		CADRE_position_bas_centre	= "left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ; bottom: 86px ;" ;

		//Affectation du style
		affectation_style("");

		//Insertion du menu
		footer_menu_left.parentNode.insertBefore(menu_raccourcis, footer_menu_left.nextSibling);

		//
		//Ajout des icônes (c'est ici l'ordre d'affichage)
		//

		//Armurier
		ajoute_icone("javascript: AjaxWindow.show(\"building_gunsmith\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_armurier",
			MENU_icone_armurier) ;
		ajout_commentaire_icone("icone_armurier", ALT_commentaires["building_gunsmith"]);

		//Tailleur
		ajoute_icone("javascript: AjaxWindow.show(\"building_tailor\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_tailleur",
			MENU_icone_tailleur) ;
		ajout_commentaire_icone("icone_tailleur", ALT_commentaires["building_tailor"]);

		//Épicerie
		ajoute_icone("javascript: AjaxWindow.show(\"building_general\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_epicerie",
			MENU_icone_epicerie) ;
		ajout_commentaire_icone("icone_epicerie", ALT_commentaires["building_general"]);

		//Hôtel
		ajoute_icone("javascript: AjaxWindow.show(\"building_hotel\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_hotel",
			MENU_icone_hotel) ;
		ajout_commentaire_icone("icone_hotel", ALT_commentaires["building_hotel"]);

		//Banque
		ajoute_icone("javascript: AjaxWindow.show(\"building_bank\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_banque",
			MENU_icone_banque) ;
		ajout_commentaire_icone("icone_banque", ALT_commentaires["building_bank"]);

		//Église
		ajoute_icone("javascript: AjaxWindow.show(\"building_church\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_eglise",
			MENU_icone_eglise) ;
		ajout_commentaire_icone("icone_eglise", ALT_commentaires["building_church"]);

		//Pompes funèbres
		ajoute_icone("javascript: AjaxWindow.show(\"building_mortician\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_pompes_funebres",
			MENU_icone_pompes_funebres) ;
		ajout_commentaire_icone("icone_pompes_funebres", ALT_commentaires["building_mortician"]);

		//Salle polyalente
		ajoute_icone("javascript: AjaxWindow.show(\"building_cityhall\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_salle_poly",
			MENU_icone_salle_poly) ;
		ajout_commentaire_icone("icone_salle_poly", ALT_commentaires["building_cityhall"]);

		//Saloon
		ajoute_icone("javascript: AjaxWindow.show(\"building_saloon\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_saloon",
			MENU_icone_saloon) ;
		ajout_commentaire_icone("icone_saloon", ALT_commentaires["building_saloon"]);

		//Sherif
		ajoute_icone("javascript: AjaxWindow.show(\"building_sheriff\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_sherif",
			MENU_icone_sherif) ;
		ajout_commentaire_icone("icone_sherif", ALT_commentaires["building_sheriff"]);

		//Marché
		ajoute_icone("javascript: AjaxWindow.show(\"building_market\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_marche",
			MENU_icone_marche) ;
		ajout_commentaire_icone("icone_marche", ALT_commentaires["building_market"]);

		//Marchand
		affiche_icone_marchand();

		//Poteau indicateur
		ajoute_icone("javascript: AjaxWindow.show(\"fingerboard\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_poteau",
			MENU_icone_poteau) ;
		ajout_commentaire_icone("icone_poteau", ALT_commentaires["fingerboard"]);

		//Profil
		ajoute_icone("javascript:AjaxWindow.show('profile',{char_id:Character.playerId},Character.playerId);",
			"icone_profil",
			MENU_icone_profil) ;
		ajout_commentaire_icone("icone_profil", ALT_commentaires["profile"]);
	}
	else
	{
		//
		//SANS LOGIS ou SDF
		//

		//Calcul de la position centré du cadre et réaffectation des variables
		CADRE_position_calc_centre = CADRE_image_larg_calcul_SDF / 2 ;
		CADRE_position_haut_centre	= "top: 6px ; left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ;" ;
		CADRE_position_bas_centre	= "left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ; bottom: 86px ;" ;

		//Affectation du style
		CADRE_SDF = CADRE_image_largeur_SDF ;//force le style pour les SDF
		affectation_style();

		//Insertion du menu
		footer_menu_left.parentNode.insertBefore(menu_raccourcis, footer_menu_left.nextSibling);

		//
		//Ajout des icônes (c'est ici l'ordre d'affichage)
		//

		//Invitations
		ajoute_icone("javascript: AjaxWindow.show(\"invitations\");",
			"icone_invitations",
			MENU_icone_invitations) ;
		ajout_commentaire_icone("icone_invitations", ALT_commentaires["invitations"]);

		//Marchand
		affiche_icone_marchand();

		//Profil
		ajoute_icone("javascript:AjaxWindow.show('profile',{char_id:Character.playerId},Character.playerId);",
			"icone_profil",
			MENU_icone_profil) ;
		ajout_commentaire_icone("icone_profil", ALT_commentaires["profile"]);
	}

	//
	//Case de configuration
	//
	//ajoute_case_config("javascript:GZA_rcs.inverse_menu_case();","case_config");

	//Récupération du texte "Réglages"
	var case_config_commentaire = document.getElementById("menu_settings").getElementsByTagName('span')[0].innerHTML ;
	ajout_commentaire_icone("case_config", case_config_commentaire);

	//
	//Flêche de déplacement de la barre
	//
	ajoute_fleche("javascript:GZA_rcs.deplace_barre('haut_centre');");

	//Affectation de la transparence
	affectation_transparence();

	//Lit le contenu de la variable MENU_position_nom_var
	lit_menu_position();

	//Ouverture du marchand et réduction de la fenêtre
	eval(OUVRE_MARCHAND) ;
	AjaxWindow.toggleSize('item_trader','item_trader');

	//
	//Récupération des informations du marchand
	//

	//Sauvegarde la fonction actuelle
	contenu_ItemTraderpage_setTime = ItemTraderpage.setTime.toString();

	//Ajoute avant le dernier caractère "}" afin de lancer la fonction APPEL_MARCHAND
	eval('ItemTraderpage.setTime = ' + ItemTraderpage.setTime.toString().substring(0,ItemTraderpage.setTime.toString().length - 1) + APPEL_MARCHAND + "}");
}

}

if(typeof window.GZA_rcs == 'undefined'){
  try{
        window.GZA_rcs = new Object();
	GZA_rcs.inverse_menu_case 	= inverse_menu_case ;
	GZA_rcs.inverse_menu_case 	= inverse_menu_case ;
	GZA_rcs.deplace_barre		= deplace_barre ;
	GZA_rcs.recup_heure_marchand	= recup_heure_marchand ;
	window.addEvent('domready',programme_principal) ; //Lancement du programme principal une fois la page complètement chargée
  }catch(e){alert(e)}
}
})
