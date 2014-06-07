// ==UserScript==
// @name          Books24x7 accessify
// @namespace     http://dbhlim.org
// @include       http://skillport.*
// @description   Enable keyboard navigation for Books24x7. Alt+. goes to next page, Alt+, to the previous page.
// @version       0.1
// ==/UserScript==

var prevKey = ",";
var nextKey =".";

var allLinks, thisLink;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if (thisLink.innerHTML == '<img src="images/arrow_readprevious.gif" alt="Previous Section" border="0" height="22" hspace="0" width="94">'){
      thisLink.setAttribute("accesskey", prevKey);
    }
    if (thisLink.innerHTML == '<img src="images/arrow_readnext.gif" alt="Next Section" border="0" height="22" hspace="0" width="94">'){
      thisLink.setAttribute("accesskey", nextKey);
    }
}

//set focus on the new page to enable scrolling via arrow keys
parent.frames[3].focus();
