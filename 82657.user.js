// ==UserScript==
// @name           4chan reCAPTCHA tab order
// @namespace      WakiMiko
// @description    Fixes the reCAPTCHA tab order. Press tab in the comment field to jump to the verification field.
// @include        http://boards.4chan.org/*
// ==/UserScript==

var buttons = document.evaluate("//a[starts-with(@id, 'recaptcha_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < buttons.snapshotLength; i++)
	buttons.snapshotItem(i).setAttribute("tabindex", "1");
