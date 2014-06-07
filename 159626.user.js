// ==UserScript==
// @name        Multiplex Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://multiplexcomic.com/strip/*
// @version     1.0
// @description Makes the arrow keys control movement.
// ==/UserScript==

var patt = /^#([0-9]+):/;
var stripNum =  patt.exec(document.getElementById("strip-title").innerHTML);


function leftArrowPressed() {
   window.location = "http://multiplexcomic.com/strip/" + (stripNum[1]- 1);
}

function rightArrowPressed() {
   window.location = "http://multiplexcomic.com/strip/" + (stripNum[1] * 1  + 1);
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