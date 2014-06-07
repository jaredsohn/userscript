// ==UserScript==
// @name Fanfiction.net link grabber
// @include   http://*.fanfiction.net/book/*
// @author    Herby Canopy
// @version   1.1
// ==/UserScript==
// License    Public Domain

// 1) when the page is loaded it starts a time counter once it gets to that time it runs the funciotn grabber.
window.addEventListener("load", function(e) {
window.setTimeout(grabber, 2000);
}, false);

// 2) from here down starts the function that is called by the end of the timer

function grabber(){
// 3) get all links
    var allLinks = document.getElementsByTagName('a');

// 4) create a new array for the links that we want
    var myLinks = [];

// 5) walk through all links and add their addresses to myLinks array only if they match
    for (var i = 0; i < allLinks.length; i++) {
     if (allLinks[i].href.match(/\/s\/.*\/1\//)) {
         myLinks.push(allLinks[i].href);
      }
    }

// 6) create a new div element, insert it into the document and display the links there
    document.body.insertBefore(document.createElement('div'), 
    document.body.firstChild).innerHTML = myLinks.join('<br>');
}


// Change log
// 1.1 = Thanks to Joe Simmons for the timer code 
// 1.0 = Thanks to AncientSpirit for the "allLinks" and myLinks ver, also the inserting of the  links to the page.  
// 1.0 beta = my crappy attempt at the code of the link grabber