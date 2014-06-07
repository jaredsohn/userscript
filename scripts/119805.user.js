// ==UserScript== 
// @name           Bau-Mogul Auftragsdauer
// @author         banane4fun
// @description    Setzt bei den Aufträgen die Angebotsdauer auf den maximal Wert.
// @include        http://www.bau-mogul.de/default.aspx?dp=spauftragneu
// ==/UserScript==

var zeitauf = window.location.search;
if (zeitauf == '?dp=spauftragneu') {
	document.getElementById('_ctl46_drpAuftragAusDauer').value="420";
}
