// ==UserScript==
// @name           Angel Learning Print/Copy Enabler
// @namespace      MrNerdHair
// @include        http*://gvtc.angellearning.com/*/GradeDelivery.aspx*
// ==/UserScript==

function enableStuff() {
    // Disable all inline stylesheets. There's only one on these grade results pages, the one that disables printing.
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href == null) document.styleSheets[i].disabled = true;
    }
    
    // Basic, general right-click-disabler disabler
    var doc = document.wrappedJSObject || document, win = window.wrappedJSObject || window;
    doc.onmouseup = null;
    doc.onmousedown = null;
    doc.oncontextmenu = null;
    doc.onselectstart = null;
}

window.addEventListener("load", enableStuff, false);