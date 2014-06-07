// ==UserScript==
// @name        FanFiction Remove Twilight from Users
// @namespace   MeinHimmel,2007-08-05:greasemonkey
// @grant none
// @description Removes Twilight crossovers from users profiles
// @include http://www.fanfiction.net/u/*/*
// ==/UserScript==

function remove_twilight () {
	var fics = document.getElementsByTagName('blockquote');
	var len = fics.length;
	for(var i = 0; i < len - 1; i++) {
		var t = fics[i].querySelector('span').innerHTML;
		if ( !t ) { continue; }
		t = t.substr(0, t.indexOf(' - Fiction Rated:'));
		if ( t.indexOf('Crossover - Twilight') === 0 || t.indexOf('&amp; Twilight') !== -1 || t.indexOf('Twilight') === 0) {
			fics[i].style.display = 'none';
		}
	}
}
var listeners = document.querySelectorAll('a.gray');
for (var i = 0; i < listeners.length - 1; i++) {
    window.addEventListener ('click', remove_twilight, false);
}

window.addEventListener ('load', remove_twilight, false);
