// ==UserScript==
// @name           StreamTeamDisabler
// @namespace      Johnnei
// @description    StreamTeamDisabler
// @include        http://streamteamhaulerwijk.nl/
// ==/UserScript==

var adSidebar = document.getElementById('sponsor');
if (adSidebar) {
adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar2 = document.getElementById('btnl');
if (adSidebar2) {
adSidebar2.parentNode.removeChild(adSidebar2);
}