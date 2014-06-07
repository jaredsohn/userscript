// ==UserScript==
// @name           IMDB to Wikipedia Links
// @namespace      #aVg
// @description    Adds wikipedia links to IMDB movie pages.
// @include        http://www.imdb.com/title/*
// @version        0.1.1
// ==/UserScript==
var wiki=document.createElement("a");
wiki.textContent = "wikipedia";
wiki.setAttribute("style", "margin-left: 7px;font-size:18px;");
wiki.href = "http://www.google.com/search?q=\"" + document.title.replace(/ \(\d+\)/,"") + "\" movie site:wikipedia.org&btnI";
document.getElementById("tn15title").childNodes[1].appendChild(wiki);