// ==UserScript==
// @name           PopUnder blocker
// @namespace      gerdami
// @description    Disable the popunder
// @include        *
// ==/UserScript==

window.popunder = unsafeWindow.popunder = function(){};

