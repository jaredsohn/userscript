// ==UserScript==
// @name          Cool New People Remover
// @include       http://home*.myspace.com/*
// @include       http://home.myspace.com/*


// @description   Removes The "Cool New People" Box From The Home Page
// @exclude       http://comments.myspace.com/*

// ==/UserScript==
(function() {
    
    var allElements, thisElement;
    allElements = document.getElementsByTagName('table');
    for (var i = 0; i < allElements.length; i++) {
        thisElement = allElements[i];
        
        if((thisElement.innerHTML.indexOf("Cool New People") != -1) && (thisElement.className.indexOf("bodytable") != -1)) {
            thisElement.parentNode.removeChild(thisElement);
        }
    }    
})();