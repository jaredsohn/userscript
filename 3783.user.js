// ==UserScript==
// @name           Google Toolbar add to Reader OR ig
// @namespace      http://userscripts.org/people/99
// @description    use the subscribe link in the Google Toolbar to subscribe in reader OR ig, not just ig
// @include        http://www.google.com/ig/add?feedurl=*&client=firetools*
// ==/UserScript==
var removeThis = "&client=firetools";var url = window.document.location+"";
var urlRemovalPoint = url.indexOf(removeThis);
if(urlRemovalPoint>0){
	window.document.location=url.substring(0,urlRemovalPoint)+url.substring(urlRemovalPoint+removeThis.length,url.length);
}

