// ==UserScript==
// @name           Gmail Contacts + Gmail Addons
// @namespace      http://exstodot.blogspot.com
// @description    Adds Gmail Contacts to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

GmailAddons.registerAddon(
{
	id: 'tdContacts',
	name: 'Google Contacts',
	url: 'https://mail.google.com/mail/contacts/ui/ContactManager',
	indicatorLabel: 'Contacts',
	position: 'bottom',
        height: 500,
        insideMainFrame: true
});