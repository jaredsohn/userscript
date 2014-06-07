// ==UserScript==
// @name           Flower LogWork helper
// @namespace      http://userscripts.org/users/231678
// @description    Helps to log work
// @include        /https://flower\.[a-z\.]+/browse/[A-Z]{4}-[0-9]+/
// ==/UserScript==

function log() {
    
    //waits for the pop-up to load
    if (document.getElementById('tempo-logwork-issue-hint') == null) {
        setTimeout(log,100);
    } else {
        if (document.URL.search('PHNX-6') != -1) {
            //checks the Not Billable checkbox
            document.getElementById('time-popup').innerHTML = '20m';
            document.getElementById('popup_NotBillable_').setAttribute('checked', 'checked');
            document.getElementById('comment-popup').innerHTML = 'Scrum Meeting';
        }   
    }
}

document.getElementById("add-hours-on-issue").addEventListener("click", log, false); 