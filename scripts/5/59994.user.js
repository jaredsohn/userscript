// ==UserScript==
// @name            Ogame Good ICEterface
// @description 	Nouvelle fonctions pour OGame v1.1
// @include         http://*.ogame.*/game/index.php?page=*&session=*
// ==/UserScript==


	/*  
	// =======================================================================
	// Changelog
	// =======================================================================
	
	Version 1.4:
	- Nom final
	- Reduction des images du menu planète afin de ne pas déformer la page quand il y a trop de planètes
	- Correction d'un bug CSS
	- Remise à niveau du cadre
	- Version finale pour le re-skin du menu planète
	- Abandon de la version de colorisation (page bien trop longue à charger)
	- Compatibilité avec les autres univers/autres langues
	
	Version 1.3:
	- Premiers test pour un eventuel changement de couleur du cadre et du texte du menu planète
	- Reduction des images
	- Cadre à la taille du bloc
	
	Version 1.2 (non publié):
	- Optimisation du chargement de la page en apellant les ressource serveur d'ogame
	
	Version 1.1:
	- Re-Skin du menu planète
	- La cadre n'était pas à la taille du bloc
	*/

// V.1.4 /

	// =======================================================================
	// Déroulement du script
	// =======================================================================
	
	// Initialisation des variables importantes
	// =======================================================================
	var page_type=0;
	var colo_number=0;
	
	// Appel des fonctions
	// =======================================================================
	set_page_type();
	set_colo_number();
	do_iceterface(colo_number, page_type);
	
	
	
	
	
	// =======================================================================
	// Fonctions du script
	// =======================================================================
	
	// Fonction principales
	// =======================================================================
	
	// Fonction de remplacement des images des planètes
	function do_iceterface(colo_number, page_type){	
		for (i=1, k=2; i!=colo_number; i++, k++) {
			do_modifiy(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV['+page_type+']/DIV[1]/DIV[1]/DIV['+k+']/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/3.gif/,'7.jpg',null);
			set_style(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV['+page_type+']/DIV[1]/DIV[1]/DIV['+k+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"height: 110px;",null,null);
			set_style(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV['+page_type+']/DIV[1]/DIV[1]/DIV['+k+']/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"height: 75px;width: 75px;",null,null);
		}
	}
	
	// Fonction de détection du type de la page
	function set_page_type(){
		var docURL=document.location.href.split("?");
		var ingameURL=docURL[1].split("=");
		var pageURL=ingameURL[1].split("&");
		var Page=pageURL[0];

		if(Page == 'overview') {page_type=8;}
		else {page_type=7;}
	
		return page_type;
	}

	// Fonction de détection du nombre de colonie du joueur
	function set_colo_number(){
		var colo_number=document.getElementById('countColonies').innerHTML.split("<span>");
		var colo_number=colo_number[1].split("/");
		var colo_number=colo_number[0];

		return colo_number;
	}		

	
	// Fonction annexes
	// =======================================================================
	
	// Fonction de changement du style à la volée
	function set_style(doc, element, new_style) {
		element.setAttribute('style', new_style);
	}

	// Fonction de changement d'un éléments html
	function do_modifiy(doc, element, match_re, replace_string) {
		match_re = new RegExp(match_re);
		
		if (element.innerHTML) {
			element.innerHTML = element.innerHTML.replace(match_re, replace_string);
		}
	}

	
	
// Codé par Lord Hinateur sur Notepad ++ (http://notepad-plus.sourceforge.net/fr/site.htm) le 17/10/2009 aux alentours de 3 heure du matin.
// Utilisation réservée aux membres de l'alliance .ICE. et .ICE.w de l'univers Électra.