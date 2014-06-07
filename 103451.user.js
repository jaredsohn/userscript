// ==UserScript==
// @name OGame Redesign : keyboard shortcuts for Chrome
// @namespace http://userscripts.org/users/36331
// @description OGame : keyboard shortcuts for Chrome
// @date 2010-11-24
// @creator Black Cat & Vess
// @include http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function(){

	function insertScript(src) {
		var script = document.createElement("script");
		script.setAttribute("type","text/javascript");
		script.setAttribute("language","javascript");
		script.setAttribute("src",src);
		document.body.appendChild(script);
	}
		insertScript("http://userscripts.org/scripts/source/83284.user.js");
})();