// ==UserScript==
// @name           7Geese 2.0
// @namespace      http://userscripts.org/users/382673
// @description    Makes 7Geese 2X as awesome.
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
	
	tmp = document.getElementsByClassName('wallPost');
	for (i=0;i<tmp.length;i++){
		tmp[i].style.backgroundImage = "url('http://placekitten.com/g/37/37')";
	}
	
	tmp = document.getElementsByClassName('delegateeImage');
	for (i=0;i<tmp.length;i++){
		tmp[i].src = "http://placekitten.com/g/37/37";
	}

}
document.addEventListener("DOMNodeInserted", trapInsertScript, true);