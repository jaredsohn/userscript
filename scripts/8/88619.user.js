// ==UserScript==
// @name           test11
// @namespace      http://abct.tk/
// @include        http://last-emperor.pl/guilds/*
// ==/UserScript==
var theDiv = document.getElementsByClassName('boxobenmenu')[0];
theDiv.innerHTML = 'This is the new innerHTML';