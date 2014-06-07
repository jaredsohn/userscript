// ==UserScript==
// @name           Cute Undertext
// @namespace      http://userscripts.org/users/29897
// @description    Add alt/title text under peektoors.
// @include        http://cuteoverload.com*
// @include        http://mfrost.typepad.com*
// ==/UserScript==

var capColour = "#66E";

var allImgs = document.getElementById("content");
if (allImgs) {
	allImgs = allImgs.getElementsByTagName("img");
	for (var x = 0; x < allImgs.length; x++) {
		var thisImg = allImgs[x];
		if (thisImg.getAttribute("class") == "flickr-photo") {
			var thisTitle = thisImg.parentNode.getAttribute("title");
			var theSpan = thisImg.parentNode.nextSibling.nextSibling;
			theSpan.innerHTML += '<br />&nbsp; &nbsp; <font color="' + capColour + '">(' + thisTitle + ')</font>';
		} else {
			var thisTitle = thisImg.getAttribute("title");
			if (thisTitle) {
				var thisCaption = document.createElement("p");
				thisCaption.setAttribute("style", "text-align: center; font-weight: normal; color: " + capColour + "; margin-top: 0px;");
				thisCaption.appendChild(document.createTextNode("[" + thisTitle + "]"));
				thisImg.parentNode.parentNode.insertBefore(thisCaption, thisImg.parentNode.nextSibling);
			}
		}
	}
}
