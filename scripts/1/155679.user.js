// ==UserScript==
// @name        Kra v6 - CSS Moderne :  Forum blanc
// @namespace    
// @include     http://www.kraland.org*
// @version     0.201
// @UpdateVersion 3
// @downloadURL http://userscripts.org/scripts/source/155679.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/155679.meta.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @icon		http://www.kramages.org/2/star.gif
// @grant       GM_addStyle
// ==/UserScript==

/* Forum */
GM_addStyle(".forum-cartouche>a>img {border:1px solid gray;box-shadow:3px 3px 15px gray;border-radius:10px;width:80px; height:80px;display:inline-block;}");
GM_addStyle("#central-content {border:none;background:none}");
GM_addStyle("td.forum-message, td.forum-cartouche {border:none;background:rgb(252,251,250)}");
GM_addStyle("td.forum-footer {background:rgb(235,235,235)}");
GM_addStyle("table.forum td {border:none!important}");

jQuery('table.forum').find('td.forum-cartouche').parent().css({borderRadius:'10px',boxShadow:'3px 3px 5px gray'});
jQuery('table.forum').find('td.forum-footer').attr('class','forum-footer forum-button');

// Fix la largeur du forum
GM_addStyle("table.forum {overflow:hidden}");
GM_addStyle("td.forum-message {max-width:700px}");


	