// ==UserScript==
// @author         Wusel
// @version        1.0.0
// @name           TWB The West Tools
// @namespace      http://tw.wusel.info
// @description    Verschiedene Tools für das Browsergame The West.
// @include        http://de*.the-west.de*
// @scriptsource   http://tw.wusel.info/inc/WuselsTWTools.user.js

// ==/UserScript==

	var alliance_city_main_script = document.createElement("script");
	var alliance_city_create_el_script = document.createElement("script");
	var adress_link_main_script = "http://sirwusel.bplaced.net/tw/inc/wtw_main.js";

// **************************************************************************************

	alliance_city_main_script.setAttribute("src", adress_link_main_script);
	alliance_city_main_script.setAttribute("type", "text/javascript");
	document.getElementsByTagName("head")[0].appendChild(alliance_city_main_script);

