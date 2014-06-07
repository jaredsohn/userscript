// ==UserScript==
// @name           DS Filtern von Berichten
// @description    Filtert Berichte
// @author         Michael Richter
// @namespace      http://osor.de/
// @include        http://de*.die-staemme.de/game.php?*screen=report*
// @include        http://*.staemme.ch/game.php?*screen=report*
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function(){

	var $x = function(p, context) {
		if(!context)
			context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	};
	
	var el = $x('//form[contains(@action,"action=del_arch")]/table[2]');
	if(el.length == 0) {
		return;
	}
	var div = document.createElement('div');
	var input = document.createElement('input');
	input.addEventListener('keypress', function(evt){
		if(evt.keyCode == 13) {
			evt.preventDefault();
		}
	}, false);
	input.addEventListener('keyup', function(evt){
		var reports = $x('//a[contains(@href,"&view=")]');
		if(reports.length == 0) {
			return;
		}
		for(var i = 0; i < reports.length; i++) {
			if(reports[i].textContent.toLowerCase().indexOf(evt.target.value.toLowerCase()) < 0) {
				reports[i].parentNode.parentNode.style.display = 'none';
			} else {
				reports[i].parentNode.parentNode.style.display = 'table-row';
			}
		}
	}, false);
	div.setAttribute('style', 'padding: 3px;');
	div.appendChild(document.createTextNode('Filter: '));
	div.appendChild(input);
	el[0].parentNode.insertBefore(div, el[0]);

})();