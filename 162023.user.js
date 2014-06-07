// ==UserScript==
// @name        hide google ads
// @namespace   google
// @description clean up google page
//              - hide sneaky top ads (they look almost like genuine search results!)
//              - hide side ads (useless, irrelevant, and annoying!)
//              - hide useless footer links
//              - hide useless DMCA notices
// @version     1
// @include     http://www.google.com.*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
//
// ==/UserScript==

function jhidethem(idex) {
    $(idex).each( function(ix) {
        jdom = $(this);
        jdom.css("display", "none");
    } );
}


/////////////////////////////////////////////


$(document).ready(function($) {
    jhidethem("#tads");
    jhidethem("#rhsline");
    jhidethem("#bfl");
    jhidethem("#fll");
    jhidethem("p#mfr");
});

//
// END of hide google ads
//

