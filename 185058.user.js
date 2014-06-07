// ==UserScript==
// @name        Remove games + apps from facebook chat
// @namespace   NoBanner
// @description Remove games + apps displayed above facebook chat
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @version     1.0
// @grant       none
// ==/UserScript==
// ==NoBanner==
body = document.body;
if(body != null) {
    var deldiv = document.querySelector("div[id='pagelet_canvas_nav_content']");
    if (deldiv) 
        deldiv.parentNode.removeChild(deldiv);
}
// ==============