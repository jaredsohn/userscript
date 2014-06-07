// ==UserScript==
// @name           Remove dereferer.ws
// @description    Removes dereferer.ws from links
// @author         Dineshmike
// @include        *.nsanedown.com/*
// @include        *.nsaneforums.com/*
// ==/UserScript==

var link;
link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    link[i].href = link[i].href.replace("http://dereferer.ws/?", "");
}
