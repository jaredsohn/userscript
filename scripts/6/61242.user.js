// ==UserScript==
// @name           full width torrent freak
// @namespace      torrentfreak
// @include        http://torrentfreak.com/*
// ==/UserScript==


var div = document.getElementById("body_wrap");
div.id = "noLongerBodyWrap"; //they are forcing a class level style on #body_wrap elements, so change id so that it is no longer a #body_wrap style
div.style.width = "100%";

div = document.getElementById("header");
div.style.width = "100%";
div = document.getElementById("main");
div.style.width = "100%";
div = document.getElementById("content");
div.style.width = "100%";
div = document.getElementById("footer");
div.style.width = "100%";
div = document.getElementById("ingredients");
div.style.width = "100%";

div = document.getElementById("sidebar");

div.style.display = "none";