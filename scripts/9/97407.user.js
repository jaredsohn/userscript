// ==UserScript==
// @name           Salesforce.com Remove OnMouseOver
// @namespace      robotmachine
// @description    Remove hover/mouseover popovers for Salesforce.com
// @include        https://*.salesforce.com/*
// ==/UserScript==
var theImage, altText;
theImage = document.getElementById('annoyingsmily');
if (theImage) {
    altText = document.createTextNode(theImage.alt);
    theImage.parentNode.replaceChild(altText, theImage);
}