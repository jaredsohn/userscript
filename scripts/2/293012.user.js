// ==UserScript==
// @name Give Me Coins Condensed
// @namespace http://roadha.us
// @version 1.0
// @description Condenses the layout of the give-me-coins.com dashboard
// @include https://give-me-coins.com/pool/dashboard
// @match https://give-me-coins.com/pool/dashboard
// @run-at document-end
// ==/UserScript==

// http://roadha.us/

setTimeout(function(){

var container = document.querySelectorAll('.main .container')[1];
var rows = container.querySelectorAll('.row');
rows[0].parentNode.removeChild(rows[0]);
var els = rows[1].querySelectorAll('.widget');

for(var i = 0; i < els.length; i++) {
	if(! els.hasOwnProperty(i)) continue;

    var widget = els[i].parentNode;
	var header = widget.querySelector('h3').innerHTML.replace(/^(\s|\n|\r)|(\s|\n|\r)$/g, '');

	switch(header) {
		case 'Workers Stats':
			widget.parentNode.removeChild(widget);
			break;
		case 'My Hash Rate':
			widget.setAttribute('class', 'span8');
			break;
		default:
			break;
	}
}

var prog = document.querySelector('.progress.active');
prog.setAttribute('class', prog.getAttribute('class').replace(/\bactive\b/i, ''));

},0);

setTimeout(function(){ window.location.reload(); }, 300000);
