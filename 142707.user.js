// Copyright (c) 2011 Luca Falavigna
// This script is licensed under the MIT license.
//
// ==UserScript==
// @name          BTSwontfix
// @namespace     http://www.debian.org
// @description	  Display wontfix icon in Debian BTS
// @include       http://bugs.debian.org/*
// ==/UserScript==

var regex = new RegExp('<abbr title="wontfix">.*</abbr>', 'g');
var repl = '<abbr title="wontfix"><font size=1>&#9785;</font></abbr>';
if (document.body.innerHTML.match(regex)) {
	document.body.innerHTML = document.body.innerHTML.replace(regex, repl);
}
