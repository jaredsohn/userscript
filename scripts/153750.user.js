// ==UserScript==
// @name           lc_lines
// @namespace      di
// @description    Lined topic on Live-co
// @include        http://live-co.com/viewforum.php?id=*
// @include        http://live-co.com/search.php*
// ==/UserScript==

(function liveco_lines() {
var tds = document.getElementById("vf").getElementsByTagName('DIV')[0].getElementsByTagName('DIV')[0].getElementsByTagName('TABLE')[0].getElementsByTagName('TBODY')[0].getElementsByTagName('tr')

for (i=1;i<=tds.length;i++)
{
	tds[i].getElementsByTagName('td')[0].style.background = '#ddd';
	tds[i].getElementsByTagName('td')[1].style.background = '#ddd';
	tds[i].getElementsByTagName('td')[2].style.background = '#ddd';
	tds[i].getElementsByTagName('td')[3].style.background = '#ddd';
	i = i+1;
}
})();