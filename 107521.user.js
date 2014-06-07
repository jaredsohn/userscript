// ==UserScript==
// @name           wrzuta.pl adult block
// @namespace      http://userscripts.org/users/369431
// @include        http://*.wrzuta.pl/*
// ==/UserScript==
if(document.getElementById("adults_overlay").style.display=="block"){
  document.getElementById("adults_overlay").style.display="none";
	document.body.scroll = "";
	document.body.style.overflow = "";
}