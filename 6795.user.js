// ==UserScript==
// @name          Move MailBox to squareAd
// @include       http://home*.myspace.com/*
// @include       http://home.myspace.com/*


// @description   Moves the mailbox  where the square ad is
// @exclude       http://comments.myspace.com/*

// ==/UserScript==

var tempHTML, lastItem, newElement;


thisElement = document.getElementById("home_messages")
tempHTML = thisElement.innerHTML;  //save the mail box so we can re-generate it
thisElement.parentNode.removeChild(thisElement);  //delete it

var tempDiv = document.createElement("div");

tempDiv.innerHTML = '<div id="home_messages" class="section">' + tempHTML

lastItem = document.getElementById('squareAd');

if (lastItem) {

    lastItem.parentNode.insertBefore(tempDiv, lastItem.nextSibling);

    
    //newElement = document.createElement('hr');

    //lastItem.parentNode.insertBefore(newElement, lastItem.nextSibling);
    }




