// ==UserScript==
// @name          Steam DRM Alert
// @namespace     http://www.asmor.com
// @description	  Warns you when Steam's game description mentions DRM
// @include        http://store.steampowered.com/*
// @include        https://store.steampowered.com/*
// ==/UserScript==


var drmFound = [];

function check(el, regex) {
	var drm, i;
	drm = el.innerHTML.match(regex);
	if (drm) {
		el.innerHTML = el.innerHTML.replace(regex, "<span style='color:#000;background-color:#f00'>$1</span>");
		for (i = 0; i < drm.length; i++) {
			drmFound.push(drm[i]);
		}
	}
}

check(document.body, /(Games For Windows - Live|3rd-party DRM)/g);

function showWarning() {
	var first, container, warning;
	first = document.getElementsByClassName("game_area_purchase_game_wrapper")[0];
	container = document.getElementById("game_area_purchase");
	warning = document.createElement("div");
	warning.className = "game_area_purchase_game_wrapper";
	warning.style.backgroundColor = "#FF0000";
	warning.style.color = "#000000";
	warning.innerHTML = "<b>Warning! This product may be DRM inhibited. Found the following: " + drmFound.join(", ") + "</b>";

	container.insertBefore(warning, first);
}

if (drmFound.length !== 0) {
	showWarning();
}

document.body.match(/(Games For Windows - Live|3rd-party DRM)/g)