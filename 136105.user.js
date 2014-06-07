// ==UserScript==
// @name     FdT-LinkFixer
// @version  0.5
// @namespace http://forumdeitroll.it/
// @description Fix forumdeitroll.com links 
// @include     *
// ==/UserScript==

// FDT-LinkFixer
// Idea 2012 by Yakko Warner
// Thanks to ::1 for the precious help
// License Creative Commons 3.0 BY-SA

Array.prototype.filter.call(document.querySelectorAll("a"), function(belink) {
    return belink.href.match(/www\.forumdeitroll\.it\/m\.aspx/)
}).forEach(function(belink) {
    belink.href = "http://forumdeitroll.com/Messages?action=getById&msgId=" +
        belink.href.match(/m_id=(\d+)/)[1]
})
