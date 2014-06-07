// 59.59.58.22 redirector
// ==UserScript==
// @name            59.59.58.22 redirector
// @namespace       miemie 
// @description     59.59.58.22 redirector
// @version         0.0.2
// @include         http://59.59.58.22/*
// ==/UserScript==


var url = window.location.href;
window.location.replace(url.replace(url.substring(0,91), ''));
