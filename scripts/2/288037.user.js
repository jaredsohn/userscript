// ==UserScript==
// @description Removes the annoying youtube recommendations on the main page of youtube.
// @include http://www.youtube.com/
// @include http://youtube.com/
// @name Youtube Cleaner
// @namespace kgnc
// @version 1.0.1
// @downloadURL http://userscripts.org/scripts/source/288037.user.js
// ==/UserScript==



//Find and destroy Recommended and Youtube popular
titles = document.getElementsByClassName("shelf-title");
titleLength = titles.length - 1;
for (;titleLength >= 0;titleLength--){
	if ((titles[titleLength].innerHTML.indexOf("Recommended") != -1) || (titles[titleLength].innerHTML.indexOf("Popular on YouTube - Worldwide") != -1)){
			titles[titleLength].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "None";
	}
}

//Find and destroy recommended channels
subButtons = document.getElementsByClassName("shelf-subscription-button yt-uix-button-subscription-container");
buttonLength = subButtons.length - 1;
for (;buttonLength >= 0;buttonLength--){
	subButtons[buttonLength].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "None";
}