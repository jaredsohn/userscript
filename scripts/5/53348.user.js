// ==UserScript==

// @name           Gougou

// @namespace      http://www.google.com

// @include        *down?cid=* 


// ==/UserScript==

var linkText,link;
link=unsafeWindow.furlArr[0];
lite=unsafeWindow.surlArr[0];
linkText = document.getElementById('addr1');
linkText.innerHTML="<a href="+link+">"+lite+"</a>";
