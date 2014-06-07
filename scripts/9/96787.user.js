// ==UserScript==
// @name		[DS] Menu Resort
// @namespace		agrafix.net
// @description		Sortiert das Hauptmenue so um wie es frueher war :)
// @include		http://de*.die-staemme.de/game.php*
// ==/UserScript==


// @version 1.0

var $ = unsafeWindow.jQuery;

(function(){
	
	function createID(text) {
		text = $.trim(text);
		text = text.split("(")[0];
		
		return text;
	}
	
	var scores = {
		'ausloggen': 1,
		'einstellungen': 2,
		'premium': 3,
		'': 4,
		'rangliste': 5,
		'': 6,
		'stamm': 7,
		'berichte': 8,
		'nachrichten': 9,
		'notizen': 10,
		'übersichten': 11
	};
	
	var MenuRow = $('#menu_row');
	var MenuItems = MenuRow.children('td').get();
	MenuItems.sort(function(a, b) {
	   var compA = $(a).text().toLowerCase();
	   var compB = $(b).text().toLowerCase();
	   
	   var scoreA = scores[createID(compA)];
	   var scoreB = scores[createID(compB)];
	   
	   return (scoreA < scoreB) ? -1 : (scoreA > scoreB) ? 1 : 0;
	})
	$.each(MenuItems, function(idx, itm) { MenuRow.append(itm); });

	
})();