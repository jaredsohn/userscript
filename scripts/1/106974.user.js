// ==UserScript==
// @author       Andrew Hays
// @name         IMO PageUp/PageDown Tab Switcher
// @namespace    http://www.andrewhays.net
// @description  Script to change tabs on imo.im using Page up and Page Down
// @include      https://imo.im/*
// ==/UserScript==
window.onload = function() {
    var body = document.getElementsByTagName("body")[0];
    console.log("================================");
    console.log(body);
    console.log("================================");
    body.addEventListener("keydown", function(evt) {
        // Dirty hack, but Chrome doesn't like accessing the globals 
        // apparently.  Consider revising?
        if (evt.keyCode == 33 && !evt.ctrlKey) {
            location.assign(
                "javascript:IMO.WM.TWM.focus_prev();IMO.WM.FWM.focus_prev();");
        } else if (evt.keyCode == 34 && !evt.ctrlKey) {
            location.assign(
                "javascript:IMO.WM.TWM.focus_next();IMO.WM.FWM.focus_next();");
        }
    }, false);
}
