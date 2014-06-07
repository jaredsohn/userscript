// ==UserScript==
// @name           BW-Friender
// @namespace      http://www.samliew.com
// @description    Helps you to add friends
//
// @include        */forum/index.php*
// ==/UserScript==

var friendLink = document.getElementsByClassName('ipsButton_secondary');

// click them
for(i=0; i<friendLink.length; i++) {
    if(friendLink[i].title == "Add as Friend") {
        friendLink[i].target = "_blank";
        friendLink[i].click();
    }
}