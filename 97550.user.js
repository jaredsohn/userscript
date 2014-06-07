// ==UserScript==
// @name           Facebook de-ad
// @namespace      http://userscripts.org
// @include        *facebook.com*
// @grant          none
// ==/UserScript==

function recur_parent(node, num) {
    if (num > 0) {
        return recur_parent(node.parentNode, num-1);
    } else {
        return node;
    }
}

function has_class(element, className){
    spaced_element_class = " " + element.className + " "
    spaced_class = " " + className + " "
    return spaced_element_class.indexOf(spaced_class) > -1
}

function pow () {
	var allspans = document.getElementsByTagName("span");
	for (var i = allspans.length - 1; i >= 0; i--){
	    if(!has_class(allspans[i], "adsCategoryTitleLink")){
	        continue;  // Decrease lag
	    }
		if (allspans[i].innerHTML == 'Sponsored') {
			var adNode = recur_parent(allspans[i], 8);
			if (adNode && adNode.style.visibility != 'hidden') {
				adNode.style.visibility = 'hidden';
			};
		}
	};
}

document.addEventListener("DOMNodeInserted", pow, true);