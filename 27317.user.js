// ==UserScript==
// @name          Reddit: Hide sidebar
// @description   Hide the giant sidebar on reddit.com.
// @include       *reddit.com*
// ==/UserScript==

divs = document.getElementsByTagName("div")
for (var i=0; i<divs.length; i++) {
    if (divs[i].className == "side"){
	divs[i].parentNode.removeChild(divs[i])
    }
}