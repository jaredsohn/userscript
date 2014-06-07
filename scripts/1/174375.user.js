// ==UserScript==
// @name        Keyboard Navigation for Worm
// @description Just adds arrow key movement.
// @namespace   http://userscripts.org/users/scuzzball
// @include     http://parahumans.wordpress.com/*
// @grant       none
// @version     1.0
// ==/UserScript==

if(document.getElementsByClassName('nav-next')[0].hasChildNodes()){//so if the menunav-next div is not empty, get the next link. Otherwise, blank.
    navNext = document.getElementsByClassName('nav-next')[0].firstChild.getAttribute("href");
}else{
    navNext="";
}

if(document.getElementsByClassName('nav-previous')[0].hasChildNodes()){//so if the menunav-next div is not empty, get the next link. Otherwise, blank.
    navPrev = document.getElementsByClassName('nav-previous')[0].firstChild.getAttribute("href");
}else{
    navPrev="";
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