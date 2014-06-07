// ==UserScript==
// @name        Dabs - Hide basket options
// @namespace   photogsy
// @include     http://www.dabs.com/basket
// @include     https://www.dabs.com/basket
// @version     1
// @grant       none
// ==/UserScript==

var kills = ['accessories', 'addons-title', 'accessory-footer'];


// Do not edit below this point.

function killTagsByClass(tagType, tagClass){
	var element = document.getElementsByTagName(tagType);

	for (i=0; i<element.length; i++) {
		if (element[i].className==tagClass) {
			element[i].style.display="none";
		}
	}
}
kills.forEach(function(c){
    killTagsByClass('div', c);    
});