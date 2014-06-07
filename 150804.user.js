// ==UserScript==
// @name        SMBC Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @description Adding keyboard navigation, aftercomic text just displayed, and aftercomic image is a link to the next comic.
// @include     http://www.smbc-comics.com/*
// @version     1.0
// ==/UserScript==

function getNextAndPrevious() {
    var areas = document.getElementsByTagName("area");
    var links = [];
    for (var i = 0, len = areas.length; i < len; ++i) {
        if (areas[i].coords == "351,21,425,87") {//Next coordinates. Uses one bloody image for navigation, and linkes based on coordinates in the image. CAUSE THAT"S A GOOD WAY TO DO IT.
            links["next"] = areas[i].href;
        }
        if (areas[i].coords == "131,13,216,84") { //Previous coordinates
            links["previous"] = areas[i].href;
        }
    }
    return links;
}



var links = getNextAndPrevious();

document.getElementById('refbox').parentNode.parentNode.childNodes[0].innerHTML='<a href="' + links['next'] + '"><img src="' + document.getElementById('aftercomic').childNodes[1].src + '"></a>'; //This is shenanagans to get the aftercomic image displayed. 'refbox' is the only ID near where I want to display it.

  
function leftArrowPressed() {
	window.location = links['previous'];
}

function rightArrowPressed() {
	window.location = links['next'];
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