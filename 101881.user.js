// ==UserScript==
// @name           Single Post Viewer
// @namespace      http://www.digitalraven.org
// @description    Adds a "View single post" link to the thread display on RPG.net
// @include        http://forum.rpg.net/showthread.php*
// ==/UserScript==

var searchRE = new RegExp('#post[0-9]+$', 'i');
var replaceText = '\&pp=1';

NewFix();

function NewFix() {
	var postNumbers = document.getElementsByClassName('nodecontrols');
	if (postNumbers.length) {
		for (var i=0;i<postNumbers.length;i++){
			var postLink = postNumbers[i].getElementsByTagName('a');
			postLink[0].href = postLink[0].href.replace(searchRE, replaceText);
		}
	}
}