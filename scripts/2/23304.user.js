// ==UserScript==
// @name           Google Docs + Gmail Addons
// @namespace      http://exstodot.blogspot.com
// @description    Adds Google Docs to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

GmailAddons.registerAddon(
{
	id: 'tdDocs',
	name: 'Google Docs',
	url: 'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/docs.xml&amp;up_numDocuments=9&amp;up_showLastEdit=1&amp;synd=open&amp;w=320&amp;h=500&amp;title=&amp;lang=all&amp;country=ALL&amp;border=%23ffffff%7C3px%2C1px+solid+%23999999&amp;output=js',
	indicatorLabel: 'Documents',
	position: 'right'
});