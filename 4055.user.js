// ==UserScript==
// @name        Netflix Ajax Remover
// @namespace   http://burningbush.us/userscripts
// @description Removes the ajax-y effect from the Netflix "Add to queue" links
// @include     http://www.netflix.com/*
// @include     https://www.netflix.com/*
// @include     http://netflix.com/*
// @include     https://netflix.com/*
// ==/UserScript==

function replace_ajax_add_to_queue() {
    var links = document.getElementsByTagName("A");
    var ct = 0;
    for( var i=0; i<links.length; i++ ) {
        var lnk = links[i];
        if( lnk.className == "addlk" ) { 
            ct += 1;
            lnk.id = "XXX" + lnk.id + "XXX";
        }
    }
}

window.addEventListener("load", replace_ajax_add_to_queue, false );
