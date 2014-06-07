// ==UserScript==
// @name        Full Frontal Nerdity Image Link
// @namespace   http://userscripts.org/users/Scuzzball
// @description Makes the image a link to the next comic, and arrow keys control movement.
// @grant       none
// @include     http://ffn.nodwick.com/*
// @version     2.0
// ==/UserScript==


var navNext = "";
var navPrev = "";
var elements = document.getElementsByTagName('div'); //Get all the div tags
for (var i in elements) //Loop over all the divs
{
	if((" " + elements[i].className + " ").indexOf(" nav-next ") > -1) //If we got the next button
	{
		navNext = elements[i].childNodes[0];
		document.getElementById('comic-1').innerHTML = '<a href="' + navNext + '">' + document.getElementById('comic-1').innerHTML + '</a>';
	}
	else if((" " + elements[i].className + " ").indexOf(" nav-previous ") > -1)
	{
		navPrev = elements[i].childNodes[0];
	}
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
