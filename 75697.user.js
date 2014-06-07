// ==UserScript==
// @name          Vertical-izer
// @version       1.0.6
// @description   press key to make text vertical (default: ctrl+alt+G)
// @author        kailapis
// @namespace     http://my.opera.com/kailapis/
// @homepage      http://my.opera.com/kailapis/blog/vertical-izer
// @download      http://files.myopera.com/kailapis/userjs/vertical.user.js
// ==/UserScript==

// Copyright (c) 2010, kailapis
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

"use strict";

// Adjust trigger condition to your preference here; default is ctrl+alt+G
window.addEventListener('keydown', function(e) { if (e.keyCode == 71 && e.ctrlKey && e.altKey) {

var vs1 = '（〔〈《【＜≪「『［',
	vs2 = '）〕〉》】＞≫」』］ー―－‐～…．：',
	vss = 'ぁぃぅぇぉァィゥェォっゃゅょッャュョヶ',
	vst = '。、',
	xv = '\\w\\sＡ-Ｚａ-ｚ０-９\\.,\\?\\-_\\+=\\/:;&<>!\\[\\]{}()' + vs1 + vs2,
	expa = '(?=[^<>]*?<|$)',
	body = document.body;
body.innerHTML = body.innerHTML
	.replace(new RegExp('([^' + xv + '])' + expa, 'gm'), '<v>$1</v>')
	.replace(new RegExp('([' + vs1 + '])' + expa, 'gm'), '<vs1>$1</vs1>')
	.replace(new RegExp('([' + vs2 + '])' + expa, 'gm'), '<vs2>$1</vs2>')
	.replace(new RegExp('([' + vst + '])' + expa, 'gm'), '<vst>$1</vst>')
	.replace(new RegExp('([' + vss + '])' + expa, 'gm'), '<vss>$1</vss>')
	.replace(/<v(st|ss)?>(.)<\/v\1>(<v>)?<v(s2|st)>(.)<\/v\4>(<\/v>)?/gm, '<vg><v$1>$2</v$1>$3<v$4>$5</v$4>$6</vg>')
	.replace(/<vs1>(.)<\/vs1><v(st|ss)?>(.)<\/v\2>/gm, '<vg><vs1>$1</vs1><v$2>$3</v$2></vg>');

var getTransform = function(transform, origin) {
		var text = ';-moz-transform:' + transform +
			';-o-transform:' + transform +
			';-webkit-transform:' + transform;
		if (origin) {
			text += ';-moz-transform-origin:' + origin +
				';-o-transform-origin:' + origin +
				';-webkit-transform-origin:' + origin;
		}
		return text;
	},
	cssText = 'html{max-width:' + (window.innerHeight-20) + 'px!important;overflow:scroll}' +
		'p,blockquote{max-width:' + (window.innerHeight-50) + 'px!important}' +
		'body{font-family:\'Meiryo\',\'メイリオ\'!important;right:0px!important;overflow:visible' + getTransform('rotate(90deg)', 'left bottom') + '}' +
		'v,vs1,vs2,vst,vss,vg{white-space:nowrap;display:inline-block;overflow:visible}' +
		'v,vs1,vs2,vst,vss{width:1.05em}' +
		'v{text-align:center;line-height:1.5em;vertical-align:baseline' + getTransform('rotate(-90deg)', false) + '}' +
		'vs1,vs2,vg{height:1.05em;line-height:.1em}' +
		'vst{' + getTransform('translate(.6em,-.5em)', false) + '}' +
		'vss{' + getTransform('translate(.125em,-.125em)', false) + '}';
if (typeof GM_addStyle != 'undefined') {
	GM_addStyle(cssText);
} else {
	var style = document.createElement('style'),
		head = document.getElementsByTagName('head')[0];
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssText));
	if (!head) {
		head = document.createElement('head');
		document.insertBefore(head, body);
	}
	head.appendChild(style);
}

var htmlStyle = window.getComputedStyle(body, null),
	htmlStyleHeight = Number(htmlStyle.height.match(/[\d]+/)[0]);
window.scroll(htmlStyleHeight, htmlStyleHeight);

window.addEventListener('mousewheel', function(e) {
	e.preventDefault();
	window.scroll(window.scrollX + (e.wheelDelta/2), window.scrollY);
}, true);
window.addEventListener('DOMMouseScroll', function(e) {
	e.preventDefault();
	window.scroll(window.scrollX + (-e.detail*30), window.scrollY);
}, true);

}}, true);