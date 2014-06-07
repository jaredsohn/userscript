// ==UserScript==
// @name           RemoveChango
// @namespace      http://userscripts.org/users/99043
// @description    Remove the frame from Chango links
// @include        http://links.chango.com/links/*
// ==/UserScript==

if (document.title.indexOf('://') > -1)
	window.location.replace(document.title);