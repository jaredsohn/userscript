// ==UserScript==
// @name           allegro search
// @namespace      c:\as.user.js
// @description    dodaje link "szukaj w zakonczonych aukcjach"
// @include        http://*allegro.pl/listing.php/search*
// ==/UserScript==

function getElementsByClass(searchClass) {
	var classElements = new Array();
	var els = document.getElementsByTagName('*');
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var nowylink = document.createElement('nl');
var adres = '';
var tekst = 'Szukaj w zako&#324czonych aukcjach';
if (document.location.href.search('closed=1')!=-1)
{
	adres = document.location.href.replace('closed=1','closed=0');
	tekst = 'Szukaj w trwaj&#261cych aukcjach';
}
else if (document.location.href.search('closed=0')!=-1)
{
	adres = document.location.href.replace('closed=0','closed=1');
}
else 
{
	adres = document.location+'&closed=1';
}

nowylink.innerHTML = '<a href="'+adres+'" style="color: #FFFFFF;font-size:9pt;margin-left:10px;">'+tekst+'</a>';
var f = getElementsByClass('small');
f[2].parentNode.insertBefore(nowylink,f[2].nextSibling);