// ==UserScript==
// @name           Pandora Accessibility Fixes
// @namespace      http://www.jantrid.net/axSGrease/
// @description    Improves the accessibility of Pandora.
// @author James Teh <jamie@jantrid.net>
// @copyright 2013 James Teh
// @license GNU General Public License version 2.0
// @version 0.20130113.01
// @include http://www.pandora.com/*
// @homepageURL http://userscripts.org/scripts/show/156173
// @updateURL https://userscripts.org/scripts/source/156173.user.js
// ==/UserScript==

BUTTONS_LABELS = {
	"thumbUpButton": "Thumb up",
	"thumbDownButton": "Thumb down",
	"pauseButton": "Pause",
	"playButton": "Play",
	"skipButton": "Skip",
}
function fixButton(target) {
	var classes = target.classList;
	if (!classes)
		return;
	for (var cls in BUTTONS_LABELS) {
		if (!classes.contains(cls))
			continue;
		var button = target.firstChild;
		button.setAttribute("role", "button");
		button.setAttribute("aria-label", BUTTONS_LABELS[cls]);
		if (cls == "thumbUpButton")
			button.setAttribute("aria-pressed",
				classes.contains("indicator") ? "true" : "false");
		break;
	}
}

function fixStationDetailsItem(target) {
	var node;
	if (node = target.querySelector(".deletable")) {
		node.setAttribute("role", "button");
		node.setAttribute("aria-label", "Delete");
	}
	if (node = target.querySelector(".sample"))
		node.firstChild.setAttribute("aria-label", "Sample");
}

function onClassModified(target) {
	var classes = target.classList;
	if (!classes)
		return;
	fixButton(target);
	if (classes.contains("stationListItem"))
		target.setAttribute("aria-checked",
			classes.contains("selected") ? "true" : "false");
}

function onNodeAdded(target) {
	if (target.nodeType != Node.ELEMENT_NODE)
		return;
	var nodes;
	var node;
	if (target.classList.contains("backstage")) {
		document.getElementById("addArtistSeed").setAttribute("aria-label", "Add artist");
		nodes = target.querySelectorAll("div.list");
		for (var i = 0; i < nodes.length; ++i)
			fixStationDetailsItem(nodes[i]);
		return;
	}
	if (target.nodeName == "LI" && target.querySelector("div.list")) {
		fixStationDetailsItem(target);
		return;
	}
	if (node = document.getElementById("stationList"))
		node.setAttribute("role", "radiogroup");
	nodes = target.getElementsByClassName("stationListItem");
	for (var i = 0; i < nodes.length; ++i) {
		node = nodes[i];
		node.setAttribute("role", "radio");
		if (node.classList.contains("selected"))
			node.setAttribute("aria-checked", "true");
	}
	nodes = target.getElementsByClassName("stationName");
	for (var i = 0; i < nodes.length; ++i)
		nodes[i].setAttribute("role", "presentation");
	nodes = target.getElementsByClassName("option");
	for (var i = 0; i < nodes.length; ++i)
		nodes[i].setAttribute("role", "button");
}

function onStyleModified(target) {
	var style = target.style;
	if ((target.id == "station_menu_dd" || target.id == "cd_menu_dd") && style.visibility == "visible") {
		var nodes = target.getElementsByTagName("a");
		for (var i = 0; i < nodes.length; ++i) {
			var node = nodes[i];
			if (node.style.display == "none")
				continue;
			node.focus();
			break;
		}
	}
}

function init() {
	var nodes;
	nodes = document.getElementsByClassName("buttons")[0].childNodes;
	for (var i = 0; i < nodes.length; ++i)
		fixButton(nodes[i]);
	var node;
	if (node = document.getElementsByClassName("buyButton")[0]) {
		node.setAttribute("role", "button");
		node.setAttribute("aria-label", "Buy");
	}
	if (node = document.getElementsByClassName("cd_activator")[0]) {
		node = node.firstChild;
		node.setAttribute("role", "button");
		node.setAttribute("aria-haspopup", "true");
		node.setAttribute("aria-label", "Track options");
	}
}

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		try {
			if (mutation.type === "childList") {
				for (var i = 0; i < mutation.addedNodes.length; ++i)
					onNodeAdded(mutation.addedNodes[i]);
			} else if (mutation.type === "attributes") {
				if (mutation.attributeName == "class")
					onClassModified(mutation.target);
				else if (mutation.attributeName == "style")
					onStyleModified(mutation.target);
			}
		} catch (e) {
			// Catch exceptions for individual mutations so other mutations are still handled.
			GM_log("Exception while handling mutation: " + e);
		}
	});
});
observer.observe(document, {childList: true, attributes: true,
	subtree: true, attributeFilter: ["class", "style"]});
init();
