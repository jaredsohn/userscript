// ==UserScript==
// @name           Facebook reklámmentesítő
// @namespace      http://userscripts.org
// @include        *facebook.com*
// ==/UserScript==

function pow () {
	var head4s = document.getElementsByTagName("h4");
	for (var i = head4s.length - 1; i >= 0; i--){
		if (head4s[i].innerHTML == 'Hirdetés') {
			var adNode = head4s[i].parentNode.parentNode.parentNode.parentNode.parentNode; // Lol
			if (adNode && adNode.style.visibility != 'hidden') {
				adNode.style.visibility = 'hidden';
			};
		}
		if (head4s[i].innerHTML == 'Sponsored') {
			var adNode = head4s[i].parentNode.parentNode.parentNode.parentNode.parentNode; // Lol
			if (adNode && adNode.style.visibility != 'hidden') {
				adNode.style.visibility = 'hidden';
			};
		}
	};
}

document.addEventListener("DOMNodeInserted", pow, true);