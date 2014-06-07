// Proves based on - a Greasemonkey script by Sam Holloway, sam@samholloway.co.uk
// Version 1.1 tested 17th August 2011
// ==UserScript==
// @name           Proves
// @namespace      http://www.catmidia.cat
// @description    Fent proves
// @include        http://*twitter.com/*
// ==/UserScript==

// Replace the title bar 'who' with 'whom'
var el = document.getElementById('global-nav-who_to_follow');
el.innerHTML = el.innerHTML.replace("Who ", "Whom ");

window.addEventListener("load", wait_for_load, false);

function wait_for_load() {
    document.addEventListener ("DOMSubtreeModified", do_work, false);
}

function do_work() {
    // Replace the side bar 'who' with 'whom'
    var els = document.getElementsByClassName('dashboard-component-title');
    for(var i = 0; i < els.length; ++i) {
        if(els[i].innerHTML == "Who to follow") {
            els[i].innerHTML = "A qui seguir";
	    document.removeEventListener ("DOMSubtreeModified", do_work, false);
            break;
        }
    }
    var els = document.getElementsByClassName('refresh-suggestions');
    for(var i = 0; i < els.length; ++i) {
        if(els[i].innerHTML == "refresh") {
            els[i].innerHTML = "actualitza";
	    document.removeEventListener ("DOMSubtreeModified", do_work, false);
            break;
        }
	}
    var els = document.getElementsByClassName('activity-timestamp');
    for(var i = 0; i < els.length; ++i) {
        if(els[i].innerHTML == "hour") {
            els[i].innerHTML = "hora";
	    document.removeEventListener ("DOMSubtreeModified", do_work, false);
            break;
        }
    }
}
