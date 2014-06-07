// ==UserScript==
// @name       DeLink
// @version    0.1
// @description  Disables all links so the text within is selectable
// @copyright  2012+, Arokh
// ==/UserScript==

var hoveredElem;
var hrefUri;

function onMouseUp(evt) {
    if (hoveredElem) {
        setTimeout(function () {
            hoveredElem.href = hrefUri;
            hoveredElem = null;
            hrefUri = null;
        }, 0);
    }
}
document.addEventListener("mouseup", onMouseUp);

function onMouseDown(evt) {
    if (!evt.ctrlKey || !evt.shiftKey) return;

    hoveredElem = document.elementFromPoint(evt.clientX, evt.clientY);

    while (hoveredElem) {
        if (hoveredElem.nodeName == "A") break;
        hoveredElem = hoveredElem.parentElement;
    }
    if (!hoveredElem) return;
	
    window.getSelection().empty();
    hrefUri = hoveredElem.href;
    hoveredElem.removeAttribute("href");
}
document.addEventListener("mousedown", onMouseDown);
