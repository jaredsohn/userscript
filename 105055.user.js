// ==UserScript==
// @name           Fill Subject Field
// @namespace      jiiui
// @description    Fill Subject Field
// @include        http://forum.cheatengine.org/*
// ==/UserScript==

document.getElementsByClassName("post")[0].value="Re: "+document.getElementsByClassName("maintitle")[1].innerHTML;