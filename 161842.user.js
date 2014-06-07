// ==UserScript==
// @name        El Goonish Shivve Navigation Improvements
// @description Arrow keys do movement, and clicking the image goes to next comic.
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://www.egscomics.com/?date=*
// @version     1.0
// ==/UserScript==

if(typeof document.getElementsByClassName("m_comic_nav")[0].childNodes[3].href != "undefined") { //If there is a nav prev
    var navPrev = document.getElementsByClassName("m_comic_nav")[0].childNodes[3].href;
}else{
    var navPrev = "";
}


if(typeof document.getElementsByClassName("m_comic_nav")[0].childNodes[7].href != "undefined") { //If there is a nav next
    var navNext = document.getElementsByClassName("m_comic_nav")[0].childNodes[7].href;
}else{
    var navNext = "";
}


document.getElementsByClassName("comic2")[0].innerHTML = "<a href=\"" + navNext + "\">" + document.getElementsByClassName("comic2")[0].innerHTML + "</a>";


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