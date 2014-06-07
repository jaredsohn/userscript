// ==UserScript==
// @name           Remove All Facebook Ads
// @author         http://joshdick.net/programs
// @version        1.4
// @namespace      http://userscripts.org/scripts/show/13787
// @description    Removes any and all ads from Facebook.
// @include        *facebook.com*
// ==/UserScript==

function Remove_Facebook_HighLights() {
	var arr = document.getElementsByTagName("div");
	for (i = 0; i < arr.length; i++) {
	   if (arr[i].className  == 'UIHomeBox UITitledBox') {
			arr[i].style.visibility = 'hidden';
	   }
	}

}

document.addEventListener("DOMNodeInserted", Remove_Facebook_HighLights, true);