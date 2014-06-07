// ==UserScript==
// @name Dink Network Lurker Names
// @description Adds the name of a Dink Network user under his or her avatar in the Lurkers section.
// @version 1.0
// @include http://*dinknetwork.com/*
// ==/UserScript==

// Get all the divs so we can look for the spot to insert the username.
var divs = document.getElementsByTagName('div');
var lurkers = new Array();

for (i = 0; i < divs.length; i++) {

    // See if we've found the div of a lurker.
    if (divs[i].className == 'lurker') {
        lurkers.push(divs[i]);
    }

}

for (i = 0; i < lurkers.length; i++) {

    var lurker_div = lurkers[i];

    // Look for the lurker avatar.
    var images = lurker_div.getElementsByTagName('img');
    var avatar = images[0];
    
    // Get the username by getting the alt attribute of the avatar.
    var username = avatar.alt;
    
    // Create a lurker container div, and set its style so that the name is centered
    // and the lurkers below are moved down past the name.
    var lurker_container = document.createElement('div');
    var style = 'text-align: center; width: 56px; overflow: auto; float: left;';
    lurker_container.setAttribute('style', style);
    lurker_container.setAttribute('class', 'lurker_container');
    
    // Create the element that will contain the username.
    var username_span = document.createElement('span');
    username_span.setAttribute('style', 'font-family: Arial, sans-serif; font-size: 60%;');
    username_span.innerHTML = username;

    // Replace the lurker div with the lurker container, 
    // and insert the lurker div and the username 
    // as the children of the container.
    var parent = lurker_div.parentNode;
    parent.replaceChild(lurker_container, lurker_div);
    lurker_container.appendChild(lurker_div);
    lurker_container.appendChild(username_span);

    // break;
}