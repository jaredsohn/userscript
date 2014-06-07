// ==UserScript==
// @name           Runescape Forum Avatar Switcher
// @namespace      http://www.source.site90.com/
// @description    Displays full body avatar images on the Runescape forums instead of just the head images
// @include        http://forum.runescape.com/*
// ==/UserScript==

if (document.getElementsByClassName('avatar').length > 0){ // Avatars present on page
    avatars = document.getElementsByClassName('avatar'); // Create an array of avatars
    for (i = 0; i < avatars.length; i++){ // Loop through every avatar on page
        avatars[i].src = avatars[i].src.replace("chat.gif", "full.gif"); // Replace head images will full body ones
    }
}