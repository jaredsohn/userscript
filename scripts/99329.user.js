// ==UserScript==
// @name           Kolibka
// @namespace      http://kolibka.com/
// @description    Font change
// @include        http://kolibka.com/*
// ==/UserScript==

function ChangeFont(el) {
	var len = el.length;

	for (var i = 0; i < len; i++) {
		var size = parseInt(el[i].style.fontSize, 10);
		if (size <= 10) {
			el[i].style.fontSize = '11px';
		}
		el[i].style.fontFamily = 'verdana';
	}
}

function Links(el) {
	var len = el.length;

	for (var i = 0; i < len; i++) {
		if (el[i].children.length != 0) { continue; }

		el[i].style.textDecoration = 'none';


		el[i].addEventListener('mouseover', function() {
			this.style.textDecoration = 'underline';
			this.style.color = '#ffcc33';
		}, false);

		el[i].addEventListener('mouseout', function() {
			this.style.textDecoration = 'none';
			this.style.color = '#ccffcc';
		}, false);
	}
}

(function() {
	var a = document.getElementsByTagName('a');
	var font = document.getElementsByTagName('font');
	var td = document.getElementsByTagName('td');

	ChangeFont(a);
	Links(a);

	ChangeFont(font);
	ChangeFont(td);
})();
