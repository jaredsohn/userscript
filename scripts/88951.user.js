// ==UserScript==
// @name           Taistelun tilanne
// @namespace      sampo
// @include        http://www.erepublik.com/en/military/battlefield/*
// ==/UserScript==

var w0 = 0;
var d = document;
var dombar = d.getElementById('domination_bar');
var bluedom = d.getElementById('blue_domination');
var reddom = d.getElementById('red_domination');

function main() {
	var w1 = dombar.style.width.replace('%','');
		if (w1 != w0) {
			bluedom.style.opacity = 0;
			reddom.style.opacity = 0;
			var l = Math.round(w1 * 1000) / 1000;
			var r = Math.round((100 - w1) * 1000) / 1000;
			w0 = w1;
				bluedom.innerHTML = l + '%';
				reddom.innerHTML = r + '%';
		}
			window.setTimeout(function() {
				bluedom.style.opacity = 1;
				reddom.style.opacity = 1;
				main();
			},500);
}

	main();


