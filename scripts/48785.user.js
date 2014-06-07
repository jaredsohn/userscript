// ==UserScript==
// @name           Userscripts AddTagsLink
// @namespace      http://projects.izzysoft.de/
// @description    Add a link for the tags page to the navigation
// @version        1.0
// @include        http://userscripts.org/*
// ==/UserScript==

var node = document.getElementById('mainmenu'); // get the main menu (UL)
var tags = document.createElement('li');        // create another LI
var tagslink = document.createElement('a');     // create a new anchor
var tagstext = document.createTextNode('Tags'); // text for the new link
tagslink.setAttribute('href', '/tags');         // where shall the anchor point to
tagslink.appendChild(tagstext);                 // append the text to the anchor
tags.appendChild(tagslink);                     // append the anchor to the LI
node.insertBefore(tags,node.childNodes[2]);     // insert the LI at pos #2 (after scripts)
