// ==UserScript==
// @name           RedirectThroughLibrary
// @namespace      http://owlwatch.blogspot.com/
// @description    Redirect journals through library
// @include        http://ieeexplore.ieee.org/* 
// @include        http://www.sciencedirect.com/*
// ==/UserScript==
location.hostname = "0-" + location.hostname + ".catalog.library.colostate.edu";