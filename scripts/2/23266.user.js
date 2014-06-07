// ==UserScript==
// @name           amazingsuperpowers Enhancer
// @namespace      http://www.amazingsuperpowers.com/*
// @description    Adds alt-text below ASP comics
// @include        http://www.amazingsuperpowers.com/*
// @include        http://www.amazingsuperpowers.com
// ==/UserScript==

// ==UserScript==
// @name           ASP Enhancer
// @namespace      http://www.amazingsuperpowers.com
// @description    Shows the "title text" below the comic
// @include        http://www.amazingsuperpowers.com
// @include        http://www.amazingsuperpowers.com/*
// ==/UserScript==

(function(){

var img = document.images[0];
if (!img.title) return;
var p = document.createElement('p');
p.className = "title-text";
with (p.style) {
	padding = '0';
	margin = '-5px auto 0 auto';
	//s.borderBottom = s.borderLeft = s.borderRight = '1px solid black';
	padding = '4px';
	fontSize = '14px';
	minHeight = '34px'; // Don't shift the nav around so much.
	fontVariant = 'normal';
}
function set_width() {
  p.style.width = (img.width - 4*2) + 'px';
}
set_width();
img.addEventListener("load", set_width, false);

p.appendChild(document.createTextNode(img.title));
if (img.nextSibling) {
	img.parentNode.insertBefore(p, img.nextSibling);
} else {
	img.parentNode.appendChild(p);
}

})();
