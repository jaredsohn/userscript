// ==UserScript==
// @name           remove onfocus on some pages
// @namespace      benneb
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=jumpgate*
// @include        http://*.ogame.fr/game/index.php?page=galaxy*
// @version     1.0.0
// @updateURL      http://userscripts.org/scripts/source/104272.meta.js
// @downloadURL    https://userscripts.org/scripts/source/104272.user.js
// ==/UserScript==

var remove_onfocus = (function(){
	
$('.textinput').each(function () {
	$(this).removeAttr("onfocus");
});

$('.fleetValues').each(function () {
	$(this).removeAttr("onfocus");
});
$('.system_input').each(function () {
	$(this).removeAttr("onfocus");
});


}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + remove_onfocus + ")();";
document.body.appendChild(script);		