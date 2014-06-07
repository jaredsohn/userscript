// ==UserScript==
// @name           TAMK opintojaksopalaute
// @description    Pre-fills TAMK's opintojaksopalaute form with grade 4's
// @namespace      http://userscripts.org/users/226222
// @include        https://lomake.tamk.fi/*/ojp/annapalautetta.php?toteutus=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

(function() {
	var Elems = document.getElementsByTagName("input");

	for(i = 0; i < Elems.length; i++)
	  if(Elems[i].value == 4)
		Elems[i].checked = "checked";
})();