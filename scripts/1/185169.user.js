// ==UserScript==
// @name        Dobrochan Bookmarks Page Updater
// @namespace   dc_bkmrks_updater
// @description Keeps bookmarks page up to date & notifies of changes.
// @include     *dobrochan.*/bookmarks
// @homepage    https://github.com/Unknowny/dobroscript
// @updateURL   https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Bookmarks Page Updater.user.js
// @downloadURL https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Bookmarks Page Updater.user.js
// @version     1.0.3
// ==/UserScript==

var d = document, to = 20000;

function favicBlink() {
	d.title='*'+d.title;
	$(d).one('focus', function(){d.title=d.title.substr(1);});
}

function insertTable(resp) {
	$('table.threadlist tbody').remove();
	$('table.threadlist').append($('tbody', resp));
}

function isAnyChanges(resp) {
	return $('tbody', resp).html() != $('tbody').html() && $('.highlight b', resp).length;
}

function check() {
	$.get(location.href)
		.done(function(resp) {
			if ( isAnyChanges(resp) ){ favicBlink(); insertTable(resp); }
			else { insertTable(resp); }
		})
		.always(function() {
			setTimeout(check, to);
		});
}

setTimeout(check, to);