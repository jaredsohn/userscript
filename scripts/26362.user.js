// ==UserScript==
// @name           Launchpad: PPA builds automatically to view all
// @namespace      launchpad
// @description    Read the label
// @include        https://launchpad.net/*/+archive/+builds
// ==/UserScript==

var currURI = document.location.href;document.innerHTML = "wait...";
document.location.href = currURI + "?build_text=&build_state=all";
