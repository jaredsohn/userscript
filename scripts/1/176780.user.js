// ==UserScript==
// @name        redmine short title
// @namespace   a
// @include     http*://*/redmine/issues/*
// @version     1
// ==/UserScript==

document.title = document.title.substring(document.title.indexOf('#')+1);

