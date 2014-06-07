// ==UserScript==
// @name           ePhilippines Forum Links
// @namespace      http://ephilippines.forummotion.com/forum.htm
// @description    Underlines links on the ePhilippines forum.
// @include        http://ephilippines.forummotion.com/*
// ==/UserScript==

document.getElementsByTagName("head")[0].innerHTML += '<style type="text/css">div.signature {overflow: visible} div.signature a, div.content a {border-bottom:1px dotted black} div.signature u a, div.content u a {border-bottom-style:none}</style>';