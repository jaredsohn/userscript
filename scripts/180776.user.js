// ==UserScript==
// @name        Tumblr tags open in same page
// @namespace   kimira.dreamwidth.org
// @description tumblr tags open in same page
// @include     http*://www.tumblr.com/dashboard*
// @include     http*://www.tumblr.com/tagged/*
// @version     1
// @grant       none
// ==/UserScript==

var tags = document.getElementsByClassName("result_link");

for (var i = 0; i < tags.length; i++)
    tags[i].setAttribute("target","_self");