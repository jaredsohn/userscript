// ==UserScript==
// @name        Fredo & Pid'Jin Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://www.pidjin.net/*
// @version     1.0
// @description JUST adding arrow key navigation
// @grant       none
// ==/UserScript==

if(document.getElementsByClassName('next')[0].childNodes[1].tagName != "SPAN") //If there is a next button
{
	var navNext = document.getElementsByClassName('next')[0].childNodes[1].tagName;
}
else
{
	var navNext = '';
}
var navPrev = document.getElementsByClassName('prev')[0].childNodes[1];



		//document.getElementById('comic-1').innerHTML = '<a href="' + navNext + '">' + document.getElementById('comic-1').innerHTML + '</a>';

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