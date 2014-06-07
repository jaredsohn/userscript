// ==UserScript==
// @name        DumpertAdBlocker
// @description Disables ads on Dumpert.nl and annoying video advertisement.
// @include     http://www.dumpert.nl/*
// @version     1.2
// ==/UserScript==

var numTries = 200,
    found = false,
    urlPath = window.location.pathname.split("/");

function removeVideoAd(){
    var flashVars = document.getElementsByName("flashvars");

    for(var i = 0, len = flashVars.length; i < len; i++) { 
        flashVars[i].value = new String(flashVars[i].value).replace(/[&]plugins[=].*/i, "");
        found = true;
    }

    if(!found && --numTries > 0) {
        setTimeout(removeVideoAd, 200);
    }
}

// If 'mediabase' is in the url, start removeVideoAd() untill it finds the ad
if(urlPath[1] == "mediabase"){
    window.addEventListener('DOMSubtreeModified', removeVideoAd, false);
}

// Block ads from page
GM_addStyle(".geldbakje, #topbarcontainer, div[id^='div-gpt-ad-'] { display:none!important; }");