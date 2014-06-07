// ==UserScript==
// @name Prevent Public Facebook Events
// @namespace Sternschlaeger
// @version 1.0.1
// @description This script changes the Facebook Events page so Events will be by default only for friends.
// @icon http://sse.fantasticstories.eu/data/anti_facebook_clickjacker.png
// @run-at document-end
// @include http://www.facebook.com/events/create/*
// @include https://www.facebook.com/events/create/*
// ==/UserScript==
function run() {
document.getElementById("privacy_type").removeAttribute("checked");
};
window.addEventListener("load", function() { run() }, false);