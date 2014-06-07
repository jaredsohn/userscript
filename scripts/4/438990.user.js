// ==UserScript==
// @name        tf2r norumble
// @namespace   tf2r.com
// @include     http://tf2r.com/*.html
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

// Originally from http://userscripts.org/scripts/show/125936

// This now works with the rumble script and Kick's sorry script
scriptsLeft=2;

window.addEventListener('beforescriptexecute', function(e) {
    console.log(e);
    if(/startRumble|sorry/.test(e.target.innerHTML)) {
        e.stopPropagation();
        e.preventDefault();  
        scriptsLeft--;
        if(scriptsLeft==0)
           window.removeEventListener(e.type, arguments.callee, true);
    }
}, true);

