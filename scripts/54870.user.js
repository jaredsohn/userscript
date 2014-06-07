// ==UserScript==
// @name           Replace all instances on page
// @namespace      Jonathan Mackenzie
// @description    Evade school
// @include        http://*.*.*.*/*
// ==/UserScript==
var regex = /https?:\/\/[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+\/(.*)/i;
for each(var link in document.getElementsByTagName('a')) if(regex.test(link.href)) link.href=window.location.protocol+"//"+window.location.host+"/"+link.href.match(regex)[2];