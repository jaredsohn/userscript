// ==UserScript==
// @name        Elisa Viihde improvements
// @namespace   http://vyznev.net/
// @description User interface improvements for elisaviihde.fi
// @version     0.1
// @match       *://*.elisaviihde.fi/etvrecorder/*
// @grant       none
// ==/UserScript==

var inject = function () {
	// make the whole program row clickable, not just the checkbox
	$('tr.programview').on( 'click', function (e) {
		if ( $(e.target).closest('a, input').length ) return;
		var box = $(this).find('td.first input[type=checkbox]:first');
		if ( box.length ) {
			box.trigger( $.Event( 'click', { shiftKey: e.shiftKey } ) );
			return false;
		}
	} );

	// add shift-clicking support
	var lastClicked = null;
	$('tr.programview td.first input[type=checkbox]').on( 'click', function (e) {
		if ( e.shiftKey && lastClicked ) {
			var state = lastClicked.checked;
			var rows = $(this).add(lastClicked).closest('tr.programview').sort(
				function (a,b) { return $(a).index() - $(b).index() }
			);
			if ( rows.length < 2 || rows[0] === rows[1] ) return;
			$(rows[0]).nextUntil(rows[1]).add(rows).
				find('td.first input[type=checkbox]').attr('checked', state);
			return false;
		}
		lastClicked = this;
	} );
	
	// add a second navigation bar at the top of the page
	$('.pagenavi').clone().css('margin', '0 0 15px 0').insertAfter('.rec_header');

	// make pressing enter confirm deletion
	$('.delete_selected').on( 'click', function (e) {
		setTimeout( function () { $('#remove_confirm').focus() }, 100 );
	} );
};

var scriptElem = document.createElement( 'script' );
scriptElem.textContent = "$(" + inject + ");";
document.body.appendChild( scriptElem );
