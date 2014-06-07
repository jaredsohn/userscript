// ==UserScript==
// @name        Cura Te Ipsum Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @description Arrow keys do movement.
// @include     http://www.curateipsum.com/*
// @version     2.0
// ==/UserScript==
if(typeof document.getElementsByClassName('navi navi-next')[0].href != "undefined") {
    navNext = document.getElementsByClassName('navi navi-next')[0].href;
}
if(typeof document.getElementsByClassName('navi navi-prev')[0].href != "undefined") {
    navPrev = document.getElementsByClassName('navi navi-prev')[0].href;
}

function leftArrowPressed() {
   window.location = navPrev;
}

function rightArrowPressed() {
   window.location = navNext;
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};
