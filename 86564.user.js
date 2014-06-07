// ==UserScript==
// @name           DownHref
// @namespace      http://userscripts.org
// @description    Agrega la ubicación actual en la parte inferior de foros wbb3 pertenecientes a GameForge. 
// @version        1.2
// @author         HuMoR (modificado por vjrus)
// @require http://userscripts.org/scripts/source/57756.user.js
// @include        http://board.*/board*
// @history        1.1 - 12/02/10
// @history        1.2 - Funciona para la nueva version del foro
// ==/UserScript==

ScriptUpdater.check(56741,1.1);

function addChildBoardNode() {
	var clase = document.getElementsByClassName('breadCrumbs')[0];
	var main = document.getElementsByClassName('quickJump');
	var cloneNode = clase.cloneNode(true);
	var ln = main.length;
	main[0].parentNode.appendChild(cloneNode);
}

addChildBoardNode();