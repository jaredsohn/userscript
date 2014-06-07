// ==UserScript==
// @name          Fix Gmail Ad Overflow
// @description   Sometimes, the URL in ads in Gmail overflows from the containing div tag, creating an unnecessary //                horizontal scrollbar. This script just hides all overflowing text, eliminating the scrollbar.
// @include       *
// ==/UserScript==

var div_nodes= getElementsByTagName('div');
var iterator;

for (iterator in div_nodes)
	if (iterator.class=="yTjrg")
		iterator.style.overflow="hidden";