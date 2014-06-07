// ==UserScript==
// @name           SweClockers.com hover fix
// @namespace      http://jymden.nu
// @description    Flyttar en irriterande hovertexten till trådtiteln istället för hela trådraden.
// @include        http://sweclockers.com/forum/*
// @include        http://www.sweclockers.com/forum/*
// ==/UserScript==

var ttd = document.getElementsByClassName("threadtitle");

for (var i = 0; i < ttd.length; i++) {
    document.getElementById("thread_title_" + ttd[i].id.substring(15)).title = ttd[i].title;
    ttd[i].title = "";
}