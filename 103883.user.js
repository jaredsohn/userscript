// ==UserScript==
// @name		Ikony 
// @description		Script pour The West : Raccourcis [SOM - Scripts-O-Maniacs] - (multilingue) (version 1.29)
// @author		Gzahab
// @namespace		http://userscripts.org/scripts/show/92957
// @require		http://userscripts.org/scripts/source/57756.user.js
// @include		http://*.the-west.*/game.php*
// @version		1.29
// @copyright		2010, Gzahab (http://www.gzahab.fr)
// @website		http://scripts-o-maniacs.leforum.eu
// @licence		(CC); http://creativecommons.org/licenses/by-nc/2.0/fr/
//
// @history		1.29	Création de la barre de raccourcis
// ==/UserScript==

var VERSION = "1.29" ;

//Création d'une fonction globale pour tout le script
(function(fonctionGZA){
	var documentGZA=document,scriptGZA=documentGZA.createElement("script");
	scriptGZA.setAttribute("type","application/javascript");
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
var CADRE_bordure_couleur	= "#3B240B ;" ;				//couleur du bord du cadre 3B240B
var CADRE_bordure_epaisseur	= "border: 4px solid" ;
var CADRE_bordure		= CADRE_bordure_epaisseur + CADRE_bordure_couleur ;

var CADRE_profondeur		= "z-index:2 ;" ;			//2 permet d'activer la souris sur l'image

var CADRE_position_haut_gauche	= "left: 300px; top: -81px ;" ;	//collé au menu de gauche à côté de "ville"
var CADRE_position_haut_droite	= "right: 33px ; top: 6px ;" ;		//collé au menu de droite à côté de "Travailler"
var CADRE_position_bas_gauche	= "left: 12px ; bottom: 98px ;" ;	
var CADRE_position_bas_droite	= "right: 12px ; bottom: 128px ;" ;	//collé au dessus de la croix "réglages cartes"
var CADRE_position		= CADRE_position_haut_gauche  + "position: absolute ;" + CADRE_profondeur;

var CADRE_image_carre		= 35 ;					//taille côté du carré (43 x 43 par exemple)
var CADRE_image_largeur_calcul	= CADRE_image_carre * 13 ;
var CADRE_image_largeur		= "width: " + CADRE_image_largeur_calcul + "px ;" ;
var CADRE_image_largeur_1_case	= "width: " + CADRE_image_carre + "px ;" ;
var CADRE_image_hauteur		= "height: " + CADRE_image_carre + "px ;" ;

var CADRE_style = CADRE_bordure + CADRE_profondeur + CADRE_position + CADRE_image_largeur + CADRE_image_hauteur ;

//IMAGES DU MENU
var MENU_icone_case		= "images/inventory/bag.png" ;	//image de la case 
var MENU_icone_armurier		= "images/items/right_arm/mini/deringer_accurate.png" ;
var MENU_icone_tailleur		= "images/items/body/mini/tatter_blue.png" ;
var MENU_icone_epicerie		= "images/items/neck/mini/fly_black.png" ;
var MENU_icone_hotel		= "images/items/right_arm/mini/pillow.png" ;
var MENU_icone_banque		= "images/items/yield/bag.png" ;
var MENU_icone_eglise		= "images/items/yield/mini/woodcross.png" ;
var MENU_icone_pompes_funebres	= "images/items/yield/testament.png" ;
var MENU_icone_salle_poly	= "images/items/yield/wolf_geislein.png" ;
var MENU_icone_saloon		= "images/items/right_arm/mini/brassknuckles.png" ;
var MENU_icone_sherif		= "images/items/yield/phantomdrawing.png" ;
var MENU_icone_marche		= "images/items/yield/stolen_goods.png" ;
var MENU_icone_poteau		= "images/items/yield/compass.png" ;
var MENU_icone_poteau1		= "images/items/yield/forge.png" ;
var MENU_icone_invitations	= "images/items/yield/letter.png" ;

var OPACITE			= "1" ; // 0.7 => légère opacité |  0.2 => presque invisible

/////////////////////////////////////////////////////////
//
// INITIALISATION DES VARIABLES
//
/////////////////////////////////////////////////////////
var ICONE_compteur		= 0 ;					//Compteur du nombre d'icônes

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
	icone_menu.setAttribute("href", lien_url);

	//Création du contenant
	var icone_contenant = "<img src=\"" + MENU_icone_case + "\" WIDTH=" + CADRE_image_carre +" HEIGHT=" + CADRE_image_carre + "style=\"position:absolute;z-index:1;left:" + icone_decalage + "px;\">" ;

	//Création du contenu
	var icone_contenu = "<img id=\"" + id_icone + "\" src=\"" + url_image + "\" WIDTH=" + CADRE_image_carre + " HEIGHT=" + CADRE_image_carre + " style='position:absolute;z-index:2;left:" + icone_decalage + "px;'>";

	//Affichage de la case
	icone_menu.innerHTML = icone_contenant + icone_contenu ;
	menu_raccourcis.appendChild(icone_menu);
	ICONE_compteur = ICONE_compteur + 1 ;	//Incrément du compteur d'icônes
}

function ajout_commentaire_icone(nom_icone, commentaire)
{
	//Ces zones sont créées en début de page
	var commentaire_icone = document.getElementById('left_top');
	var script_commentaire = document.createElement("script");
	script_commentaire.setAttribute("type", "text/javascript");

	//Affiche le commentaire au format "The West"
	script_commentaire.innerHTML = "window.addEvent(\"domready\", function(){ $(\"" + nom_icone + "\").addMousePopup(new MousePopup(\"<B>" + commentaire + "</B>\")); });";
	commentaire_icone.parentNode.insertBefore(script_commentaire, commentaire_icone);
}

/////////////////////////////////////////////////////////
//
// PROGRAMME PRINCIPAL
//
/////////////////////////////////////////////////////////

//Création d'une fonction globale pour éviter un pb de timedout
function programme_principal() 
{

//Récupération de la partie "footer_menu_left" de la page initiale
footer_menu_left = document.getElementById("footer_menu_left");

if (footer_menu_left)
{
	//Création du style
	menu_raccourcis = document.createElement("div");
	menu_raccourcis.setAttribute("id", "menu_raccourcis");

	//Récupération du tableau "AjaxWindow.possibleValues" contenant les ALT des bâtiments

	var ALT_commentaires = AjaxWindow.possibleValues; 

	//Teste si faisant partie d'une ville ou pas
	if(Character.home_town != null)
	{
		//
		// FAIS PARTIE D'UNE VILLE
		//

		//Affectation du style
		menu_raccourcis.setAttribute('style', CADRE_style );

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

		//Poteau indicateur
		ajoute_icone("javascript: AjaxWindow.show(\"fingerboard\",{town_id:Character.home_town.town_id},Character.home_town.town_id);",
			"icone_poteau",
			MENU_icone_poteau) ;
		ajout_commentaire_icone("icone_poteau", ALT_commentaires["fingerboard"]);

		//Poteau1 indicateur
		ajoute_icone("javascript:Crafting.open()",
			"icone_poteau1",
			MENU_icone_poteau1) ;
		ajout_commentaire_icone("icone_poteau1", ALT_commentaires["crafting"]);

	}
	else
	{
		//
		//SANS LOGIS ou SDF
		//

		//Affectation du style
		menu_raccourcis.setAttribute('style', CADRE_style + CADRE_image_largeur_1_case); //force le style en une case de long

		//Insertion du menu
		footer_menu_left.parentNode.insertBefore(menu_raccourcis, footer_menu_left.nextSibling);

		//
		//Ajout des icônes (c'est ici l'ordre d'affichage)
		//

		//Poteau indicateur
		ajoute_icone("javascript: AjaxWindow.show(\"invitations\");",
			"icone_invitations",
			MENU_icone_invitations) ;
		ajout_commentaire_icone("icone_invitations", ALT_commentaires["invitations"]);
	}

	//
	//Affiche l'opacité du menu
	//
	//Créé en début de page
	var transparence = document.getElementById("left_top");
	var transparence_script = document.createElement("script");
	transparence_script.setAttribute("type", "text/javascript");
	transparence_script.innerHTML = "window.addEvent(\"domready\", function(){$(\"menu_raccourcis\").setOpacity(" + OPACITE + "); });";
	transparence.parentNode.insertBefore(transparence_script, transparence);
}
}
window.addEvent('domready',programme_principal) ; //Lancement du programme principal une fois la page complètement chargée

})
//Mise à jour en automatique
ScriptUpdater.check(92957, VERSION);  

