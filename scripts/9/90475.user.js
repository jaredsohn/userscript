// ==UserScript==
// @name           Get authkeys
// @namespace      null
// @description    Get authkeys
// @include        http*://*what.cd/
// @include        http*://*what.cd/index.php*
// ==/UserScript==
function letsGo() {
	function addBox(auth) {
		var classBox = document.getElementsByClassName("box")[5];

		// create box

		var divBox = document.createElement("div");

		divBox.className = "box";


		// create title

		var divHead = document.createElement("div");

		divHead.className = "head";

		divHead.innerHTML = "<strong>Authorization keys</strong>";


		// create content

		var divPad = document.createElement("div");

		divPad.className = "pad";
		divPad.innerHTML = auth;

		// put paint on the canvas
		divBox.appendChild(divHead);
		divBox.appendChild(divPad);
		classBox.parentNode.insertBefore(divBox,classBox);
	}
	function getKeys() {
		var target = document.getElementsByTagName("link");
		for (var e = 0; e < target.length; e++) {
			if (target[e].getAttribute("rel") == "alternate") {
				var keys = target[e].href;

				var auth = keys.split("&authkey=")[1];
				var pass = keys.split("&passkey=")[1].split("&authkey")[0];

				var allKeys = "<strong>Authkey:</strong> " + auth + "<br /><strong>Passkey:</strong> " + pass;
				return allKeys;
			}
		}
	}
	addBox(getKeys());
}
letsGo();