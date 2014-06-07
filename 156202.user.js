// ==UserScript==
// @name        ADomie
// @namespace   forum.auto.ru
// @include     http://forum.auto.ru/uaz/
// @version     1
// @grant	none
// ==/UserScript==

$(document).ajaxSuccess(function() {
	$("div.post:has(a[href='http://users.auto.ru/2835687.html'])").replaceWith("<div class='post'>Здесь был пост Домье</div>");
});
