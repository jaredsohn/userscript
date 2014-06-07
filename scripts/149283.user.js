// ==UserScript==
// @name        Kra v6 - Accueil Moderne (avec ombres)
// @namespace    
// @include     http://www.kraland.org*
// @version     1.301
// @UpdateVersion 4
// @downloadURL http://userscripts.org/scripts/source/149283.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/149283.meta.js
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

/* Validation d'action */
jQuery(".display").find('h3').remove();

/* Accueil */
GM_addStyle(".left-img {display:none;}");
GM_addStyle(".bx-left:last-child {display:block!important;}");
GM_addStyle(".bx-left {display:none;}");
GM_addStyle(".bx-left {border:1px solid gray;box-shadow:3px 3px 5px gray;}");
GM_addStyle(".right-newsbox {box-shadow:3px 3px 5px gray}");
GM_addStyle(".right-newsbox * {width:auto!important}");
GM_addStyle(".right-box {box-shadow:-3px 3px 5px gray}");

/* Forum */
jQuery('.forum').find('.forum-c1').each(function(){
	if(
		jQuery(this).find('td').first().attr('rowspan') >= 1
		){
		jQuery(this).parent().find('tr').first().find('th').first().attr('colspan',2);
		jQuery(this).parent().parent().find('colgroup').first().remove();
		jQuery(this).find('td').first().remove();
	}
});

/* Minichat */ 
GM_addStyle("#minichat img {width:auto;height:1em;}");
GM_addStyle(".mcbox {height:378px;background:white;overflow:none;}");


/* Rapport d'évènements */
GM_addStyle("#central-content img {max-width:700px}");
GM_addStyle("#central-content pre {max-width:700px;overflow:auto}");
GM_addStyle(".ev_normal .forumc {margin:10px auto}");
