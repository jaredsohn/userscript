//
// Copyright 2010 Andreas Huber
// Edited by Wesley for the Steam Community website.
// Licensed unter the Creative Commons Attribution 3.0 Germany License
// http://creativecommons.org/licenses/by/3.0/de/deed.en
//
// Lizensiert unter der Creative Commons Namensnennung 3.0 Deutschland Lizenz
// http://creativecommons.org/licenses/by/3.0/de/
//
// @author         Andreas Huber - http://andunix.net/
//
// ==UserScript==
// @name           re-enable_password_manager
// @namespace      net.andunix
// @description    Re-enables the password manager by removing the autocomplete="off" attributes from <form> and <input> tags.
// @include        https://store.steampowered.com/*
// @include	   https://steamcommunity.com/*
// ==/UserScript==

function removeAutocomplete(element) {
	var autocompleteNode = element.getAttributeNode("autocomplete");
	if (autocompleteNode != null) {
		element.removeAttributeNode(autocompleteNode);
		if (DEBUG) log("    autocomplete node removed");
	}
}

function removeAllAutocomplete(elements) {
	for (var i = 0; i < elements.length; i++) {
		removeAutocomplete(elements[i]);
	}
}

// set DEBUG to true if you have Firebug and want to see the log messages
var DEBUG = false;

var log = (unsafeWindow.console) ? unsafeWindow.console.log : GM_log;

if (DEBUG) log("cleaning autocomplete attributes...");

if (DEBUG) log("  cleaning <form> tags...");
removeAllAutocomplete(document.getElementsByTagName('form'));
if (DEBUG) log("  done.");

if (DEBUG) log("  cleaning <input> tags...");
removeAllAutocomplete(document.getElementsByTagName('input'));
if (DEBUG) log("  done.");

if (DEBUG) log("done.");
