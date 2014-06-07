// ==UserScript==
// @name           Bookmarkletmaker for UserScripts.org
// @include           *userscripts.org*
// ==/UserScript==                
var url = window.location.href;
if (url.indexOf('userscripts') >=0) {
var id = url.split("http://userscripts.org/scripts/show/")[1];
window.location = "#removeme_javascript: var s=document.createElement('script'); s.src='http://ab.lage.fuenfundfuenfzig.googlepages.com/GM-Emulator.js'; document.getElementsByTagName('head')[0].appendChild(s);void(0); var s=document.createElement('script'); s.src='http://userscripts.org/scripts/source/"+id+".user.js'; document.getElementsByTagName('head')[0].appendChild(s);void(0);";
};