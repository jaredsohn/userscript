// ==UserScript==
// @name        Oppo
// @namespace   Bignell
// @include     http://*.jalopnik.com/*
// @include     http://jalopnik.com/*
// @include     http://*.kinja.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://bjandjo.ca/oppo/4/oppo-main.min.js
// @resource    oppoBaseCss http://bjandjo.ca/oppo/4/oppo.min.css
// @resource    oppoColourCss http://bjandjo.ca/oppo/4/oppo-colours.min.css
// @resource    oppoSidebarCss http://bjandjo.ca/oppo/4/oppo-sidebar.min.css
// @resource    oppoGearImg http://bjandjo.ca/oppo/4/gear.png
// @version     20
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// @grant       GM_info
// @updateURL   http://userscripts.org/scripts/source/180292.user.js
// @description Tweaks the new layout of Oppositelock (October 18, 2013)
// ==/UserScript==
GM_addStyle(GM_getResourceText("oppoBaseCss"));
window.oppo.initFeatures();
if (window.oppo.cookies.colours.enabled) {
    GM_addStyle(GM_getResourceText("oppoColourCss"));
}
if (window.oppo.cookies.biggerSidebar.enabled) {
    GM_addStyle(GM_getResourceText("oppoSidebarCss"));
}

$(function(){ 
    window.oppo.run();
});
