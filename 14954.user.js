// ==UserScript==
// @name           Aadsas Hidden
// @namespace      http://userscripts.org
// @include        https://aadsas.adea.org/aadsas08/menu.cgi*procedure=displayStatus
// ==/UserScript==

var tables = document.getElementsByTagName("table")
var table = tables[1]
for (i=1; i < table.rows.length; i++){
	var row = table.rows[i]
	row.innerHTML = row.innerHTML
		.replace("<td class=\"regulargreytext\">&nbsp;</td>", "")
		.replace("<td class=\"regulargreytext\">&nbsp;</td>", "")
		.replace("<!--", "")
		.replace("-->", "")
}