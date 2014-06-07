// ==UserScript==
// @name            pownce remove-ads
// @description     Remove ads from pownce
// @include         http://pownce.com/*
// @include         http://*.pownce.com/*
// ==/UserScript==

for (i=0; i<document.getElementsByTagName('li').length; i++) {
    if (document.getElementsByTagName('li').item(i).className == "ad-note"){
        document.getElementsByTagName('li').item(i).style.display="none";
    }
}
