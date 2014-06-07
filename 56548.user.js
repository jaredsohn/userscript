// ==UserScript==
// @name           GMX: No Firefox for Opera
// @namespace      http://www.gmx.net
// @description    Removes for Opera users the Firefox reminder on top of GMX pages
// @include        http://*.gmx.net/*
// @version        1.0
// ==/UserScript==


window.opera.defineMagicFunction(
    'homepageMoveinAllowed',
    function ( oRealFunc, oThis) {
        return false;
    }
);

window.opera.defineMagicVariable(
    'Topper',
    function (curVal) { return null; }, null
);
