// ==UserScript==
// @name        Happle Tea Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://www.happletea.com/*
// @version     1.0
// @description Makes the image a link to the next comic, and arrow keys control movement.
// ==/UserScript==

if(typeof document.getElementsByClassName('navi navi-next')[0].href != 'undefined')
{
    var navNext = document.getElementsByClassName('navi navi-next')[0].href;
}
else
{
    var navNext = '';
}

var navPrev = document.getElementsByClassName('navi navi-prev')[0].href;



document.getElementById('comic-1').innerHTML = '<a href="' + navNext + '">' + document.getElementById('comic-1').innerHTML + '</a>';

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