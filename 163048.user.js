// ==UserScript==
// @name OGame: serverData
// @namespace http://userscripts.org/users/36331
// @description OGame: stores serverData on the client
// @version 5.3
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?page=overview*
// ==/UserScript==

var strFunc = (function(){

	var ogTime = parseInt(document.querySelector("meta[name=ogame-timestamp]").getAttribute("content"));
	var xmlTime = parseInt(localStorage.getItem("serverData.time") || "0");
	if (ogTime > xmlTime + 86400) {
		$.get(
			"/api/serverData.xml",
			function (xml) {
				var data = {};
				var sd = xml.childNodes[0];
				xmlTime = sd.getAttribute("timestamp");
				localStorage.setItem("serverData.time", xmlTime);
				var elements = sd.childNodes;
				for (var i=0; i<elements.length; i++) {
					var tag = elements[i].tagName;
					data[tag] = elements[i].textContent;
				}
				localStorage.setItem("serverData", JSON.stringify(data));
			},
			"xml"
		);
	}
}).toString();

if (!document.getElementById("serverData_script")) {
	var script = document.createElement("script");
	script.id = "serverData_script";
	script.setAttribute("type","text/javascript");
	script.text = "(" + strFunc + ")();";
	document.body.appendChild(script);
}

