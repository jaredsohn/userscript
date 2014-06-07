// ==UserScript==
// @name           Universal Emotes -- A different approach (Alt. ed)
// @namespace      pinkiepie
// @description    Makes a large selection of emotes visible on all of reddit.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

function loadStyleSheet(filename) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    document.getElementsByTagName("head")[0].insertBefore(fileref, document.getElementsByTagName("head")[0].firstChild);
}
//Thanks nallar, this is a lot cleaner!
loadStyleSheet('http://dl.dropbox.com/u/55322538/cssbot.css')
