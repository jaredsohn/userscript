// ==UserScript==
// @id             xHamster-AutoScroll@scriptish
// @name           xHamster Auto Scroll to Media
// @namespace      http://userscripts.org/users/Viell
// @description    Automatically scrolls to the video or picture on load. (Based on "YouTube Auto Scroll To Video" by JoeSimmons).
// @version        1.0.2
// @author         Viell
// @include        http*://xhamster.com/movies/*
// @include        http*://*.xhamster.com/movies/*
// @include        http*://xhamster.com/photos/*
// @include        http*://*.xhamster.com/photos/*
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @downloadURL    http://userscripts.org/scripts/source/186513.user.js
// @updateURL      http://userscripts.org/scripts/source/186513.meta.js
// ==/UserScript==

+function () {

    function scrollToElement(theElement) {
        var posY = 0;
        theElement = document.getElementById(theElement);

        while (theElement != null) {
            posY += theElement.offsetTop;
            theElement = theElement.offsetParent;
        }

        window.scrollTo(0, posY);
    }

    if (document.URL.indexOf("movies") == -1) {
		scrollToElement('viewBox');
	} else {
		scrollToElement('playerBox');
	}

}();