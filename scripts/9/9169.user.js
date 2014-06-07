// ==UserScript==
// @name           MusicBrainz AR disambiguation
// @description    Adds artist+release titles after release+track titles to help distinguish between the two when creating a relationship
// @version        2007-06-14
// @author         Jugdish
// @namespace      E8926D74-4EFC-45d5-AAC6-162085EEE81C
//
// @include        http://*.musicbrainz.org/edit/relationship/*
// @include        http://musicbrainz.org/edit/relationship/*
// ==/UserScript==

// Ajax utility functions
var HTTP = {
	// This is a list of XMLHttpRequest-creation factory functions to try
	_factories: [
		function() { return new XMLHttpRequest(); },
		function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
		function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
	],

	// When we find a factory that works, store it here.
	_factory: null,

	// Create and return a new XMLHttpRequest object.
	//
	// The first time we're called, try the list of factory functions until
	// we find one that returns a non-null value and does not throw an
	// exception. Once we find a working factory, remember it for later use.
	//
	newRequest: function() {
		if (HTTP._factory != null) return HTTP._factory();
	
		for (var i = 0; i < HTTP._factories.length; i++) {
			try {
				var factory = HTTP._factories[i];
				var request = factory();
				if (request != null) {
					HTTP._factory = factory;
					return request;
				}
			}
			catch(e) {
				continue;
			}
		}
		// If we get here, none of the factory candidates succeeded,
		// so throw an exception now and for all future calls.
		HTTP._factory = function() { throw new Error("XMLHttpRequest not supported"); }
		HTTP._factory(); // Throw an error
	},
	
	/**
	 * Use XMLHttpRequest to fetch the contents of the specified URL using
	 * an HTTP GET request. When the response arrives, pass it (as plain
	 * text) to the specified callback function.
	 *
	 * This function does not block and has no return value.
	 */
	getText: function(url, callback, callbackArgs) {
		var request = HTTP.newRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200)
					callback(request.responseText, callbackArgs);
				else
					alert("HTTP Response "+request.status+"\n"+request.statusText);
			}
		}
		request.open("GET", url);
		request.send(null);
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement)
		parent.appendChild(newElement);
	else
		parent.insertBefore(newElement, targetElement.nextSibling);
}

function cb_parseTrackPage(data, commentNode) {
	var comment = [];
	var artist = data.match(/^\s*<span class="linkartist">.*?(<a href=.*? title="Artist.*?">.*?<\/a>)<\/span>/m);
	if (artist && artist.length == 2)
		comment.push("Artist: "+artist[1]);
	else
		comment.push("Artist: ERROR!");
	var release = data.match(/^\s*<span class="linkrelease">.*?(<a href=.*? title="Release">.*?<\/a>)<\/span>/m);
	if (release && release.length == 2)
		comment.push("Release: "+release[1]);
	else
		comment.push("Release: ERROR!");
	commentNode.innerHTML = " ("+comment.join(", ")+")";
}

function cb_parseReleasePage(data, commentNode) {
	var comment = [];
	var artist = data.match(/<table class="artisttitle">.*?<td class="title">.*?(<a href=.*? title="Go to the artist page">.*?<\/a>)/);
	if (artist && artist.length == 2)
		comment.push("Artist: "+artist[1].replace(/^<a /,"<a class=\"linkentity-strong\" "));
	else
		comment.push("Artist: ERROR!");
	data = data.replace(/[\r\n]/g,"");
	var date = data.match(/<table class="eventslist">.*?<\/tr>.*?<td>(.*?)<\/td>/);
	if (date)
		comment.push("Released: "+date[1]);
	commentNode.innerHTML = " ("+comment.join(", ")+")";
}

var n, results, text;
for (i = 0; i < document.links.length; i++) {
	var n = document.links[i];
	if (n.href) {
		var results = n.href.match(/\/show\/(track|release)\/.*id=[0-9]+$/);
		if (results) {
			if (results[1] == "track") {
				var commentNode = document.createElement("span");
				commentNode.style["fontSize"] = "11px";
				commentNode.innerHTML = " (<img style=\"vertical-align:middle\" src=\"/images/loading-small.gif\"/>Loading...)";
				insertAfter(commentNode,n);
				HTTP.getText(n.href,cb_parseTrackPage,commentNode);
			} else if (results[1] == "release") {
				var commentNode = document.createElement("span");
				commentNode.style["fontSize"] = "11px";
				commentNode.innerHTML = " (<img style=\"vertical-align:middle\" src=\"/images/loading-small.gif\"/>Loading...)";
				insertAfter(commentNode,n);
				HTTP.getText(n.href,cb_parseReleasePage,commentNode);
			}
		}
	}
}
