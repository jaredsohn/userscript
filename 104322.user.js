// ==UserScript==
// @name           Colorier ligne event list chrome VF
// @namespace      Snaquekiller
// @version 0.6
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*/game/index.php?page=buddies*
// @exclude http://*.ogame.*/game/index.php?page=notices*
// @exclude http://*.ogame.*/game/index.php?page=search*
// @exclude http://*.ogame.*/game/index.php?page=combatreport*
// @exclude http://*.ogame.*/game/index.php?page=jump*
// @exclude http://*.ogame.*/game/index.php?page=phalanx*
// @exclude http://*.ogame.*/game/index.php?page=techtree*
// @exclude http://*.ogame.*/game/index.php?page=techinfo*
// @exclude http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude http://*.ogame.*/game/index.php?page=show*
// ==/UserScript==

/** Ceux qui veulent mettre le script que sur la vue générale changer **/
// @include        http://*.ogame.*/game/index.php?page=*
/** par **/
//@include        http://*.ogame.*/game/index.php?page=over*

(function(){
	function insertScript(src) {
		var script = document.createElement("script");
		script.setAttribute("type","text/javascript");
		script.setAttribute("language","javascript");
		script.setAttribute("src",src);
		document.body.appendChild(script);
	}
		insertScript("http://snaquekiller.free.fr/ogame/script/colorier_ligne_event_lis_chrome.user.js");
//insertScript("http://userscripts.org/scripts/source/104325.user.js");

})();