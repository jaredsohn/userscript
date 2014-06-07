// ==UserScript==
// @name           Rainbow Links
// @namespace      http://dttvb.yi.org/
// @description    Makes links rainbow.
// @include        *
// ==/UserScript==

//
// Rainbow Links
//=====================
// Script by the DtTvB
// http://dttvb.yi.org/
//

//
// Gets the computed style...
//
function getStyle(el, pr) {
	return document.defaultView.getComputedStyle(el, '').getPropertyValue(pr);
}

//
// Parse color.
//
function parseColor(s) {
	var m;
	if (m = s.toLowerCase().match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/))
		return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
	if (m = s.toLowerCase().match(/^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/))
		return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}

//
// Creates RGB.
//
function makeRGB(x) {
	return 'rgb(' + Math.round(x[0]) + ', ' + Math.round(x[1]) + ', ' + Math.round(x[2]) + ')';
}

//
// HSV to RGB conversion and RGB to HSV conversion, by me.
// Thanks to http://en.wikipedia.org/wiki/HSV_color_space for information.
//
function h2r(ihsv) {
	var a = [ihsv[0] % 360, ihsv[1] / 100, ihsv[2] / 100];
	var b = Math.floor(a[0] / 60);
	var c = (a[0] % 60) / 60;
	var d = a[2] * (1 - a[1]);
	var e = a[2] * (1 - (c * a[1]));
	var f = a[2] * (1 - ((1 - c) * a[1]));
	var g;
	if (b == 0)
		g = [a[2], f, d];
	else if (b == 1)
		g = [e, a[2], d];
	else if (b == 2)
		g = [d, a[2], f];
	else if (b == 3)
		g = [d, e, a[2]];
	else if (b == 4)
		g = [f, d, a[2]];
	else if (b == 5)
		g = [a[2], d, e];
	return [Math.round(g[0] * 255), Math.round(g[1] * 255), Math.round(g[2] * 255)];
}

function r2h(irgb) {
	var a = [irgb[0] / 255, irgb[1] / 255, irgb[2] / 255]
	var b = a[0];
	var c = a[0];
	var d, e, f;
	if (a[1] < b)
		b = a[1];
	if (a[2] < b)
		b = a[2];
	if (a[1] > c)
		c = a[1];
	if (a[2] > c)
		c = a[2];
	if (b == c)
		d = 0;
	else if (c == a[0])
		d = (60 * ((a[1] - a[2]) / (c - b)));
	else if (c == a[1])
		d = (60 * ((a[2] - a[0]) / (c - b))) + 120;
	else if (c == a[2])
		d = (60 * ((a[0] - a[1]) / (c - b))) + 240;
	if (d < 0)
		d += 360;
	e = Math.round(100 * ((c == 0) ? 0 : (1 - (b / c))));
	f = Math.round(100 * c);
	return [Math.round(d % 360), e, f];
}

//
// Get the top position..
//
function gettop(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent;
	while (el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}

//
// Individual link process...
//
function rainbowize(x) {
	var tx = gettop(x);
	var add = tx / 5;
	var c = (parseColor(getStyle(x, 'color')));
	var h = r2h(c);
	h[0] += add;
	if (h[1] < 30) h[1] = 30;
	if (h[2] < 20) h[2] = 20;
	if (h[2] > 96) h[2] = 96;
	x.style.color = makeRGB(h2r(h));
}

//
// Process all links.
//
function rainbowizeLinks() {
	var links = document.body.getElementsByTagName('a');
	for (var i = 0; i < links.length; i ++) {
		try {
			rainbowize (links[i]);
		} catch (e) {}
	}
}

rainbowizeLinks ();