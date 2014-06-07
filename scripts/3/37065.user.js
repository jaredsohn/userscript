// ==UserScript==
// @name           Pandora's (Correctly Sized) Box
// @namespace      eric.biven.us
// @description    Correctly sizes, scrolls, and adjusts Pandora to display just the player or player and genre stations.  Remembers the last state from one load to the next.
// @include        http://pandora.com/
// @include        http://www.pandora.com/
// ==/UserScript==

var heightNoStations = 270;
var heightStations = 475;
var widthAll = 655;

function DoResize() {
    window.innerHeight = (GM_getValue('showStations', false)) ? heightStations : heightNoStations;
    window.innerWidth = widthAll;
    window.scrollTo(45, 125);
}

function ToggleShowStations() {
    GM_setValue('showStations', !GM_getValue('showStations', false));
    DoResize();
}

// Give the Flash a brief moment to settle down,
// then do our resizing.
window.setTimeout(DoResize, 500);

GM_registerMenuCommand('Toggle Genre Stations in Pandora', ToggleShowStations, 't', '', 't');
