// ==UserScript==
// @name        Kra v6 - Compact (Forum)
// @namespace    
// @include     http://www.kraland.org*
// @version     0.701
// @UpdateVersion 16
// @downloadURL http://userscripts.org/scripts/source/155155.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/155155.meta.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @icon		http://www.kramages.org/2/star.gif
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addStyle
// ==/UserScript==


if(jQuery.type(jQuery("#central-text").find('h2').first().html()) != "undefined" && jQuery("#central-text").find('h2').first().html() == "Forum") {

	jQuery('#central-text').append(document.createElement('br'));
	jQuery('table.forum').find('tr').first().remove();

	jQuery('table.forum').find('tr').each(function(){		
		if(jQuery.type(jQuery(this).find('th').html()) !== "undefined") {
			// Si l'élément sélectionné est une section, on crée un nouveau bloc qu'on injecte dans la page
			categorie = document.createElement('div');
			jQuery(categorie).attr('class','blocForumV6');
			jQuery('#central-text').append(categorie);
			cat_titre = document.createElement('h2');
			cat_titre_txt = jQuery(this).text();
			jQuery(cat_titre).append(cat_titre_txt);
			jQuery(categorie).append(cat_titre);
			
		} else if(jQuery.type(jQuery(this).find('td').html()) !== "undefined"){
			// Si l'élément sélectionné est un forum
			titre = jQuery(this).find('p').first().find('a');
            forum = document.createElement('div');
            // Le retour de l'ignore list !
            // var ignoreList = ["Entraide","Sciences","Jeux", "Entracte","Loisirs", "Site & Annonces", "Débuter", "Règles", "Bavardage & Divers", "Rencontres Inter-Kralandais (RIK)", "Politique & Société", "Culture", "Histoire"];
            var ignoreList = [''];
            if(jQuery.inArray(titre.text(),ignoreList) !== -1) {
            
               // Si le titre du forum est contenu dans l'ignore list, on process rien !
            
            }else {
			   jQuery(forum).attr('class','forumV6');
			   jQuery(forum).append(titre);
               jQuery(categorie).append(forum);
			}
			
			if(jQuery(this).find('td.c').html() !== "-" && jQuery.type(jQuery(this).find('td.c').find('a').last().html()) != "undefined" ){
				date_msg = jQuery(this).find('td.c').find('a').last();
			} else {
				date_msg = document.createElement('a');
			}
			
			
			// On fait un clone afin de ne pas être affecté par son déplacement
			date_clone = jQuery(date_msg).clone();
			
			// On déplace le lien de date vers la nouvelle interface
			jQuery(forum).append(date_msg);
			jQuery(forum).append(document.createElement('br'));


			// On récupère le seul lien restant dans la dernière colonne
			auteur = jQuery(this).find('td.c').find('a');
            var friendList = ["Satori9960","Kona Mikami", "Lonely the Hutt "];
            if(jQuery.inArray(auteur.text(),friendList) !== -1) {
               auteur.attr('class','friend');
            }
            jQuery(forum).append(auteur);



			// Formattage des dates pour comparaison future
			if(date_clone.html().substr(0,2) == 'Au') {
				date2 = new Date();
				date2.setHours(date_clone.html().substr(13,2));
				date2.setMinutes(date_clone.html().substr(16,2));
			} else if(date_clone.html().substr(0,2) == 'Av') {
				date2 = new Date();
				date2.setDate(new Date().getDate()-2);
				date2.setHours(date_clone.html().substr(12,2));
				date2.setMinutes(date_clone.html().substr(15,2));
			} else if (date_clone.html().substr(0,1) == 'H') {
				date2 = new Date();
				date2.setDate(new Date().getDate()-1);
				date2.setHours(date_clone.html().substr(6,2));
				date2.setMinutes(date_clone.html().substr(9,2));
			} else {
				jour = date_clone.html().substr(0,2);
				heure = date_clone.html().substr(7,2);
				minute = date_clone.html().substr(10,2);
				date2 = new Date();
				date2.setDate(jour);
				date2.setHours(heure);
				date2.setMinutes(minute);
				date2.setFullYear(new Date().getFullYear());
			}
			// Comparaisons des dates entre nouveaux messages et date actuelle
	      if(date2 - new Date(GM_getValue('date')) > 0 ) {
		      jQuery(date_msg).css({fontWeight:'bold'});
		  }		
		} 
	});
	// On supprime l'ancienne interface (le hide donne de meilleures performances sur cet élément en particulier)
   	jQuery("#central-text").find('table.forum').first().hide();
    jQuery("#central-text").find('p.t').first().remove();

	// On injecte le nouveau thème
    GM_addStyle("#central-text {padding:0}");
	GM_addStyle(".forumV6 {position:relative;margin:5px;vertical-align:top;text-align:center;background:white;display:inline-block;width:20%;border:1px solid gray;box-shadow:5px 5px 15px gray}");
    GM_addStyle(".forumV6 a {font-size:10px;}");
    GM_addStyle(".forumV6 a:hover {text-decoration:underline;}");
	GM_addStyle(".forumV6 a:first-child {font-size:14px;border-bottom:1px solid rgb(185, 40, 45);display:block}");
	GM_addStyle(".forumV6 a:last-child {font-size:10px}");
    GM_addStyle(".forumV6 a.friend {font-weight:bold;font-size:12px}");
    GM_addStyle(".forumV6 a:first-child+a>img {top:3px;right:3px;position:absolute}");
	GM_addStyle(".blocForumV6 {width:100%;display:inline-block;margin-bottom:20px}");
	GM_addStyle(".blocForumV6 h2 {padding-left:10px;margin:0;text-align:left;}");

	// On sauvegarde la date actuelle en tant que date de dernière consultation
	GM_setValue('date',new Date().toString());
}
