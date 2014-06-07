// ==UserScript==
// @name        Hanna is not a Boys Name Next Link in Comic Image
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://hanna.aftertorque.com/?p=*
// @version     1.0
// @description Makes the image a link to the next comic, and arrow keys control movement.
// @grant       none
// ==/UserScript==


if(document.getElementById('menunav').childNodes[2].innerHTML)
{
	var navNext = document.getElementById('menunav').childNodes[2];
}
else
{
	var navNext = ""
}

document.getElementById('comic').innerHTML = '<a href="' + navNext + '">' + document.getElementById('comic').innerHTML + '</a>';


function leftArrowPressed() {
	window.location = document.getElementById('menunav').childNodes[1];
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