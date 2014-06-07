// ==UserScript==

// @name           BBC Feature Box Deleter

// @namespace      BBC Feature Box Deleter

// @description    Deletes the annoying feature box from the new BBC homepage.

// @include        http://www.bbc.co.uk/*

// ==/UserScript==

var deleteFeatureBox = document.getElementById('hpFeatureBox');
if (deleteFeatureBox) {
    deleteFeatureBox.parentNode.removeChild(deleteFeatureBox);
}