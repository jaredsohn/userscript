// ==UserScript==
// @name           SDClean
// @namespace      my.own
// @include        http://www.sueddeutsche.de/*
// ==/UserScript==

var mainad = document.getElementById('iqd_mainAd');
var sd = document.getElementById('sueddeutsche');
var wrap = document.getElementById('wrapperbelt');
var content = document.getElementById('contentcolumn');

sd.removeChild(mainad);
sd.style.width = '940px';
wrap.style.width = '940px';
content.removeChild(document.getElementById('swoosh'));

