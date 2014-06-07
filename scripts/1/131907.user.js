// ==UserScript==
// @id			second.by_loader
// @name        second.by_loader
// @namespace   second.by_by_xxKOtxx
// @include http://second.by/*/messages/*
// @author      xxKOtxx
// @version     0.0.1
// ==/UserScript==

var script = document.createElement('script');
script.src = 'http://userscripts.org/scripts/source/129457.user.js?rnd=' + Math.random();
script.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(script);