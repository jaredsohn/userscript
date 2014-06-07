// ==UserScript==
// @name           Ftri-net Google
// @namespace      http://nabirecyber.com	
// @description    Turns Google into Ftrinet
// @include        http://www.google.tld/
// @include        http://www.google.tld/webhp*
// ==/UserScript==

var logo=document.getElementsByTagName("img")[0];
//logo.src="http://www.doogle.org/doogle-300x108.png";
logo.src="http://img242.imageshack.us/img242/5988/googlehacked2.jpg";
logo.height="300";
logo.width="300";

document.title="Doogle";
document.getElementsByTagName("input")[2].value="Doogle Search";