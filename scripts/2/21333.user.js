// ==UserScript==
// @name           ShareBase.de Popup Remover
// @namespace      http://userscripts.org/users/43176
// @description    Replaces code of second form, simple solution (2008/01/25)
// @include        http://sharebase.de/*
// ==/UserScript==

// Wait until the page is fully loaded
window.addEventListener('load', function ( e ) {

	var a = document.getElementsByTagName('form')[1];

	if (a && typeof a.innerHTML != "undefined")
	{
		a.innerHTML = '<form name="form" method="post" action=""><input class="button3" id="Send" type="submit" name="machma" value="Download starten"></form>';

	}

},false);