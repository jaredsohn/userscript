// TwitterGrammarian - a Greasemonkey script by Sam Holloway, sam@samholloway.co.uk
// Version 1.1 tested 17th August 2011
// ==UserScript==
// @name           TwitterGrammarian
// @namespace      http://www.samholloway.co.uk
// @description    Corrects Twitter's grammar
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
            els[i].innerHTML = "Whom to follow";
	    document.removeEventListener ("DOMSubtreeModified", do_work, false);
            break;
        }
    }
}
