// ==UserScript==
// @name        Message Anim
// @namespace    
// @description Parce que Rs ne fournit pas d'outils à ses anims
// @include     http://www.kraland.org*
// @version     1
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant 		none
// ==/UserScript==

if( jQuery.type(jQuery("#central-text").find('h2').first().html()) !== "undefined" && jQuery("#central-text").find('h2').first().html() == "Recherche" ){
	var id = document.location.href.split('=');
	id = id[2].split('&');
	lien = document.createElement('a');
	jQuery(lien).attr('href',"http://www.kraland.org/order.php?p1=7213&p2=0&p3="+id[0]);
	jQuery(lien).html("Message Anim");
	jQuery('table.forumc').first().find('td').first().append(" | ");
	jQuery('table.forumc').first().find('td').first().append(lien);
}