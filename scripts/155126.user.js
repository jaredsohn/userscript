// ==UserScript==
// @name        Kra v6 - Compact (Personnages)
// @namespace    
// @include     http://www.kraland.org*
// @version     0.61
// @UpdateVersion 18
// @downloadURL http://userscripts.org/scripts/source/155126.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/155126.meta.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @icon		http://www.kramages.org/2/star.gif
// @grant       GM_addStyle
// ==/UserScript==
if(jQuery.type(jQuery('li.on').find('a').html()) != "undefined" && jQuery('li.on').find('a').html().substr(0,3) == "Se " && jQuery.type(jQuery('#mapname').html()) == "undefined"){

	div = document.createElement('div');
	jQuery(div).attr('id','persosV6');
	GM_addStyle("th.thb,th.ths			{font-size:10px;min-width:80px;}");
	GM_addStyle("#persosV6 				{width:100%} ");
	GM_addStyle("#persosV6 a>img 		{width:80px;height:80px}");
	GM_addStyle(".groupeV6 				{text-align:center;background:rgba(0,0,0,0.2);border:1px solid gray;border-radius:5px;vertical-align:top;margin:2px;display:inline-block}");
	GM_addStyle(".persoV6 				{position:relative;background:white;display:inline-block;border:1px solid gray;height:80px;width:80px}");
	GM_addStyle(".stats 				{top:0;right:0;position:absolute}");
	GM_addStyle(".stats br+img			{position:absolute;clip:rect(2px,20px,8px,0px)}");
	GM_addStyle(".bandeauV6 a			{text-align:center;width:100%;position:absolute;bottom:0px;background:rgba(0,0,0,0.5);color:white;text-decoration:none} ");
	GM_addStyle(".bandeauV6 a:hover		{text-decoration:underline}");
	GM_addStyle(".bandeauV6>a>img 		{width:auto!important;height:auto!important}");
	
	// Style des différentes pièces de bâtiment
	GM_addStyle(".levelbox				{border:none}");
	GM_addStyle("#levelcontainer td:first-child 	{box-shadow:none;border:none}");
	GM_addStyle("#levelcontainer td 	{box-shadow:3px 3px 5px gray;border:1px solid gray; border-radius:5px}");
	GM_addStyle(".levelbox_active	{border:2px solid green!important}");
	GM_addStyle(".sl	{margin-bottom:10px}");
	GM_addStyle("#central-text{padding:0 5px}");

	jQuery('div.left-frame').find('table').first().find('tr').each(function(){
		if(jQuery.type(jQuery(this).find('th.thb').html()) !== "undefined" ){
			// Initialisation de la table pour un groupe
			div_groupe = document.createElement('table');
			jQuery(div_groupe).attr('class','groupeV6');
			
			ligne_t = document.createElement('tr');
			jQuery(div_groupe).append(ligne_t);
			
			titre = document.createElement('th');
			jQuery(titre).attr('class','thb');
			jQuery(ligne_t).append(titre);

			terrain = document.createElement('tr');
			jQuery(div_groupe).append(terrain);
			
			ligne_g = document.createElement('tr');
			jQuery(div_groupe).append(ligne_g);
			
			groupe = document.createElement('td');
			jQuery(ligne_g).append(groupe);
			
			jQuery(div).append(div_groupe);
			// Ajout du nom du groupe raccourci
			txt = jQuery(this).find('th.thb').html().replace('Groupe ','');
			jQuery(titre).append(txt);
			
		} else if (jQuery.type(jQuery(this).find('th.ths').html()) !== "undefined"){
			// Ajout du mode de déplacement du Personnage joué
			jQuery(terrain).append(jQuery(this).find('th'));
			jQuery(terrain).html(jQuery(terrain).html().replace("Déplacement : ",""));
			
		} else if(jQuery.type(jQuery(this).find('td').html()) !== "undefined" && jQuery(this).find('td').attr('colspan') !== "2" ){
			// Récupération des caractéristiques du personnage
			portrait = jQuery(this).find('img').first();
			nat = jQuery(this).find('.corner').find('img').first();
			pdv = jQuery(this).find('img[width=20][height=8]');
			stats = document.createElement('div');
			jQuery(stats).attr('class','stats');
			jQuery(stats).append(nat);
			jQuery(stats).append('<br>');
			jQuery(stats).append(pdv);
			
			// Manipulation du nom et du portrait
			lien = jQuery(this).find('td').first().next().find('a');
			jQuery(lien).attr('title',jQuery(lien).html());
			jQuery(portrait).attr('alt',jQuery(lien).html());
			nom = jQuery(lien).clone();
			jQuery(lien).html(portrait);

			
			bandeau = document.createElement('div');
			jQuery(bandeau).attr('class','bandeauV6');
			jQuery(bandeau).html(nom);
			
			// Ajout des diverses caractéristiques au personnage
			perso = document.createElement('div');
			jQuery(perso).attr('class','persoV6');
			jQuery(perso).append(lien);
			jQuery(lien).append(stats);
			jQuery(perso).append(bandeau);
			
			// Ajout du personnage au groupe
			jQuery(groupe).append(perso);
		}
	});
	jQuery('div.left-frame').find('table').first().remove();
	jQuery('div.left-frame').append(div);

	/* Fonction factultative cachée
	jQuery('.groupeV6').each(function(){
		jQuery(this).find('.bandeauV6').find('a').first().css('display','none');
	});
	*/
}