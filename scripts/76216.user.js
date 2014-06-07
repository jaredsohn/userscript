// ==UserScript==
// @name           DSAcceptAllBargains
// @namespace      DS
// @author         Bananaz
// @description    Ermoeglicht, die ganze Anzahl eines Angebots anzunehmen
// @include        http://de*.die-staemme.de/*screen=market*mode=other_offer*
// ==/UserScript==

   /// ----------------------------------------------------------------------------- ///
  ///      Modifikationen und Weiterverbreitung dieses Scripts benoetigen unbedingt ///
 ///                             die Zustimmung des Autors!                        ///
/// ----------------------------------------------------------------------------- ///


function main() {
	var tables = document.getElementsByTagName('table');
	for (a = 0; a < tables.length; a++) {
		if (tables[a].className == 'vis' && tables[a].getElementsByTagName('th')[3] != undefined && tables[a].getElementsByTagName('th')[3].innerHTML == 'Lieferdauer' && tables[a].getElementsByTagName('th')[2].innerHTML == 'Spieler') {var table = tables[a]; break}
	}
	if (table != undefined) {
		var tr = table.getElementsByTagName('tr');
		var zahl = tr[0].getElementsByTagName('th').length - 1;
		for (a = 1; a < tr.length; a+=2) {
			var td = tr[a].getElementsByTagName('td')[tr[a].getElementsByTagName('td').length-1];
			var text = '<input value="All" size="2" type="button" name="AcceptAllBargains"';
			text += ' onclick="javascript:var anzExec=/(\\d+) mal/;var zahl=' + String(zahl) + ';var input=this.parentNode.getElementsByTagName(\'input\');input[0].value=anzExec.exec(this.parentNode.parentNode.parentNode.innerHTML)[1];this.parentNode.submit();"></form>';
			text = td.innerHTML.replace(/<\/form>/, text);
			td.innerHTML = text;
		}
	}
}

main();