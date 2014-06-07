// ==UserScript==
// @name		Test_apprentissage
// @description	Ne sert strictement à rien
// @author		ren33
// @namespace	http://userscripts.org/scripts/show/106853
// @include		http://*.the-west.*/game.php*
// @include		http://userscripts.org/scripts/review/106853
// @include		http://userscripts.org/scripts/source/106853.meta.js
// @version		1.0
// @website		http://scripts-o-maniacs.leforum.eu
//
// @history		1.0	-

// ==/UserScript==

// Pour la mise à jour
var url = window.location.href;

//Cas du script exécuté dans le jeu (ou exclusiment fenêtre principale : "game.php#")
if (url.indexOf(".the-west.") != -1 && url.indexOf("game.php") != -1) {

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

	//MISE À JOUR
	var VERSION 			= "1.31b" ;
	var NUMERO_SCRIPT		= "106853" ;
	var NB_HISTORY			= 5 ;
	var MENU_maj			= "GZA_" + NUMERO_SCRIPT + "_MAJ" ;
	var DELTA_maj 			= 24 * 3600 ; // 24 h en s

	//CADRE
	var CADRE_bordure_couleur	= "#3B240B ;" ;				//couleur du bord du cadre
	var CADRE_bordure_epaisseur	= "border: 2px solid " ;
	var CADRE_bordure		= CADRE_bordure_epaisseur + CADRE_bordure_couleur ;

	var CADRE_profondeur		= "z-index:2 ;" ;			//2 permet d'activer la souris sur l'image

	var CADRE_position_haut_gauche	= "left: 33px; top: 6px ;" ;		//collé au menu de gauche à côté de "ville"

	var CADRE_position_bas_droite	= "right: 12px ; bottom: 128px ;" ;	//collé au dessus de la croix "réglages cartes"

	var CADRE_image_carre		= 40 ;					//taille côté du carré (43 x 43 par exemple)
	var CADRE_image_fleche		= 20 ;					//taille d'une flèche
	var CADRE_nb_icone_ville	= 1 ;
	var CADRE_nb_icone_SDF		= 1 ;
	var CADRE_image_larg_calcul_vil	= CADRE_image_carre * CADRE_nb_icone_ville + CADRE_image_fleche ;
	var CADRE_image_larg_calcul_SDF = CADRE_image_carre * CADRE_nb_icone_SDF + CADRE_image_fleche ;
	var CADRE_image_largeur		= "width: " + CADRE_image_larg_calcul_vil + "px ;" ;
	var CADRE_image_largeur_SDF	= "width: " + CADRE_image_larg_calcul_SDF + "px ;" ;
	var CADRE_image_hauteur		= "height: " + CADRE_image_carre + "px ;" ;

	var CADRE_position_calc_centre	= 1 ; 					//initialisation sans centrage de la barre
	var CADRE_position_haut_centre	= "top: 6px ; left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ;" ;
	var CADRE_position_haut_centre	= "top: 6px ; left: 50% ;" ;
	var CADRE_position_haut_droite	= "right: 32px ; top: 48px ;" ;		//collé au menu de droite à côté de "Travailler"
	var CADRE_position_bas_gauche	= "left: 12px ; bottom: 98px ;" ;	
	var CADRE_position_bas_centre	= "left: 50% ; margin-left: -" + CADRE_position_calc_centre + "px ; bottom: 86px ;" ;

	CADRE_SDF			= "" ;

	var OUVRE_MARCHAND		= "AjaxWindow.show('item_trader', {action: 'index', h: h});" ;

	//
	//IMAGES DU MENU
	//

	//image de la case
	var MENU_icone_case_plein	= "images/inventory/bag.png" ;
	var MENU_icone_case_vide	= "images/transparent.png" ;
	var MENU_icone_case		= MENU_icone_case_plein ; //Initialisation avec case
	id_contenant 			= new Array();

	var MENU_icone_armurier		= "images/items/right_arm/mini/deringer_accurate.png" ;
	var MENU_icone_tailleur		= "images/items/body/mini/tuetue.png" ;
	var MENU_icone_epicerie		= "images/items/neck/mini/kerchief_blue.png" ;
	var MENU_icone_hotel		= "images/items/right_arm/mini/pillow.png" ;
	var MENU_icone_banque		= "images/items/yield/bag.png" ;
	var MENU_icone_eglise		= "images/items/neck/mini/cross_bronze.png" ;
	var MENU_icone_pompes_funebres	= "images/items/yield/testament.png" ;
	var MENU_icone_salle_poly	= "images/bank/city.png" ;
	var MENU_icone_saloon		= "images/items/yield/beer.png" ;
	var MENU_icone_sherif		= "images/items/yield/sheriffstar.png" ;
	var MENU_icone_marche		= "images/items/yield/stolen_goods.png" ;
	var MENU_icone_marchand		= "images/itemtrader/haendler_btn.jpg" ;
	var MENU_icone_poteau		= "images/items/yield/flag.png" ;
	var MENU_icone_invitations	= "images/items/yield/letter.png" ;
	var MENU_icone_profil		= "images/items/yield/photo.png" ;
	var MENU_icone_artisan		= "images/items/recipe/recipe_smith.png" ;
	var MENU_fleches		= "images/main/map_arrows.png" ;
	var MENU_config			= "images/items/yield/picture.png";

	var OPACITE			= "0.7" ; // 0.7 => légère opacité |  0.2 => presque invisible

	id_fleche_url			= "id_fleche_url" ;
	id_fleche_style			= "id_fleche_style" ;

	//
	// IMAGES DIVERSES
	//
	var ICONE_OK			= "images/icons/accept.png" ;
	var ICONE_PB			= "images/icons/cancel.png" ;


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
			GZA_rcs.MENU_icone_case = MENU_icone_case;
		}
	}

	function lit_menu_bordure()
	{
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_bordure_nom_var) ;
	
		if (donnee != null)
		{
			CADRE_bordure = donnee ;
			GZA_rcs.CADRE_bordure = CADRE_bordure;
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

	function inverse_menu_bordure()
	{

		if (CADRE_bordure == "")
		{
			CADRE_bordure = CADRE_bordure_epaisseur + CADRE_bordure_couleur ;
			window.document.IMG_Etat_bordure.src = ICONE_OK ;
		}
		else
		{
			CADRE_bordure ="" ;
			window.document.IMG_Etat_bordure.src = ICONE_PB ;
		}

		//Stocke le contenu de la variable
		localStorage.setItem(MENU_bordure_nom_var,CADRE_bordure) ;

		//Affichage
		affectation_style() ;

		GZA_rcs.CADRE_bordure = CADRE_bordure ;
	}

	function inverse_menu_case()
	{
		if (MENU_icone_case == MENU_icone_case_vide)
		{
			MENU_icone_case = MENU_icone_case_plein ;	
			window.document.IMG_Etat_icone_case.src = ICONE_OK ;
		}
		else
		{
			MENU_icone_case = MENU_icone_case_vide ;	
			window.document.IMG_Etat_icone_case.src = ICONE_PB ;
		}

		//Stocke le contenu de la variable
		localStorage.setItem(MENU_icone_case_nom_var,MENU_icone_case) ;

		//Affichage
		for (i=0; i<=ICONE_compteur; i++){
			window.document[id_contenant[i]].src = MENU_icone_case ;
	   	} 

		GZA_rcs.MENU_icone_case = MENU_icone_case;
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

		//CADRE_style = CADRE_bordure + CADRE_profondeur + CADRE_position_complet + CADRE_image_largeur + CADRE_image_hauteur + CADRE_SDF;
		lit_menu_bordure();
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
		var difference	= parseInt(heure_prochain_changement_marchand - heure_actuelle) ;

		//Affectation de l'heure, minutes et secondes
		var heures_virgule	= difference / 3600 ;
		var heures 	= parseInt(heures_virgule) ;
		var minutes_virgule = (heures_virgule - heures) * 60 ;
		var minutes	= parseInt(minutes_virgule) ;
		var secondes	= Math.ceil((minutes_virgule - minutes) * 60) ;

		var affichage_temps_marchand = $('temps_marchand');

		//Recherche de ce qu'il affiche
		if (heures > 2)
		{
			//Affichage de la bordure
			document.getElementById("icone_marchand").style.outline = "none" ;

			//Gère le "centrage"
			var espace = "" ;
			if (heures < 10) { var espace = "&nbsp;" ; }

			var duree_affichee = "&gt;&nbsp;" + espace + heures + " h" ;
			var delai = (minutes * 60 + secondes) * 1000 ;
		}
		else if (heures >= 1)
		{
			//Affichage de la bordure
			document.getElementById("icone_marchand").style.outlineColor = "yellow" ;
			document.getElementById("icone_marchand").style.outlineStyle = "dashed" ;
			document.getElementById("icone_marchand").style.outlineWidth = "thin" ;

			var duree_affichee = "> &nbsp;" + heures + " h" ;
			var delai = (minutes * 60 + secondes) * 1000 ;
		}
		else if (minutes >= 1)
		{
			//Affichage de la bordure
			document.getElementById("icone_marchand").style.outlineColor = "orange" ;
			document.getElementById("icone_marchand").style.outlineStyle = "dotted" ;
			document.getElementById("icone_marchand").style.outlineWidth = "medium" ;

			//Gère le "centrage"
			var espace = "" ;
			minutes = minutes + 1 ;	//Ajoute un +1 car 6 min correspond en fait à > 6 min donc 7 min
			if (minutes < 10) { var espace = "&nbsp;" ; }

			var duree_affichee = espace + minutes + " min" ;
			var delai = (secondes + 1) * 1000 ; //Si il reste 5 min 54 s, il déclenche dans 55 s
		}
		else if (secondes > 0)
		{
			//Affichage de la bordure
			document.getElementById("icone_marchand").style.outlineColor = "red" ;
			document.getElementById("icone_marchand").style.outlineStyle = "solid" ;
			document.getElementById("icone_marchand").style.outlineWidth = "thick" ;
		
			//Gère le "centrage"
			var espace = "&nbsp;&nbsp;" ;
			secondes = secondes + 1 ; //Ajoute un +1 car 6 s correspond en fait à > 6 s donc 7 s
			if (secondes < 10) { var espace = "&nbsp;&nbsp;&nbsp;" ; }

			var duree_affichee = espace + secondes + " s" ;
			var delai = 100 ;
		}
		else 
		{
			var duree_affichee = "&nbsp;&nbsp;&nbsp;" + secondes + " s" ;
			var delai = 5 * 1000 ; //Récup dans 5 s

			//Ouverture du marchand
			eval(OUVRE_MARCHAND) ;

			//Récupération de l'heure du marchand
			setTimeout(recup_tps_marchand(),delai);
		}

		affichage_temps_marchand.innerHTML = duree_affichee ;

		//Redéclenche après le délai en millisecondes
		setTimeout(affiche_decompte_marchand,delai);;
	}

	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
			return false ; //Pas de màj à vérifier
		}
		else
		{
			return true ;
		}
	}

	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
		if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
		version_recuperee = unescape(contenu_iframe.data);
		if (version_recuperee.contains(NUMERO_SCRIPT))	//vérifie si le source contient le numéro de script
		{
			script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version

			if (script_version != VERSION) //Ne fais rien si la version est identique
			{
				script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name

				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='overflow:auto;height: 350px;'><TABLE>";

				//Boucle qui parcours les @history
				for (var i=0 ; i<tab_history.length ; i++)
				{
					ligne 				= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-]*\s/)[0] ; //contient les n° de version
					version_history = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces

					//Teste si la version a changée
					if (version_history != version_history_precedente)
					{
						contenu_fenetre_history += "<TR><TD style='font-size:18px;'><B>" + version_history + "&nbsp;:</B></TD><TD></TD></TR>" ;
						nb_version_history_trouvee++ ;
						version_history_precedente = version_history ;
					}

					var reg = new RegExp(version_history + "+\s*(.*)");
					texte_history = ligne.match(reg)[1];
					contenu_fenetre_history += "<TR><TD></TD><TD style='font-size:12px;'>" + texte_history + "</TD></TR>" ;

					//Sort si le nb maximum d'historique est atteint
					if (nb_version_history_trouvee == NB_HISTORY) break ;
				}

				contenu_fenetre_history += "</TABLE></DIV>";

				//Boutons du bas de la fenêtre
				var ferme_maj = "javascript:AjaxWindow.close('Mise_a_jour_" + NUMERO_SCRIPT + "');" ;
				contenu_fenetre_history += "<TABLE WIDTH=100%><TR>" ;
				contenu_fenetre_history += "<TD ALIGN='center'><SPAN><A onClick=\"" + ferme_maj + "\" CLASS='button_wrap button' href='http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js'><SPAN CLASS='button_left'></SPAN><SPAN CLASS='button_middle'>" + CHERCHER + "</SPAN><SPAN CLASS='button_right'></SPAN></SPAN></A></SPAN></TD>"
				contenu_fenetre_history += "<TD ALIGN='center'><SPAN><A CLASS='button_wrap button' href=\""+ ferme_maj + "\"><SPAN CLASS='button_left'></SPAN><SPAN CLASS='button_middle'>" + ANNULER + "</SPAN><SPAN CLASS='button_right'></SPAN><SPAN STYLE='clear: both;'></SPAN></A></SPAN></TD>" ;
				contenu_fenetre_history += "</TR></TABLE>" ;

				//Affichage de la fenêtre
				AjaxWindow.show("Mise_a_jour", undefined, NUMERO_SCRIPT, contenu_fenetre_history, {title:script_nom}, true);

				//Titre en centré
				document.getElementById("window_Mise_a_jour_" + NUMERO_SCRIPT).getElementsByTagName("h2")[0].style.cssText = "text-align:center";

			}

			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	}

	function init_langue()
	{
		var MENU_maj_annuler	= "GZA_" + NUMERO_SCRIPT + "_ANNULER" ;
		var MENU_maj_chercher	= "GZA_" + NUMERO_SCRIPT + "_CHERCHER" ;

		//
		// ANNULER et CHERCHER
		//
		//Lit le contenu des variables
		var donnee_annuler	= localStorage.getItem(MENU_maj_annuler) ;
		var donnee_chercher	= localStorage.getItem(MENU_maj_chercher) ;

		//Rentre dans la boucle si le terme n'a pas été récupéré
		if (donnee_annuler == null)
		{
			//Récupère le terme "annuler"
			new Ajax('game.php?window=skill',
			{
				method:'post',
				data:{},
				onComplete:function(data)
				{
					//Récupération après skill_reskill_cancel_button
					ANNULER = data.match("skill_reskill_cancel_button.*button_middle.*>(\\w+)<.*button_right")[1];
					localStorage.setItem(MENU_maj_annuler,ANNULER) ;
           			}
         		}).request();
		}
		else
		{
			ANNULER	= donnee_annuler ;
		}

		//Rentre dans la boucle si le terme n'a pas été récupéré
		if (donnee_chercher == null)
		{
			//Récupère le terme "chercher"
			new Ajax('game.php?window=ranking',
			{
				method:'post',
				data:{},
				onComplete:function(data)
				{
					//Récupération après skill_reskill_cancel_button
					CHERCHER = data.match("Ranking.rank_choose.*button_middle.*>(\\w+)<.*button_right")[1];
					localStorage.setItem(MENU_maj_chercher,CHERCHER) ;
           			}
         		}).request();
		}
		else
		{
			CHERCHER = donnee_chercher ;
		}
	}

	function recup_tps_marchand()
	{
		new Ajax('game.php?window=item_trader&action=index&h='+h, 
		{
			method:'post',
			data:{},
			onComplete:function(data)
			{
					heure_prochain_changement_marchand = data.match("ItemTraderpage.setTime\\('(\\d+).*")[1];

			//Lance l'affichage du commentaire du marchand
			affiche_decompte_marchand();
			}
		}).request();
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
		MENU_icone_case_nom_var	= "GZA_" + NUMERO_SCRIPT + "_CASE" + num_joueur ;
		MENU_position_nom_var	= "GZA_" + NUMERO_SCRIPT + "_POSITION" + num_joueur ;
		MENU_bordure_nom_var	= "GZA_" + NUMERO_SCRIPT + "_BORDURE" + num_joueur ;

		//Lit le contenu de la variable MENU_icone_case_nom_var
		lit_menu_case();

		//Récupération de la partie "footer_menu_left" de la page initiale
		footer_menu_left = document.getElementById("footer_menu_left");

		if (footer_menu_left)
		{
			//Initialisation de la partie langue
			init_langue();

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
			}

			//
			//Fenêtre de configuration
			//

			//Centrage du titre
			contenu_fenetre = "<SCRIPT TYPE='text/javascript'>";
			contenu_fenetre += "document.getElementById('window_Configuration_" + GZA_rcs.numero_script + "_title').style.cssText='text-align:center'";
			contenu_fenetre += '</script>';

			//Début de la fenêtre
			contenu_fenetre += "<DIV STYLE='overflow:auto;height: 350px;'><TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=0>";
			contenu_fenetre += "<TR ALIGN=CENTER>";

			//Fond de case
			contenu_fenetre += "<TD WIDTH=30%></TD>" ;
			contenu_fenetre += "<TD><IMG SRC='" + MENU_icone_case_plein + "'></TD>";
			contenu_fenetre += "<TD style='vertical-align:bottom;'><A HREF='javascript:GZA_rcs.inverse_menu_case();'><IMG NAME='IMG_Etat_icone_case' SRC='" + MENU_icone_case_vide + "'></A></TD>";

			contenu_fenetre += "<SCRIPT TYPE='text/javascript'>";
			contenu_fenetre += "if (GZA_rcs.MENU_icone_case == GZA_rcs.MENU_icone_case_vide)";
			contenu_fenetre += "{window.document.IMG_Etat_icone_case.src = GZA_rcs.ICONE_PB ;}";
			contenu_fenetre += "else";
			contenu_fenetre += "{window.document.IMG_Etat_icone_case.src = GZA_rcs.ICONE_OK ;}";
			contenu_fenetre += '</script>';

			//Bordure
			contenu_fenetre += "<TD WIDTH=30%></TD>" ;
			contenu_fenetre += "<TD style='" + CADRE_bordure_epaisseur + CADRE_bordure_couleur + "'><IMG WIDTH=73 SRC='" + MENU_icone_case_vide + "'></TD>" ;
			contenu_fenetre += "<TD style='vertical-align:bottom;'><A HREF='javascript:GZA_rcs.inverse_menu_bordure();'><IMG NAME='IMG_Etat_bordure' SRC='" + MENU_icone_case_vide + "'></A></TD>";

			contenu_fenetre += "<SCRIPT TYPE='text/javascript'>";
			contenu_fenetre += "if (GZA_rcs.CADRE_bordure == '')";
			contenu_fenetre += "{window.document.IMG_Etat_bordure.src = GZA_rcs.ICONE_PB ;}";
			contenu_fenetre += "else";
			contenu_fenetre += "{window.document.IMG_Etat_bordure.src = GZA_rcs.ICONE_OK ;}";
			contenu_fenetre += '</script>';

			contenu_fenetre += "<TD WIDTH=30%></TD>" ;
			contenu_fenetre += "</TR>" ;
			contenu_fenetre += "</TABLE>";

			ajoute_case_config("javascript:AjaxWindow.show('Configuration', undefined, GZA_rcs.numero_script, contenu_fenetre,{title:'Raccourcis : ' + AjaxWindow.possibleValues['settings']},true);","case_config");


			//Récupération du texte "Réglages" => AjaxWindow.possibleValues['settings']
			ajout_commentaire_icone("case_config", AjaxWindow.possibleValues['settings']);

			//
			//Flêche de déplacement de la barre
			//

			//Lit le contenu de la variable MENU_position_nom_var
			lit_menu_position();

			//Récupération des informations du marchand
			recup_tps_marchand();

			if (maj_a_verifier())
			{
				//Test safari
				var navigateur = navigator.userAgent.toLowerCase();

				//Initialisation de la variable
				var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

				//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
				var chrome = navigateur.indexOf("chrome") + 1 ;
				if (!chrome)
				{
					var safari = navigateur.indexOf("safari") + 1 ;
					if (safari)
					{
						var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
					}
				}

				//
				//IFRAME
				//

				//Écriture dans une iframe le contenu de la source de l'en-tête du script
				var source_script=document.createElement('iframe');

				source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
				source_script.setAttribute('style', 'display:none;');
				//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
				source_script.src = scr_script ;

				document.body.appendChild(source_script);
				// Fin de la génération de l'iframe

				//Ajout d'un évènement pour récupérer le contenu de l'iframe
				window.addEventListener('message', trait_ret_iframe, true);
			}
		}
	}

	if(typeof window.GZA_rcs == 'undefined')
	{
		try
		{
	        	window.GZA_rcs = new Object();
			GZA_rcs.inverse_menu_case 	= inverse_menu_case ;
			GZA_rcs.deplace_barre 		= deplace_barre ;
			GZA_rcs.inverse_menu_bordure 	= inverse_menu_bordure ;
			GZA_rcs.numero_script		= NUMERO_SCRIPT ;
			GZA_rcs.CADRE_bordure		= CADRE_bordure ;
			GZA_rcs.MENU_icone_case		= MENU_icone_case ;
			GZA_rcs.MENU_icone_case_vide	= MENU_icone_case_vide;
			GZA_rcs.ICONE_OK		= ICONE_OK;
			GZA_rcs.ICONE_PB		= ICONE_PB;
			window.addEvent('domready',programme_principal) ; //Lancement du programme principal une fois la page complètement chargée
	  	}
		catch(e)
		{
			alert(e)
		}
	}
	})
}
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(fonctionGZA2){
		var documentGZA2=document,scriptGZA2=documentGZA2.createElement("script");
		scriptGZA2.type = "application/javascript";
		scriptGZA2.textContent = "("+fonctionGZA2.toString()+")()";
		(documentGZA2.body||documentGZA2.head||documentGZA2.documentElement).appendChild(scriptGZA2);
		scriptGZA2.parentNode.removeChild(scriptGZA2)
	})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	var NUMERO_SCRIPT	= "106853" ;

	/////////////////////////////////////////////////////////
	//
	// FONCTIONS
	//
	/////////////////////////////////////////////////////////

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}

	/////////////////////////////////////////////////////////
	//
	// PROGRAMME PRINCIPAL
	//
	/////////////////////////////////////////////////////////

	envoi_info();
	})
}
