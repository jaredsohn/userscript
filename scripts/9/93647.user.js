// megafilex ads remover
// written by Julio Matus
// 
// This script allows you to access www.megafilex.com without
// having to see those annoying ads they have...
// www.megafilex.com is a Japanese stream video porn site, like pornhub.com,
// xvideos.com, etc.
//
// ==UserScript==
// @name          megafilex ads remover
// @namespace     http://rikijpn.co.cc/en/
// @description   Access www.megafilex.com without the ads
// @include       http://www.megafilex.com
// @include       http://www.megafilex.com/*
// ==/UserScript==

function removeElementWithClass(id){
    var items = document.getElementsByClassName(id).length;
    for (var i = 0; i < items; i++){
	elementToRemove = document.getElementsByClassName(id)[0];
	if (elementToRemove){
	    elementToRemoveParent = elementToRemove.parentElement;
	    elementToRemoveParent.removeChild(elementToRemove);
	}
    }
}
removeElementWithClass("ads");
removeElementWithClass("btitle");

//now show page prettier
//on video page
if (document.URL.substr(0, 31) == "http://www.megafilex.com/video/"){
    document.getElementsByClassName("left span-630")[0].style.width = "100%";
    document.getElementById("container").style.cssfloat = "none";
    document.getElementById("container").style.textAlign = "center";
}

//on search page
if (document.URL.substr(0, 31) == "http://www.megafilex.com/search"){
    document.getElementsByClassName("left span-755")[0].style.width = "100%";
}
