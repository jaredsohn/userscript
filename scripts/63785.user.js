// ==UserScript==
// @name           Stackoverflow: don't hide any questions when searching
// @namespace      CrazyJugglerDrummer
// @include        http://stackoverflow.com/questions/tagged*
// @include        http://stackoverflow.com/search*
// @include        http://superuser.com/questions/tagged*
// @include        http://superuser.com/search*
// @include        http://serverfault.com/questions/tagged*
// @include        http://serverfault.com/search*
// @include        http://meta.stackoverflow.com/questions/tagged*
// @include        http://meta.stackoverflow.com/search*
// ==/UserScript==

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

var childNodes=document.getElementById("questions").childNodes;

for (var i=1; i<childNodes.length; i+=2) {
	removeClass(childNodes[i],"tagged-ignored-hidden");	
}