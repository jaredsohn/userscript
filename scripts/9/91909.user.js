// ==UserScript== 
// @name Grooveshark HTML5 Ad Remover 
// @namespace http://itsjareds.leadhoster.com/ 
// @description Removes the side banner advertisements on Grooveshark. 
// @author KnifeySpooney (http://spogg.com/KnifeySpooney, http://wurbo.com)
// @version 1.2
// @include http://listen.grooveshark.com/*
// ==/UserScript==

var container = document.getElementById("mainContainer");
var application = document.getElementById("application");
var capital = document.getElementById("capital");

var removeAd = function() {
    if (application && capital) {
            application.style.marginRight = "0px";
            capital.style.display = "none";
    }
}

container.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();