// ==UserScript==
// @name       NatGeo No Signup Nag
// @namespace      http://userscripts.org/
// @version    0.1
// @description  removes signup nag from nat geo website
// @match      http://*.nationalgeographic.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


$(document).on('DOMNodeInserted', function(e) {
    if (e.target.id=='monetate_lightbox_mask') {
        $("#monetate_lightbox_mask").remove()
        $("body").css("overflow", "visible");
    }
    if (e.target.id=='monetate_lightbox_content_container') {
        $("#monetate_lightbox_content_container").remove()
        $("body").css("overflow", "visible");
    }
    
});