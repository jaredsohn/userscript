// ==UserScript==
// @name                Nukezone Textbox Tweak
// @namespace           Nukezone
// @description         Annoying small box ftl
// @include             http://www.nukezone.nu/*
// @include             http://www.nukezone.se/*
// ==/UserScript==

var textboxes = document.getElementsByTagName('textarea');

for (var i=0; i < textboxes.length; i++)
{
	var textbox = textboxes[i];
	if (textbox.getAttribute('class') == 'TextBoxB2 wide' && textbox.getAttribute('name') == 'Message')
		textbox.setAttribute('rows', '30');
	if (textbox.getAttribute('class') == 'TextBoxA2' && textbox.getAttribute('name') == 'Message')
		textbox.setAttribute('rows', '40');
}