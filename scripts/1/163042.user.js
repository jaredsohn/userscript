// ==UserScript==
// @name OGame: Localization
// @namespace http://userscripts.org/users/36331
// @description OGame: stores localization data on the client
// @version 5.4
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?page=overview*
// ==/UserScript==

var strFunc = (function(){

	var ogTime = parseInt(document.querySelector("meta[name=ogame-timestamp]").getAttribute("content"));
	var xmlTime = parseInt(localStorage.getItem("localization.time") || "0");

	var language = document.querySelector("meta[name=ogame-language]").getAttribute("content");
	var xmlLang = localStorage.getItem("localization.language");
	if (language != xmlLang) {
		xmlTime = 0;
	}

	if (ogTime > xmlTime + 86400) {
		$.get(
			"/api/localization.xml?language="+language,
			function (xml) {
				var data = {};
				localStorage.setItem("localization.language", language);
				var loc = xml.childNodes[0];
				xmlTime = loc.getAttribute("timestamp");
				localStorage.setItem("localization.time", xmlTime);
				var parts = loc.childNodes;
				for (var i=0; i<parts.length; i++) {
					var tag = parts[i].tagName;
					data[tag] = {};
					var names = parts[i].childNodes;
					for (var j=0; j<names.length; j++) {
						var id = names[j].getAttribute("id");
						data[tag][id] = names[j].textContent;
					}
				}
				localStorage.setItem("localization.data", JSON.stringify(data));
			},
			"xml"
		);
	}
}).toString();

if (!document.getElementById("localization_script")) {
	var script = document.createElement("script");
	script.id = "localization_script";
	script.setAttribute("type","text/javascript");
	script.text = "(" + strFunc + ")();";
	document.body.appendChild(script);
}

