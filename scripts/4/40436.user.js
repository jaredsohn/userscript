// ==UserScript==
// @name           php.net lang switcher
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    switches from DE to ENG and back
// @include        http://*.php.net/*
// ==/UserScript==


//
	const style = "font-size: 85%; position: fixed; top: 5px; right: 5px; color: white; background: navy; padding: 3px; cursor: pointer";
//
GM_addStyle(".switchlink, .switchlink:hover {" + style + "}");

var link = document.body.appendChild(document.createElement("a")), 
	lang = location.href.split("manual/")[1].split("/")[0].toLowerCase();
with (link) {
	innerHTML = "switch lang";
	className = "switchlink";
	addEventListener("click", function() {
		var lang = location.href.split("manual/")[1].split("/")[0];
		if (lang == "de") {
			location.href = location.href.replace("manual/de", "manual/en");
		} else {
			location.href = location.href.replace("manual/en", "manual/de");
		}
	}, false);
}				
