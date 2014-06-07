// ==UserScript==
// @name           UtoThroneSpells
// @namespace      http://utopia-game.com/wol/game/
// @description    Adds spells on the throne page
// @include        http://utopia-game.com/wol/game/throne
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready(function(){
	$.get('/wol/game/council_spells', function(data){
		var spellsDiv = $(data).find('.game-content')
								.find('form')
								.each(function(i, e){ 
									$(e).remove();
								})
								.end();
		$('.game-content').prepend(spellsDiv.html());
	});
});