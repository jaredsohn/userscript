// ==UserScript==
// @name        TEST5558944
// @description Kleiner TEST
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://www.google.de/
// @version     1.0.1
// @grant none
// @author zdoom
// @updateURL http://userscripts.org/scripts/edit/402385
// @downloadURL http://userscripts.org/scripts/show/402385
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==

window.helloworld = function() {
    alert('Heutiger Allianzstatus "ROT!!!"');
}

window.setTimeout("helloworld()", 60);