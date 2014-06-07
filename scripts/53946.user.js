// ==UserScript==
// @name           Tribal$ouL Filtro
// @description    Filtro de palabras, para buscar informes.
// @author         Michael Richter, edited by Soul Assassin
// @namespace      http://userscripts.org/users/53237
// @Version	   V.1.0. beta
// @copyright      Copyright (c) 2009, Soul Assassin
// @include        http://es*.guerrastribales.es/game.php?*screen=report*
// ==/UserScript==

// ------------------------------------------------------------ //
//  Se autoriza la modificacion de este script para su mejora   //
// -------------------------------------------------------------//

//<>==========================================================<>//
//////////////////////////////////////////////////////////////////
//////////<>===========================================<>/////////
///////<============= Tribal$oul Filtro V.1.0 =============>//////
/////////<===============================================>////////
/////////<============= by Soul Assassin ================>////////
//////////<>===========================================<>/////////
//////////////////////////////////////////////////////////////////
//<>==========================================================<>//

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
	div.setAttribute('style', 'padding: 3px; font-style:italic; font-weight:bold;');
	div.appendChild(document.createTextNode('Filtro Informes: '));
	div.appendChild(input);
	el[0].parentNode.insertBefore(div, el[0]);

})();