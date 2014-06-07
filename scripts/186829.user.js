// ==UserScript==
// @name        YouTube Scroll Comments
// @author      John Van Naarden
// @namespace   JPVN
// @description Keeps video on top and scrolls comments and sidebar
// @include     http*://*.youtube.com/*
// @include     http*://youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     1
// @grant       none

// ==/UserScript==

//-- Pages are "loaded" via AJAX...



function makeChanges(){

    // Limits the document to the screen size. This forces the footer to the bottomm of the screen
    document.getElementById("body-container").style.maxHeight = "100%";
    
   // Limits the document to the screen size. This forces the footer to the bottomm of the screen
    document.getElementById("body-container").style.maxHeight = "100%";
    
    
    // Adjust the top margin for video links so that it sits next to comments as opposed to next to video
    document.getElementById("watch7-sidebar").style.marginTop = "10px";
    
    // Sets the height of the video player section
    document.getElementById("player").style.height = "390px";
    document.getElementById("player").style.overflow= "hidden";
    
    // Sets the height of the comments, allows for scrolling
    document.getElementById("watch7-main-container").style.height= "365px";
    document.getElementById("watch7-main-container").style.overflowY= "scroll";
    //document.getElementById("watch7-main-container").style.zIndex = "-1";
    //document.getElementById("watch7-main-container").style.position = "relative";
    
    
    // This stuff makes the footer skinnier for more room for comments
    document.getElementById("footer-container").style.height= "109px";
    document.getElementById("footer-container").style.marginTop = "-110px";
    document.getElementById("footer").style.height= "75px";
    document.getElementById("footer-links").style.padding= "2px 0px 0px 8px";

}

waitForKeyElements("#watch-discussion", makeChanges);
//makeChanges();