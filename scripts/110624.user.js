// ==UserScript==
// @name           PhazeDDL Cleaner
// @namespace      PhazeDDL Cleaner
// @include        http://dl.phazeddl.com/*/*/
// ==/UserScript==

document.location = document.getElementsByTagName('iframe')[1].src;