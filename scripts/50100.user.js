// ==UserScript==
// @author         Christian Daxberger (http://christian-daxberger.de)
// @name           Pafnet.de: Originalnachricht nicht löschen
// @namespace      de.christian-daxberger
// @description    Nimmt automatisch den Haken "Originalnachricht nach dem Antworten löschen" heraus.
// @include        http://*pafnet.de/mod/Messages/compose?reply=*
// ==/UserScript==

var delold = document.getElementsByName('delold');
if (typeof delold != 'undefined') {
	delold[0].checked = false;
}