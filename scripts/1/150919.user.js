// ==UserScript==
// @name           filmweb.pl 'welcomeScreen' autoskip
// @version        0.1
// @author         Durin
// @namespace      filmweb.pl
// @description    Skip filmweb.pl welcome screen
// @include        *.filmweb.pl/*
// ==/UserScript==

var tag;
tag = document.getElementById('goToLink');
if (tag) {
    document.location.href = tag.href;
}