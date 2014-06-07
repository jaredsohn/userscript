// ==UserScript==
// @name           name
// @namespace      the namespace
// @description    the description
// @include        http://userscripts.org/topics/*
// ==/UserScript==
if (window.location.toString().match(".jpg") == null) {

window.location.replace(window.location + '?.jpg');

}