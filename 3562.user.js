// Version 1.0
// Saturday, March 18, 2006.
// Myspace Junk Remover
// Adam Knutson

// ==UserScript==
// @name          Myspace Junk Remover
// @include       http://*.myspace.com/*
// @include       http://www.myspace.com/

// @description   Removes The "Cool New People" Box, Featured Profile, and other junk from Myspace.

// ==/UserScript==

var location = window.location.toString();

if (location == "http://www.myspace.com/") {
    // if we're at the main page, remove the left half(nav) and the videos.
    var nav = document.getElementById("nav");
    nav.parentNode.removeChild(nav);

    // remove the "cool" new people.
    var cnp = document.getElementById("splash_coolNewPeople");
    cnp.parentNode.removeChild(cnp);
    
    // remove the videos.
    var vids = document.getElementById("splash_featuredVideos");
    vids.parentNode.removeChild(vids);
}

if( location.indexOf('home\.myspace\.com') > -1 ) {
    // we're at the home page.
    // Remove the "cool" new people.
    var cnp = document.getElementById("splash_coolNewPeople");
    cnp.parentNode.removeChild(cnp);

    // remove the "Featured Profile".
    var profile = document.getElementById("splash_profile");
    profile.parentNode.removeChild(profile);
}




