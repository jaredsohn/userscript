// ==UserScript==
// @name        FilterIMDB
// @namespace   http://userscripts.org/users/dargaud
// @description Removes TV, Series, VG and other non-movie results from IMDB
// @include     http://www.imdb.com/name/nm*
// @grant       none
// @version     1
// ==/UserScript==

// This works on pages: overview, by type, by year, by rating but not by votes

var LI = document.getElementsByTagName('li');

for (i=LI.length-1; i>=0; i--) {
    Content = LI[i].textContent;
    if (Content.indexOf(") - \"")>=0 ||         // TV series
        Content.indexOf(" (#")>=0 ||            // Episode of TV series
        Content.indexOf("Episode #")>=0 ||      
        Content.indexOf("Episode dated")>=0 ||  
        Content.indexOf(" (TV)")>=0 ||          // Made for TV
        Content.indexOf(" TV series")>=0 ||
        Content.indexOf(" TV mini")>=0 ||
        Content.indexOf(" (V)")>=0 ||           // Direct to video
        Content.indexOf(" (VG)")>=0             // Video game
    )
        //LI[i].style.visibility = 'hidden';
        LI[i].parentNode.removeChild(LI[i]);
}