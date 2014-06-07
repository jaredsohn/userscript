// ==UserScript==
// @name           Disable Gizmodo Gallery Format
// @namespace      http://www.stealthmonkey.com
// @description    Disables Gizmodo's gallery format, showing a gallery-less layout instead
// @include        http://gizmodo.com/*/gallery/*
// @include        http://lifehacker.com/*/gallery/*
// @include        http://jalopnik.com/*/gallery/*
// @include        http://deadspin.com/*/gallery/*
// @include        http://kotaku.com/*/gallery/*
// @include        http://jezebel.com/*/gallery/*
// @include        http://gawker.com/*/gallery/*
// @include        http://io9.com/*/gallery/*
// @include        http://fleshbot.com/*/gallery/*
// ==/UserScript==

var loc = document.location.href;
loc = loc.substring(0, loc.indexOf('/gallery/') + 1);
document.location.href = loc;
