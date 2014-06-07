// ==UserScript==
// @name          Add 2 Delicious
// @namespace     http://webspot.mx/grease/delicious
// @description   Save a bookmark to delicious using Alt+d, the aim is bring it to Safari
// @include       *
// ==/UserScript==

document.addEventListener('keypress', function(event) {
	if (event.which == 8706) { //alt+d
		window.open('http://delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title), 'delicious', 'toolbar=no,width=550,height=550');
	}
}, false);