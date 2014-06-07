// ==UserScript==
// @name          MySpace - Cool People Suck
// @include       http://home*.myspace.com/*
// @include       http://home.myspace.com/*
// @include       http://*.myspace.com/*
// @include       http://*.myspace.com

// @description   Removes The "Cool New People" Box
// @exclude       http://comments.myspace.com/*

// ==/UserScript==
(function() {
    
    var allElements, thisElement;
//    allElements = document.getElementsByTagName('table');

thisElement = document.getElementById("splash_coolNewPeople").style.display = "none"

    //for (var i = 0; i < allElements.length; i++) {
    //    thisElement = allElements[i];
        
    //    if((thisElement.innerHTML.indexOf("splash_CoolNewPeople") != -1 && (thisElement.className.indexOf("bodytable") != -1)) {

            thisElement.parentNode.removeChild(thisElement);

    //    }
    //}    
})();


