// ==UserScript==
// @name       4chan Pass-/b/-Gone
// @description  Remove 4chan pass ads
// @match      http://boards.4chan.org/*
// @match      https://boards.4chan.org/*
// ==/UserScript==
var links = document.links;
for(var i = 0; i < links.length; i++)
    if(links[i].getAttribute("href") === "https://www.4chan.org/pass")
        links[i].parentNode.parentNode.removeChild(links[i].parentNode);