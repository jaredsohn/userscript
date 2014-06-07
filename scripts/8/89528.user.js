// ==UserScript==
// @name           SwagFilter
// @namespace      MediocreGopher
// @include        http://www.swagbucks.com/?*q=*
// ==/UserScript==

var lis = document.getElementById('innerResults').getElementsByTagName('li');
for( i in lis) {
	if (lis[i].getElementsByClassName('host')[0].getElementsByTagName('a')[0].innerHTML.match(/^Sponsored By/)) {lis[i].style.display='none';}
}
