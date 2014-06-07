// ==UserScript==
// @name                Podnapisi.net Search Download Buttons
// @namespace	        http://www.simonslangen.com/
// @description	        Enables direct download buttons for the subtitle search results on Podnapisi.net
// @version				1.01
// @include				http://podnapisi.net/*/ppodnapisi/search?*
// @include				http://www.podnapisi.net/*/ppodnapisi/search?*

// ==/UserScript==

var list1 = document.getElementsByClassName("subtitle_page_link");
var list2 = document.getElementsByClassName("premium_download");
var i = 0;
function replaceAll(){
	var req = new XMLHttpRequest();
	var url = list1[i].href
	req.open('GET', url, true);
	req.onreadystatechange = function (oEvent) {
		if (req.readyState === 4) {
			if (req.status === 200) {
				var firstIndexP2 = req.responseText.indexOf("/ppodnapisi/download/");
                var firstIndex = req.responseText.lastIndexOf("/",firstIndexP2);
				var secondIndex = req.responseText.indexOf('"', firstIndex);
				list2[i].href = req.responseText.slice(firstIndex,secondIndex);
				var new_element = list2[i].cloneNode(true);	// strips event listeners
				list2[i].parentNode.replaceChild(new_element, list2[i]);
				if(++i < list1.length) {
					replaceAll();
				}
			}
		}
	};
	req.send(null);
}
replaceAll();

document.getElementById("ui-dialog-title-2").innerText = "test";
document.getElementsByClassName("ui-dialog-content ui-widget-content")[0].innerHTML = "test";