// ==UserScript==
// @name Facebook - no find friends
// @description Remove the find friends menu from facebook
// @author BlackIce
// @version 1.2
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==


// ---=== REMOVE THE DAMN BUTTON ===---

var navMenu = document.getElementById('pageNav');
if(navMenu != null) {
    var ffMenu = navMenu.getElementsByTagName('li')[2];
    if(ffMenu != null) {
        ffMenu.parentNode.removeChild(ffMenu);
    }
}