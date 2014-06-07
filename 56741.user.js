// ==UserScript==
// @name           DownHref
// @namespace      http://userscripts.org
// @description    Agrega la ubicación actual en la parte inferior de foros wbb3 pertenecientes a GameForge. 
// @version        1.1
// @author         HuMoR
// @require http://userscripts.org/scripts/source/57756.user.js
// @include        http://board.*/index.php?page=Board*
// @include        http://board.*/index.php?page=Thread*
// @include        http://board.*/index.php?page=Post*
// @history        1.1 - 12/02/10
// @history        1.1 - Update: Actualización del script, añadido nuevo sistema de update (Script Updater). 
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