// ==UserScript==
// @name           buienradar dot
// @namespace      armeagle.nl
// @description    add dot for city over map
// @include        http://buienradar.nl/
// ==/UserScript==

var baseStyle = 'width:2px; height: 2px; position: absolute; top: 164px; left: 354px; ';
var extraStyle = new Array('background: yellow;',
'background: red;', 'background: blue;', 'background: green;');
var extraStyleIndex = 0;

var cont = document.getElementById('ctl00_ContentPlaceHolder1_img').parentNode;
var  dot = document.createElement('div');
dot.setAttribute('id', 'dot');
cont.appendChild(dot);
dot.parentNode.setAttribute('style', dot.parentNode.getAttribute('style') +' display: block; position: relative');
setInterval(function() {
	extraStyleIndex = (extraStyleIndex + 1) % extraStyle.length;
	dot.setAttribute('style', baseStyle + extraStyle[extraStyleIndex]);
}, 100);


