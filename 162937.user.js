// ==UserScript==
// @name        borderless-barrack
// @description removes frame border
// @version     1.0.0.0
// @encoding    utf-8
// @namespace   VIP
// @include     http://dobrochan.ru/
// @include     http://dobrochan.org/
// @include     http://dobrochan.com/
// @include     http://www.dobrochan.ru/
// @include     http://www.dobrochan.org/
// @include     http://www.dobrochan.com/
// @include     https://dobrochan.ru/
// @include     https://dobrochan.org/
// @include     https://dobrochan.com/
// @include     https://www.dobrochan.ru/
// @include     https://www.dobrochan.org/
// @include     https://www.dobrochan.com/
// @unwrap
// ==/UserScript==

(function() {
	const WIDTH = 210;

	var w = window;
	var d = w.document;
	if (!d) return;

	function $t(tag) {return d.getElementsByTagName(tag)[0];}
	function $elem(tag) {return d.createElement(tag);}
	function $attr(el, attrs) {
		for (var key in attrs)
			el.setAttribute(key, attrs[key]);
	}

	var frameset = $t('frameset');
	$attr(frameset, {'cols': WIDTH+',*', 'framespacing': '0', 'border': '0', 'frameborder': '0'});

	var frame = $elem('frame');  // hack to force repaint root frameset page
	frameset.appendChild(frame); //
})()