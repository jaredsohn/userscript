// ==UserScript==
// @name          Yahoo! Nocuts
// @namespace     http://twilite.org/~xtina/scripts/
// @description   Disables Yahoo! Shortcuts on Y! news pages.
// @include       http://news.yahoo.com/*
// ==/UserScript==

regex = new RegExp("id=\"lw_[0-9]*_[0-9]*\"", "g");

document.body.innerHTML= document.body.innerHTML.replace(regex, "");
