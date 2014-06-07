// ==UserScript==
// @name           Realign MyAnimeList Airing / Not Yet Aired / Publishing
// @description    Easily identify if a series is currently airing, has yet to air, or is currently being published.
// @lastupdated    2011-05-13
// @namespace      VR23rvQ1xT
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 4.0.1
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// ==/UserScript==

var allSmallAreas = document.getElementsByTagName('small');
for (var i in allSmallAreas) {
    var thisSmallArea = allSmallAreas[i];
    if (thisSmallArea.innerHTML == "Airing" || thisSmallArea.innerHTML == "Not Yet Aired" ||
      thisSmallArea.innerHTML == "Publishing") {
        // Add a minus sign to the end so it blends in with "Edit - More"
        //thisSmallArea.innerHTML += " -";
        
        // Align text to the right
        thisSmallArea.setAttribute("style", "float: right; padding-right: 5px");
        
        // Color text red so it stands out more, also align it to the right
        //thisSmallArea.setAttribute("style", "color: red; float: right; padding-right: 5px");
        
        // Highlight text, but don't align it to the right
        //thisSmallArea.setAttribute("style", "color: black; background-color: yellow");
    }
}
