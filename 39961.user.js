// ==UserScript==
// @name           j remover
// @namespace      http://userscripts.org
// @description    removes j.s from paragraphs
// @include        *
// ==/UserScript==

(function() {
var els = document.getElementsByTagName("p");
var i;
for (i=0;i<els.length;i++) {
//while (document.body.innerHTML.search('j')>-1) {
	els[i].innerHTML=els[i].innerHTML.replace(/[jJ]/g, ' ');
	//els[i].innerHTML=els[i].innerHTML.replace(/J/g, ' ');
}
//alert('yo');
})();