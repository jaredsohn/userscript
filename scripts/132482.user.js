// ==UserScript==
// @name           vplay.ro comment remover
// @namespace      x
// @description    script pe care l-am scris din cauza comentariilor lui jurnalultv
// @include        http://vplay.ro/*
// ==/UserScript==
var elmDeleted = document.getElementById("comments-panel");
	elmDeleted.parentNode.removeChild(elmDeleted);

