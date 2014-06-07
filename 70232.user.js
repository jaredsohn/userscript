// ==UserScript==
// @name           Pardus Chat Color Rotator
// @version        1.0
// @namespace      coawyn@gmail.com
// @description    Rotates through the available chat colors in Pardus.
// @homepage       http://unique.hobby-site.com/
// @include        http://chat.pardus.at/chat.php*
// ==/UserScript==
var hijack = function(){



	function rotateColor() {
		var chatColor = document.getElementById("chatmsg_color");
		if (chatColor.selectedIndex == (chatColor.length - 1)) {
			chatColor.selectedIndex = 0;
		} else {
			chatColor.selectedIndex = chatColor.selectedIndex + 1;
		}
	}



	rotateColor();

	var originalSendMsg = window.sendMsg;
	window.sendMsg = function() {
		originalSendMsg();
		rotateColor();
	}

};
var script = document.createElement("script");
script.textContent = "(" + hijack.toString() + ")()";
document.body.appendChild(script);