// ==UserScript==
// @name        Promoted deleter
// @namespace   da_promoted_deleter
// @include     http://www.deviantart.com/messages/*
// @version     0.2
// @author      John Wheel
// @description Deletes promoted messages
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

function check_promoteds(){
	$('div.mcbox-thumb').each (function () {
		if ($(this).find ('.mcb-app').text() == "Promoted") {
			$(this).find ('span.mcx').click();
			if ($(this).find ('span.mcx').size () > 0) {
				$(this).find ('span.mcx').click();
			}
		}
	});
};
$('table.tabs-table tr').append ('<td><input id="promoted_delete" type="button" value="Nuke" /></td>');

$('#promoted_delete').on ('click', function (event) {
	event.preventDefault();
	while ($('a.r.page').size () > 0) {
		$('a.r.page').click();
	}
	check_promoteds();
	while ($('a.l.page').size () > 0) {
		$('a.l.page').click();
		check_promoteds();
	}
});

setInterval (function () { check_promoteds(); }, 200);
