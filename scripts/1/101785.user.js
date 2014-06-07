// ==UserScript==
// @name           kino.to - remove adblock plus detector
// @namespace      google-set-focus@anythingsthing.de
// @include        http://kino.to/*
// @include        http://www.kino.to/*
// ==/UserScript==

divs = document.getElementsByTagName('div');

// das zu entfernende div ist das drittletze div auf der seite
div = divs[divs.length - 3];

// ausblenden durch display: none;
div.style.display = 'none';