// ==UserScript==
// @name        The Fancy Adventures oF Jack Cannon Improved Navigation
// @namespace   http://userscripts.org/users/Scuzzball
// @description Adds keybaord navigation.
// @include     http://fancyadventures.com/*
// @version     1
// ==/UserScript==



if(document.getElementById('menunav').childNodes[2]) //If we have a next link
{
	var navNext = document.getElementById('menunav').childNodes[2].href;
}
else
{
	var navNext = ""
}

function leftArrowPressed() {//Previous
	if(document.getElementById('menunav').childNodes[1].rel =="prev")
	{
		window.location = document.getElementById('menunav').childNodes[1].href;
	}
	else
	{
		alert("woo");
	}
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