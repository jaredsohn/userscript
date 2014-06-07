// ==UserScript==
// @name            BreakOut
// @description     Break out of a frame/iframe with a quick ctrl+doubleclick
// @version         1.0
// @date            2007-06-11
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/
// @include         *
// ==/UserScript==

if (self!=top) {
    document.addEventListener('dblclick', function(e) {if (e.ctrlKey) GM_openInTab(document.location.href)}, false);
}
