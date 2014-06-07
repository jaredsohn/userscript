// ==UserScript==
// @name           Google Notebook + Gmail Addons
// @namespace      http://exstodot.blogspot.com
// @description    Adds Google Notebook to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

GmailAddons.registerAddon(
{
	id: 'tdGNotebook',
	name: 'Google Notebook',
	url: 'http://google.com/notebook',
	indicatorLabel: 'Notebook'
});
