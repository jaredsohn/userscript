// ==UserScript==
// @run-at        document-end
// @name          Ogame expeditions statistics
// @namespace     exp
// @description	  Собирает информацию о результатах экспедиций
// @version       2.1.5
// @updateURL     http://userscripts.org/scripts/source/130174.meta.js
// @installURL    http://userscripts.org/scripts/source/130174.user.js
// @downloadURL   http://userscripts.org/scripts/source/130174.user.js
// @author        Demien
// @include       http://uni*.ogame.*/game/index.php?page=messages*
// @include       http://*-*.ogame.gameforge.com/game/index.php?page=*
// @grant         none

// ==/UserScript==

function runExpeditionScript() {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.src = 'http://logserver.net/plugin/exp.user.js';
	document.body.appendChild(script);
}

runExpeditionScript();