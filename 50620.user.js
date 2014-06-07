// ==UserScript==
// @name                Nukezone Undisabler
// @namespace           Nukezone
// @description         Re-enables buttons that are disabled when you push them.
// @include             http://www.nukezone.nu/*
// @include				http://www.nukezone.se/*
// ==/UserScript==

var buttons = document.getElementsByTagName('input');
for (var i=0; i < buttons.length; i++)
{
	var button = buttons[i];
	if (button.getAttribute('disabled') == '')
	{
	button.removeAttributeNode(button.getAttributeNode('disabled'));
	}
}