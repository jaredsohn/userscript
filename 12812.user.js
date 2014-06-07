// ==UserScript==
// @name           Disable UserCash
// @description    Prevent the UserCash frame from loading.
// @include        http://*.usercash.com/*
// ==/UserScript==

if (document.title) {
	location.href = document.title;
}
