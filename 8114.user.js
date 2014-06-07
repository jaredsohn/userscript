// ==UserScript==
// @name          MySpace - Featured Books Suck
// @include       http://home*.myspace.com/*
// @include       http://home.myspace.com/*
// @include       http://*.myspace.com/*
// @include       http://*.myspace.com

// @description   Removes The New Featured Books Box From Your Home Page

// ==/UserScript==
(function() {
    
    var allElements, thisElement;
//    allElements = document.getElementsByTagName('table');

thisElement = document.getElementById("home_featured_books").style.display = "none"

    //for (var i = 0; i < allElements.length; i++) {
    //    thisElement = allElements[i];
        
    //    if((thisElement.innerHTML.indexOf("home_featured_books") != -1 && (thisElement.className.indexOf("bodytable") != -1)) {

            thisElement.parentNode.removeChild(thisElement);

    //    }
    //}    

})();


