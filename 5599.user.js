// ==UserScript==
// @name        Webshots NoAds
// @namespace   None
// @description Removes the ads from WebShots Photo pages
// @include     http://*.webshots.com/photo/*

// ==/UserScript==


var aDivs = document.getElementsByTagName("DIV");
for (var i=0; i<aDivs.length; i++) {
    if(aDivs[i].getAttribute("class") == "mpu") {
        aDivs[i].innerHTML = '';
    } 
}
