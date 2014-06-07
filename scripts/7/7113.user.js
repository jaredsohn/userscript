/*
DNSStuff - Remove shit at top and bottom
Version 0.1
(C) 2007 S.D.Rycroft
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/

// ==UserScript==
// @name            DNSStuff - remove shit at top and bottom
// @namespace       http://dnsstuff.simon.rycroft.name/
// @description     Removes the shit at the top of DNSStuff.com
// @include         http://www.dnsstuff.com/
// ==/UserScript==

var allTr = document.getElementsByTagName('tr');
if (allTr) {
    for (var i=0; i<allTr.length; i++){
        var tr = allTr.item(i);
        if (i<5 ||i>55)
            tr.innerHTML="";
    }
}

var footer = document.getElementById("footer");
footer.innerHTML="";