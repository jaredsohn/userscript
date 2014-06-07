// ==UserScript==
// @name        Questionable Content Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @description Adds arrow keys control.
// @include     http://questionablecontent.net/view.php?comic=*
// @grant       none
// @version     1.0
// ==/UserScript==




function leftArrowPressed() {
	window.location = document.getElementById('comicnav').children[1].children[0].href;
}

function rightArrowPressed() {
	window.location = document.getElementById('comicnav').children[2].children[0].href;
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
