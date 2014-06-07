// ==UserScript==
// @name           No More HighLights on FaceBook.com
// @author         Pavel Kaminsky
// @version        1
// @namespace     
// @description    The Highlight bar from facebook
// @include        *facebook.com*
// ==/UserScript==

function Remove_Facebook_HighLights() {
	var arr = document.getElementsByTagName("div");
	for (i = 0; i < arr.length; i++) {
	   if (arr[i].className  == 'UIHomeBox UITitledBox' || arr[i].className  == 'UIHomeBox_Sponsored UIHomeBox UITitledBox') {
			arr[i].parentNode.removeChild(arr[i]);
	   }
	}

}

document.addEventListener("DOMNodeInserted", Remove_Facebook_HighLights, true);