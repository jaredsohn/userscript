// ==UserScript==
// @name        Schulfilter umgehen
// @namespace   .
// @description Umgeht den Schulfilter in Schulnetzwerken für Websites.
// @include     *
// @exclude     https://*
// @version     1.3
// @require     https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @changes     implemented GM_config for more Options and images on not blocked pages.
// ==/UserScript==

window.addEventListener("load", loadThis, true);

GM_registerMenuCommand("Schulfilter konfigurieren", openConfig, "k");

function loadThis() {
	var url = self.location.href;
	var safeurl = safeURL(self.location.href);
	if (document.getElementsByTagName("title")[0].innerHTML == "Die angefragte Seite passt nicht zu deinem Thema" && (!GM_config.get("confirm") || unsafeWindow.confirm("Schülerfilter erkannt. Weiterleiten zu " + safeurl + " ?"))) {
		self.location.href = safeurl;
	}
	if (GM_config.get("img")) {
		checkImages();
	}
}

function safeURL(url) {
	safeurl = url.split("://");
	safeurl[0] = "https";
	safeurl = safeurl.join("://");
	return safeurl;
}

function checkImages() {
	var imgs = document.evaluate('//img[@src]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < imgs.snapshotLength; i++) {
		checkImage(imgs.snapshotItem(i));
	}
}

function checkImage(img) {
	if (typeof img == "STRING") {
		//unsafeWindow.alert("str");
	} else if (typeof img == "object") {
		if (img.naturalHeight == undefined ||img.naturalHeight == "undefined" || img.naturalHeight == 0 || img.naturalWidth == undefined || img.naturalWidth == "undefined" || img.naturalWidth == 0) {
			img.src = safeURL(img.src);
		}
	} else {
		//unsafeWindow.alert(typeof img);
	}
}

function openConfig() {
	GM_config.open();
}

function saveConfig() {
	GM_setValue("confirm", GM_config.get("confirm"));
	GM_setValue("img", GM_config.get("img"));
	checkImages();
}

GM_config.init(
{
	"id": "GM_config", // The id used for this instance of GM_config
	"title": "Einstellungen", // Panel Title
	"fields": // Fields object
	{
		"confirm": // This is the id of the field
		{
			"label": "Jedesmal bestätigen, um den Schulfilter zu umgehen.", // Appears next to field
			"type": "checkbox", // Makes this setting a text field
			"default": GM_getValue("confirm", true) // Default value if user doesn't change it
		},
		"img":
		{
			"label": "Bilder überprüfen (beta)",
			"type": "checkbox",
			"default": GM_getValue("img", false)
		}
  },
  "events": // Callback functions object
  {
    //"init": function() { alert("onInit()"); },
    //"open": function() { alert("onOpen()"); },
    "save": saveConfig,
    "close": saveConfig,
    "reset": saveConfig
  }
});
