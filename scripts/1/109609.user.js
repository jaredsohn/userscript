// ==UserScript==
// @name           7Geese Whitespace Remover
// @namespace      http://userscripts.org/users/382673
// @description    Removes extra whitespace from the 7Geese website.
// @include        http://*.7geese.com/*
// ==/UserScript==
function trapInsertScript(event) {
	tmp = document.getElementsByTagName('p');
    for (i=0;i<tmp.length;i++){
		if (tmp[i].innerHTML == '&nbsp;' && tmp[i].style.display != 'none') {

			var previousSibling = tmp[i].previousSibling;
			while(previousSibling && previousSibling.nodeType != 1) {
				previousSibling = previousSibling.previousSibling
			}
			
			if (previousSibling.tagName == "BR")
				previousSibling.style.display = 'none';

			
			tmp[i].style.display = 'none';
		}
	}
}
document.addEventListener("DOMNodeInserted", trapInsertScript, true);