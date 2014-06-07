// ==UserScript==
// @name           Craiglist hide items
// @namespace      http://userscripts.org/users/75950
// @description    Hide items on craiglist.org
// @include        http://*.craigslist.org/sss*
// ==/UserScript==

var itemsToHide = ['boats','cars','rvs','motorcycles','auto','barter','musical','jewelry','farm','books'];

var theItems = document.getElementsByTagName('blockquote')[1].getElementsByTagName('p');
var theCategories = document.getElementsByTagName('blockquote')[1].getElementsByTagName('small');

for(var i=0; i<theItems.length-1; i++) {
	for(var j=0; j<itemsToHide.length; j++) {
		if(theCategories[i].innerHTML.indexOf(itemsToHide[j])!=-1) theItems[i].style.display = 'none';
	}
}