// ==UserScript==
// @name        Kra v6 - Ignore list
// @namespace    
// @description Ignore selected users
// @include     http://www.kraland.org/main.php*
// @version     1.101
// @UpdateVersion 3
// @downloadURL http://userscripts.org/scripts/source/142815.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/142815.meta.js
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var ignoreList = [ "exemple 1" , "exemple 2"];

/* Forum */
jQuery('tr').each(function(){
	if(
		jQuery.inArray(jQuery(this).find("td.forum-cartouche").find('p').first().text(),ignoreList) !== -1
	){
		jQuery(this).next().remove();
		jQuery(this).remove();
	}
});

/* Kramail */
jQuery('tr.forum-c1').find('td').each(function(){if(jQuery.inArray(jQuery(this).text(),ignoreList) !== -1){jQuery(this).parent().remove();}});
jQuery('tr.forum-c2').find('td').each(function(){if(jQuery.inArray(jQuery(this).text(),ignoreList) !== -1){jQuery(this).parent().remove();}});

/* Minichat */
jQuery('#minichat').find('ul').find('li').each(function(){
	jQuery(this).find('.hour').remove();
	if(jQuery.inArray(jQuery(this).find('a').text(),ignoreList) !== -1){
		jQuery(this).next().remove();
		jQuery(this).remove();
	}
});

/* Retrait des modérations */
GM_addStyle(".mod2, .mod3 {display:none}");

/* Retrait des liens de signalement */
jQuery('td.forum-footer').each(function(){jQuery(this).find('a').first().remove();});