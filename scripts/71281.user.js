// ==UserScript==
// @name           Share This Sucks
// @namespace      scottmweaver
// @description    Removes the Share This icon from all sites.
// @include        *
// ==/UserScript==

var apples = document.getElementsByTagName('span');
var mangos = document.getElementsByTagName('a');
var bananas = document.getElementsByClassName('shareThis');
var oranges = document.getElementsByClassName('addthis_button');

for(i=0;i<apples.length;i++)
	if(apples[i].id.indexOf('sharethis')>=0)
		apples[i].parentNode.removeChild(apples[i]);

for(i=0;i<mangos.length;i++)
	if(mangos[i].href.indexOf('addthis.com')>=0||mangos[i].href.indexOf('addtoany.com')>=0||mangos[i].href.indexOf('a2a_dd')>=0)
		mangos[i].parentNode.removeChild(mangos[i]);


for(i=0;i<bananas.length;i++)
		bananas[i].parentNode.removeChild(bananas[i]);

for(i=0;i<oranges.length;i++)
		oranges[i].parentNode.removeChild(oranges[i]);