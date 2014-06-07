// ==UserScript==
// @name Christmas 7s Avatars
// @author Z61
// @homepage http://z61.org
// @namespace org.z61
// @match http://www.se7ensins.com/forums/*
// @version 1.0.1
// ==/UserScript==
var path = window.location.pathname;
var elements = document.getElementsByClassName("avatar");
var size = elements.length;
for (var i = 0; i < size; i++)
{
	var div = document.createElement("div");
    div.className = "santaHat";
    div.style.background = "url(http://z61.org/hat.png)";
    div.style.backgroundSize = "contain";
    div.style.backgroundRepeat = "no-repeat";
    div.style.display = "block";
	if (checkPathAgainst("/personal-details")) {
	    div.style.width = "48px";
    	div.style.height = "48px";
        div.style.position = "relative";
    	div.style.left = "-5px";
    	div.style.top = "-110px";
	}
    else if(hasClass(elements[i].firstChild, "m")) {
    	div.style.width = "48px";
    	div.style.height = "48px";
        div.style.position = "absolute";
    	div.style.left = "5px";
    	div.style.top = "0px";
    }
    else if (hasClass(elements[i].firstChild, "s"))
    {
     	div.style.width = "24px";
        div.style.height = "24px";
        div.style.position = "relative";
    	div.style.left = "0px";
    	div.style.top = "-55px";        
    }
    else if (elements[i].firstChild.getAttribute("height") == 96)
    {
     	div.style.width = "48px";
        div.style.height = "48px";
        div.style.position = "relative";
    	div.style.left = "0px";
    	div.style.top = "-120px";        
    }
    else if (hasClass(elements[i].parentElement, "comment"))
    {
     	div.style.width = "24px";
        div.style.height = "24px";
        div.style.position = "relative";
    	div.style.left = "0px";
    	div.style.top = "0px";           
    }
    else
    {
        div.style.width = "20px";
        div.style.height = "20px";
        div.style.position = "absolute";
        div.style.left = "5px";
        div.style.top = "0px";
    }
    wrapElem(elements[i].firstChild, div, "div");

}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function checkPathAgainst(string) {
	if (path.indexOf(string) > -1)
		return true;
	else
		return false;
}
function wrapElem(el, santaHat, wrapWith) {
    var newElem = document.createElement(wrapWith);
    newElem.className = "santaAvatar";
    el.parentNode.insertBefore(newElem, el);
    newElem.appendChild(el);
    newElem.appendChild(santaHat);
}
// there's good potential for this to be buggy as all hell, my apologies.