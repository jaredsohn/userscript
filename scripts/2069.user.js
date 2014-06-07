// ==UserScript==
// @name          Clean Macrumors
// @namespace     http://retronerd.com/
// @description   Strips headers from macrumors.com pages
// @include       http://macrumors.com*
// @include       http://*.macrumors.com*
// @include       http://macrumors.pricegrabber.com*
// ==/UserScript==

function remove(id) {
    var e = document.getElementById(id);
    if(e != undefined) {
        e.parentNode.removeChild(e);
    }
}

function setTop(id, top) {
    var e = document.getElementById(id);
    if(e != undefined) {
        e.style.top = top;
    }
}

function setMarginTop(id, marginTop) {
    var e = document.getElementById(id);
    if(e != undefined) {
        e.style.marginTop = marginTop;
    }
}

function setHeight(id, height) {
    var e = document.getElementById(id);
    if(e != undefined) {
        e.style.height = height;
    }
}

(function() {
    //Main page
    remove("banner_topad");
    setTop("menu", "110px");
    setMarginTop("content", "-90px");
    setTop("comments", "110px");

    //Forums
    remove("mr_banner_topad");
    
    //Shop
    //alert(window.location.host);
    if(window.location.host.indexOf("pricegrabber.com") != -1) {
        setHeight("banner", "100px");
    }
})();