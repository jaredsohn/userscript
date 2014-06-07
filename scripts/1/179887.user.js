// ==UserScript==
// @name        Don't try their new photo experience
// @namespace   http://b-burkhart.de
// @description Removes the "try our new photo experience" on flickr pages
// @include     http://*.flickr.com/photos/*
// @version     4
// @grant       none
// ==/UserScript==

// Flickr, as of October 2013, lets users try a new interface.
// There's a bright button on the old style photo page that lets users
// switch to the new page style.
// This script removes this button.

// It's November 2013 and Flickr puts yet another button on a new UI.
// With this version the button will be visible until the page has loaded,
// then it goes away.

unsafeWindow.onload = function() {
  unsafeWindow.setInterval(function() {
    for(var i=0; i<document.getElementsByTagName("button").length; i++) {
      var feedbackButton = document.getElementsByTagName("button")[i];
      if(feedbackButton.getAttribute("class") == "ui-button ui-button-cta") {
        var unused = feedbackButton.parentElement.removeChild(feedbackButton);
      }
    }

    var optIn = document.getElementById("hermes-opt-in");
    optIn.parentElement.removeChild(optIn);
  }, 300);
}

