// ==UserScript==
// @name [TPB] Sort the Pirate Bay by seeders By engtech *FIX*
// @namespace http://userscripts.org/scripts/show/25911
// @description Automatically sort by seeders instead of by date uploaded *FIX*
// @include http://thepiratebay.org/*/99/*
// ==/UserScript==

(function() {
document.location.pathname = document.location.pathname.replace('/99/','/7/0');
})();