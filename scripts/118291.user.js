// ==UserScript==
// @name           Google Search - Results without onmousedown attribute
// @include        http://*.google.com/*
// @include        https://*.google.com/*
// ==/UserScript==
var runOnce = function(){
    var items = document.querySelectorAll('li.g h3.r a');
    for(var i = 0, len = items.length; i< len; i++){
        items[i].removeAttribute('onmousedown');
    }
}
document.body.appendChild(document.createElement("script")).innerHTML = "("+runOnce+")()";
