// ==UserScript==
// @name       Collapse Explore tray by default on Google Maps
// @namespace  http://robert.walkertribe.com
// @version    1.0
// @description  I hate that the Explore tray on the new Google Maps is open by default. This script collapses it.
// @match      https://www.google.com/maps/*
// @copyright  2013 Robert J. Walker
// ==/UserScript==
function checkForTray() {
	var trigger = document.querySelector(".widget-viewcard-expand-button"), ev;

    if (trigger) {
        if (trigger.fireEvent) {
            trigger.fireEvent("onclick");
        } else {
            ev = document.createEvent("Events");
            ev.initEvent("click", true, false);
            trigger.dispatchEvent(ev);
        }
    } else {
        setTimeout(checkForTray, 100);
    }
}
checkForTray();