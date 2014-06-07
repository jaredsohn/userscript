// ==UserScript==
// @name           Ta bort "Visa tråd -" på WP-Support.se
// @description    Tar bort "Visa tråd" ur titeln, så trådens riktiga titel blir lite synligare.
// @namespace      replacetitle
// @include        http://wp-support.se/forum/*
// ==/UserScript==

var title = document.getElementsByTagName('title')[0];
title.innerHTML = title.innerHTML.replace(/^Visa tråd - /, '');
