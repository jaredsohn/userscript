// ==UserScript==
// ==Info==
// @name           Classic Gawker Media Site
// @author         svenbit
// @description    This script basically redirect all Gawker Media Sites to it's respective Classic site. (Lifehacker, Gizmodo, Kotaku, Jalopnik, io9, Jezebel, Gawker)
// @namespace      http://svenb1t.blogspot.com
//
//
//
// ==Included Sites==
// @include        http://lifehacker.com/*
// @include        http://www.lifehacker.com/*
// @include        http://kotaku.com/*
// @include        http://www.kotaku.com/*
// @include        http://gawker.com/*
// @include        http://www.gawker.com/*
// @include        http://gizmodo.com/*
// @include        http://www.gizmodo.com/*
// @include        http://io9.com/*
// @include        http://www.io9.com/*
// @include        http://jalopnik.com/*
// @include        http://www.jalopnik.com/*
// @include        http://jezebel.com/*
// @include        http://www.jezebel.com/*
// @include        http://deadspin.com/*
// @include        http://www.deadspin.com/*
//
//
// ==Google Chrome==
// @match        http://lifehacker.com/*
// @match        http://www.lifehacker.com/*
// @match        http://kotaku.com/*
// @match        http://www.kotaku.com/*
// @match        http://gawker.com/*
// @match        http://www.gawker.com/*
// @match        http://gizmodo.com/*
// @match        http://www.gizmodo.com/*
// @match        http://io9.com/*
// @match        http://www.io9.com/*
// @match        http://jalopnik.com/*
// @match        http://www.jalopnik.com/*
// @match        http://jezebel.com/*
// @match        http://www.jezebel.com/*
// @match        http://deadspin.com/*
// @match        http://www.deadspin.com/*
// ==/UserScript==

GM_addStyle("body { display:none !important; }");

window.stop();

// Redirect
var loc = window.location.href;
var path = window.location.hash;

loc = loc.replace(/http:\/\//, 'http://ca.');

if(isNaN(path.charAt(2)))
{
	loc = loc.replace(/#!/g, '/tag/');
}

else {
	loc = loc.replace(/#!/g, '');
}

location.replace(loc);