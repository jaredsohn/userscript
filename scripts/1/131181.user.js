// Oxford journals straight to pdf
// 2011-04-18
// Copyright (c) 2012, Jason Friedman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name Oxford journals straight to pdf
// @namespace http://www.curiousjason.com/greasemonkey/
// @description Open a pdf in a full browser tab rather than inside a frame on the oxford journals website 
// @include http://*.oxfordjournals.org/*.pdf+html
// ==/UserScript==
var newlocation = location.href.replace(/pdf\+html/,'pdf');
window.location.href = newlocation;

