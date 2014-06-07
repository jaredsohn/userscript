// ==UserScript==
// @name           Snopes Text Selection
// @namespace      http://www.nolatechhelp.com
// @author         Jesse Varnado
// @description    Stops Snopes' anti-text-selection script
// @include        http://www.snopes.com/*
// @include        http://snopes.com/*
// ==/UserScript==

void(document.onselectstart=null)