// ==UserScript==
// @name           Digg Duggmirror Link
// @namespace      http://userscripts.org/scripts/show/12368
// @version        1.01
// @date           2007-09-18
// @description    Add a DuggMirror link to the title.
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// @exclude        http://digg.com/
// @exclude        http://www.digg.com/
// ==/UserScript==

// Get the title element.
var title = document.getElementById('title');
if (!title)
	return;

// Create the anchor element and set its attributes.
var anchor = document.createElement('a');
anchor.href = 'http://www.duggmirror.com/';
anchor.style.fontSize = '11px';

// The anchor display text.
var text = document.createTextNode('(DuggMirror)');
anchor.appendChild(text);

// Add a nonbreak space and the mirror link.
title.innerHTML += '&nbsp;';	
title.appendChild(anchor);