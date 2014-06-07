// ==UserScript==
// @name           Disable window.open
// @namespace      http://userscripts.org/users/113106
// @description    Disables window.open (to prevent pop-ups and pop-unders)
// @include        *
// ==/UserScript==
unsafeWindow.open = function() {};
