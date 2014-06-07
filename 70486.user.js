// ==UserScript==
// @name           Pardus Chat Automatic Colors
// @version        1.0
// @namespace      coawyn@gmail.com
// @description    Automatically assigns a color to each person in chat based on their pilot id.
// @homepage       http://unique.hobby-site.com/
// @include        http://chat.pardus.at/chattext.php*
// ==/UserScript==
var hijack = function(){

	var chatWnd = document.getElementById("ChatWnd");
	var chatDivCount = 1;



	function processChat() {
		var chatDivs = chatWnd.childNodes;
		for (; chatDivCount < chatDivs.length; chatDivCount = chatDivCount + 2) {
			var lineDiv = chatDivs[chatDivCount];
			var start = lineDiv.innerHTML.indexOf("profile.php?id=");
			var crop = lineDiv.innerHTML.substring(start+15);
			var profileId = crop.substring(0,crop.indexOf(" ")-1);
			lineDiv.getElementsByTagName("b")[0].style.color = "#" + convertToColor(profileId);
		}
	}



	function convertToColor(profileId) {
		var hex = Number(profileId).toString(16);
		while (hex.length < 6) {
			hex = 'F' + hex;
		}
		return hex;
	}



	processChat();

	var originalAjaxCallback = window.ajaxCallback;
	window.ajaxCallback = function(result, errors) {
		originalAjaxCallback(result, errors);
		processChat();
	}

};
var script = document.createElement("script");
script.textContent = "(" + hijack.toString() + ")()";
document.body.appendChild(script);