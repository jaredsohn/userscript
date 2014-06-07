// ==UserScript==
// @name       SV-Rider-chrome-bug-fix
// @namespace  http://badgateway.at/
// @version    0.1
// @description  This script removes the middle mouse button bug at svrider.de, works for chrome, does nothing in firefox
// @include    http://*svrider.de/Forum/*
// @copyright  2011, Martin Baumgartner
// ==/UserScript==

var oldFunction = unsafeWindow.svrider_open_ft;
unsafeWindow.svrider_open_ft = function(e, link) {
     if(e.which != 2) {
         return oldFunction(e, link);
     }
};

