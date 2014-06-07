// ==UserScript==
// @name        Lowbird.com left/right for next/previous image
// @namespace   http://userscripts.org/users/nisi
// @include     http://www.lowbird.com/all/view/*
// @version     1.0.1
// @grant       none
// ==/UserScript==

// Add global event listener for left/right arrow key
document.addEventListener('keyup', function(evt) {
    if (evt.keyCode == 37) { // keyCode for left arrow key
        var linksList = getAElements();
        var prevLink = getPrev(linksList);
        if (prevLink != null) {
            window.location.href = prevLink;
        }
    } else if (evt.keyCode == 39) { // keyCode for right arrow key
        var linksList = getAElements();
        var nextLink = getNext(linksList);
        if (nextLink != null) {
            window.location.href = nextLink;
        }
    }
}, false);

// Get list of all <a> tag elements
function getAElements() {
    return document.getElementsByTagName('a');
}

// Iterate over <a> tags and look for the one for the previous image
function getPrev(linksList) {
    var prevLink = null;
    for (var i = 0; i < linksList.length; i++) {
        if (linksList[i].title == 'Previous') {
            prevLink = linksList[i];
        }
    }
    return prevLink;
}

// Iterate over <a> tags and look for the one for the next image
function getNext(linksList) {
    var nextLink = null;
    for (var i = 0; i < linksList.length; i++) {
        if (linksList[i].title == 'Next') {
            nextLink = linksList[i];
        }
    }
    return nextLink;
}

