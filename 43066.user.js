// ==UserScript==
// @name           pahan
// @namespace      http://nabirecyber.com	
// @description    Turns Google into Pahan
// @include        http://www.google.tld/
// @include        http://www.google.tld/webhp*
// ==/UserScript==

var logo=document.getElementsByTagName("img")[0];
//logo.src="http://www.doogle.org/doogle-300x108.png";
logo.src="http://photos-468.friendster.com/e1/photos/86/49/32519468/34931042356281s.jpg";
logo.height="300";
logo.width="300";

document.title="Doogle";
document.getElementsByTagName("input")[2].value="Doogle Search";