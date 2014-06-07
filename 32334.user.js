// ==UserScript==
// @name           tweakedtown
// @namespace      http://www.delgenio.com
// @description    fixes tweak town's adblock detection
// @include        http://www.tweaktown.com/*
// ==/UserScript==

//override the detect_abp function which tweaktown uses to direct adblock plus users to a different page after 10 seconds
//the function is defined in a script element in the html source
unsafeWindow.detect_abp = function(){}; //note that we use unsafeWindow because that refers to the window element that the page's scripts use


