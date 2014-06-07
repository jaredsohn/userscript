// ==UserScript==
// @name           ING-DiBa: Autovervollständigung für Kontonummer
// @description    Mit diesem Skript merkt sich der Browser auf ing-diba.de eingegebene Kontonummern und bietet die normale Autovervollständigung an
// @version        2.2
// @include        https://banking.ing-diba.de/app/login*
// @grant          none
// ==/UserScript==

var elements = document.getElementsByTagName('input');

for (var i = 0; i < elements.length; ++i) {
	var element = elements[i];
	if (element != null && element.name != null && element.name.match(".*kontonummer.*")) {
		if (element.id != null && element.id.match("id\d*")) {
			element.setAttribute("id", "id1");
		}
		element.setAttribute("autocomplete", "on");
	}
}
