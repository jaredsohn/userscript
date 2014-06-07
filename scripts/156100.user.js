// ==UserScript==
// @name        Tillad PDF-visning på skat.dk
// @namespace   http://userscripts.org/users/kvs
// @description Fjern det hjernedøde check for Adobe Reader hos tastselv.skat.dk
// @include     https://www.tastselv.skat.dk/*
// @version     1
// @run-at      document-end
// ==/UserScript==

unsafeWindow.CheckPdfViewValid = function(warning) {
	return true;
};
