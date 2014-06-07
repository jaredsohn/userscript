// ==UserScript==
// @name        Schlock Mercenary Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @description Makes the image a link to the next comic, and arrow keys control movement.
// @include     http://www.schlockmercenary.com/*
// @version     1.0
// ==/UserScript==




if(document.getElementById('nav-next').tagName == "A") //If the next link is a link(It's a div when no new comic)
{
	var navNext = document.getElementById('nav-next');
}
else
{
	var navNext = ""
}

document.getElementById('comic').innerHTML = '<a href="' + navNext + '">' + document.getElementById('comic').innerHTML + '</a>';


function leftArrowPressed() {
	window.location = document.getElementById('nav-previous');
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