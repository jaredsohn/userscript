// ==UserScript==
// @name			Force Password Saving
// @author			Jesse Mandel
// @namespace		http://www.jessemandel.com
// @include *
// @version 1.0
// @description		Forces websites (like banks, etc) to allow password saving. No notification that the page was changed or not, but your browser should now always ask to save your passowords
// ==/UserScript==
var u ='javascript:(function(){var%20a,b,c,d,e,f;a=document.forms;for(c=0;c<a.length;++c){e=a[c];if(e.onsubmit)e.onsubmit="";if(e.attributes["autocomplete"])e.attributes["autocomplete"].value="on";b=e.elements;for(d=0;d<b.length;++d){f=b[d];if(f.attributes["autocomplete"])f.attributes["autocomplete"].value="on"}}})();';
content.document.location.replace(u);