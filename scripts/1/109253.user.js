// ==UserScript==
// @name           Google Instant Pages for All
// @description    Increase Drammaticali Speed Navigation With Google Chrome
// @author         Yuri Carlenzoli
// @include        http://*
// @version        1.0
// ==/UserScript==
var a = document.getElementsByTagName('a'); 
for (i = 0; i < a.length; i++) a[i].setAttribute('rel','prerender');