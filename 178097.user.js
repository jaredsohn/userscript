// ==UserScript==
// @grant metadata
// @name        Remove_symbaloo_widgets
// @namespace   http://userscripts.org/scripts/show/test35999
// @description Remove annoying center widget box
// @include     http://www.symbaloo.com/
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version     1
// ==/UserScript==

$(".widget-container").remove();