// ==UserScript==
// @name        I am ARG navigation improvement
// @namespace   http://userscripts.org/users/scuzzball
// @include     http://iamarg.com/*
// @version     1.1
// @grant       none
// ==/UserScript==


navNext = document.getElementsByClassName('navi-next')[0].href;
if(navNext == undefined){
    navNext = "#";
}
navPrev = document.getElementsByClassName('navi-prev')[0].href;
if(navPrev == undefined){
    navPrev = "#";
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