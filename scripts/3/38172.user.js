// ==UserScript==
// @name           studiVZ - no logout reminder
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://studivz.net/*
// @include        http://www.studivz.net/*
// ==/UserScript==

window.addEventListener("load", function() {
	unsafeWindow.$('#PhxDialog0').trigger('PhxDialogButtonClicked', ['true', '#PhxDialog0', event]);
}, true);
window.addEventListner("DOMNodeInserted", function() {
	unsafeWindow.$('#PhxDialog0').trigger('PhxDialogButtonClicked', ['true', '#PhxDialog0', event]);
}, true);

GM_addStyle("#PhxDialog0 { display: none !important;}");