// ==UserScript==
// @name          Move Stat Block
// @include       http://home*.myspace.com/*
// @include       http://home.myspace.com/*


// @description   Moves the stat block below my friends
// @exclude       http://comments.myspace.com/*

// ==/UserScript==

var tempHTML, lastItem, newElement;

thisElement = document.getElementById("home_infoBar")
tempHTML = thisElement.innerHTML;  //save the homeinfo bar so we can re-generate it
thisElement.parentNode.removeChild(thisElement);  //delete it from the top

var tempDiv = document.createElement("div");
tempDiv.innerHTML = '<div id="home_infoBar" class="section">' + tempHTML

lastItem = document.getElementById('home_friends');
if (lastItem) {
    lastItem.parentNode.insertBefore(tempDiv, lastItem.nextSibling);
    
    //newElement = document.createElement('hr');
    //lastItem.parentNode.insertBefore(newElement, lastItem.nextSibling);
    }



