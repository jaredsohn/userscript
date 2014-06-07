// ==UserScript==
// @name           Stack Overflow: User details in comments
// @namespace      http://gecko.535design.com/grease/
// @description    Adds user icons and reputations to comments.
// @include        http://meta.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// ==/UserScript==

var rxId = /\/users\/(\d+)/;
var rxImageSize = /\b50\b/g;
var xpComments = "//a[contains(concat(' ', @class, ' '), ' comment-user ') and not(contains(concat(' ', @class, ' '), ' comment-with-details '))]";

// simulate the relevant part of FF 3.5' "JSON" object for earlier versions

if (!JSON) {
	var rxJSONInvalid = /[^,:{}\[\]0-9.\-+Eaeflnrstu \n\r\t]/;
	var rxJSONString = /"(?:\\(?:["\\\/bfnrt]|u[0-9A-Fa-f]{4})|[^\000-\037\\"])*"/g;

	var JSON = {
		parse: function(str) {
			if (rxJSONInvalid.test(str.replace(rxJSONString, ""))) {
				throw "not a valid JSON string";
			}

			return eval("(" + str + ")");
		},
	};
}

function xpath(expr, context) {
	return document.evaluate(expr, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function onDOMNodeInserted(event) {
	target = event.target;

	// using literal "1" because Node.ELEMENT_NODE is undefined here (not sure why)
	if (target.nodeType == 1) {
		var comments = xpath(xpComments, document);

		for (var i = 0; i < comments.snapshotLength; i++) {
			queue.append(comments.snapshotItem(i));
		}
	}
}

function Queue() {
	this.id = null;
	this.node = null;
	this.queue = [];
	this.responses = {};
	this.running = false;
	this.timer = null;
	this.url = document.location.protocol + "//" + document.location.host + "/users/flair/{{{id}}}.json";
	this.xhr = null;
}

Queue.prototype = {
	append: function(node) {
		if (node.className.indexOf("comment-with-details") != -1) {
			return;
		}

		node.className += " comment-with-details";

		this.queue.push(node);

		if (!this.running) {
			this.running = true;
			this.next();
		}
	},

	handle: function() {
		if (this.xhr.readyState != 4) {
			return;
		}

		if (this.xhr.status == 200) {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}

			var raw = JSON.parse(this.xhr.responseText);
			var response = {};

			response.img = "<img style=\"vertical-align:-3px\"" + raw.gravatarHtml.replace(rxImageSize, "16").substring(4);
			response.rep = raw.reputation;

			this.responses[this.id] = response;
			this.inject();
		}

		this.xhr = null;
		this.next();
	},

	inject: function() {
		var node = this.node;
		var comment = node.parentNode;
		var response = this.responses[this.id];

		node.innerHTML = response.img + " " + node.innerHTML + " <b style=\"color:black\">" + response.rep + "</b>";
	},

	// use of setTimeout allows other threads to run and gives the GC a chance to collect old XHRs
	next: function() {
		this.request();
		return;
		var self = this;
		window.setTimeout(function() { self.request(); }, 0);
	},

	request: function() {
		if (!this.queue.length) {
			this.running = false;
			return;
		}

		this.node = this.queue.shift();
		this.id = rxId.exec(this.node.href)[1];

		if (this.responses[this.id]) {
			this.inject();
			this.next();
		} else {
			var self = this;

			this.xhr = new XMLHttpRequest();
			this.xhr.open("GET", this.url.replace("{{{id}}}", this.id), true);
			this.xhr.onreadystatechange = function() { self.handle(); };
			this.xhr.overrideMimeType("text/plain");
			this.xhr.send(null);

			this.timer = window.setTimeout(function() { self.timeout(); }, 5000);
		}
	},

	timeout: function() {
		if (this.xhr) {
			this.xhr.abort();
			this.xhr = null;
		}

		this.timer = null;
		this.request();
	},	
};

var queue = new Queue();
var comments = xpath(xpComments, document);

for (var i = 0; i < comments.snapshotLength; i++) {
	queue.append(comments.snapshotItem(i));
}

document.body.addEventListener("DOMNodeInserted", onDOMNodeInserted, false);
