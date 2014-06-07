// ==UserScript==
// @name           Hootsuite (ow.ly/ht.ly) Frame Remover v2
// @namespace      http://userscripts.org/users/93584
// @description    Removes Ow.ly/Ht.ly Header Bar
// @include        http://ow.ly/*
// @include        http://ht.ly/*
// @exclude        http://ow.ly/url/*
// @exclude        http://ht.ly/url/*
// ==/UserScript==
var iframes = document.getElementsByTagName('iframe');
window.location.href = iframes[0].src;