// ==UserScript==
// @name           SimpleUpload.net Popup Remover
// @namespace      http://userscripts.org/users/43176
// @description    Replaces code of first form, simple solution (2008/01/25)
// @include        http://www.simpleupload.net/*
// ==/UserScript==


// Wait until the page is fully loaded
window.addEventListener('load', function ( e ) {

	var a = document.getElementsByTagName('form')[0];

	if (a && typeof a.innerHTML != "undefined")
	{
		a.innerHTML = '<form method="POST" action="http://www.simpleupload.net/"><input type="hidden" name="download" value="true"><input type="text" name="imagecode"><input name="submit" type="submit" value="Download starten!" ></form>';

	}

},false);