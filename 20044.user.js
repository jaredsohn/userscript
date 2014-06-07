// ==UserScript==
// @name           Google Reader + Gmail Addons
// @namespace      http://exstodot.blogspot.com
// @description    Adds Google Reader to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

GmailAddons.registerAddon(
{
	id: 'tdGReader',
	name: 'Google Reader',
	url: 'https://www.google.com/reader',
	indicatorLabel: 'GReader'
});
