// ==UserScript==
// @name           Remove Google Earth Button from Google Maps
// @namespace      http://www.stealthmonkey.com
// @description    Removes the Google Earth button on Google Maps
// @include        http*://maps.google.*/*
// ==/UserScript==

function RemoveEarthButton () {
    var parentElement = document.getElementById('mv-primary-container');
    for (i = 0; i < parentElement.children.length; i++) {
        var element = parentElement.children[i];
        if (element.getAttribute("jsprops") == "activityId:2") {
            element.style.display = "none";
        }
    }
}

window.addEventListener("load", RemoveEarthButton, false);