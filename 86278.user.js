// ==UserScript==
// @name           Facebook Clean It Up
// @namespace      Facebook
// @include        http://www.facebook.com/*
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.00
// @history        1.00 Initial release
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2010, .hacker
// ==/UserScript==

// check for updates
try {
	ScriptUpdater.check(76832, "1.00");
} catch(e) { };

function Storage(type, namespace) {
	var object = this;

	if(typeof(type) != "string")
		type = "session";

	switch(type) {
		case "local": {
			object.storage = localStorage;
		} break;

		case "session": {
			object.storage = sessionStorage;
		} break;

		default: {
			object.storage = sessionStorage;
		} break;
	}

	if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
		namespace = "ScriptStorage";

	object.namespace = [namespace, "."].join("");

	object.setItem = function(key, value) {
		try {
			object.storage.setItem(escape([object.namespace, key].join("")), uneval(value));
		}
		catch(e) {
		}
	}

	object.getItem = function(key, defaultValue) {
		try {
			var value = object.storage.getItem(escape([object.namespace, key].join("")));
			if(value)
				return eval(value);
			else
				return defaultValue;
		}
		catch(e) {
			return defaultValue;
		}
	}

	object.removeItem = function(key) {
		try {
			object.storage.removeItem(escape([object.namespace, key].join("")));
		}
		catch(e) {
		}
	}

	object.keys = function() {
		var array = [];
		var i = 0;
		do {
			try {
				var key = unescape(object.storage.key(i++));
				if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
					array.push(key.slice(object.namespace.length));
			}
			catch(e) {
				break;
			}
		} while(true);
		return array;
	}
}

function sortById(a, b) {
	return a[0] - b[0];
}

function addApp(id, note) {
	for(var i = 0; i < applications.length; i++)
		if(applications[i][0] == id)
			return;
	applications.push([parseInt(id), note]);
	applications.sort(sortById);
	storage.setItem("applications", applications);
	text();
}

function removeApp(id) {
	for(var i = 0; i < applications.length; i++)
		if(applications[i][0] == id)
			applications.splice(i, 1);
	applications.sort(sortById);
	storage.setItem("applications", applications);
	text();
}

function addEnt(id, note) {
	for(var i = 0; i < entries.length; i++)
		if(entries[i][0] == id)
			return;
	entries.push([parseInt(id), note]);
	entries.sort(sortById);
	storage.setItem("entries", entries);
	text();
}

function removeEnt(id) {
	for(var i = 0; i < entries.length; i++)
		if(entries[i][0] == id)
			entries.splice(i, 1);
	entries.sort(sortById);
	storage.setItem("entries", entries);
	text();
}

function text() {
	div.innerHTML = "";

	var b = document.createElement("b");
	b.innerHTML = "Applications:"
	div.appendChild(b);
	var ul = document.createElement("ul");
	div.appendChild(ul);
	if(applications.length == 0) {
		var i = document.createElement("i");
		i.innerHTML = "None.<br/>"
		div.appendChild(i);
	}
	for(var i = 0; i < applications.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = [applications[i][0], ": ", applications[i][1], " <b>[X]</b>"].join("");
		li.id = applications[i][0];
		li.style.cursor = "pointer";
		li.setAttribute("onmouseout", "this.style.color='';");
		li.setAttribute("onmouseover", "this.style.color='#999999';");
		li.addEventListener("click", function() {
			removeApp(this.id);
		}, true);
		ul.appendChild(li);
	}

	var b = document.createElement("b");
	b.innerHTML = "<br/>Entries:"
	div.appendChild(b);
	var ul = document.createElement("ul");
	div.appendChild(ul);
	if(entries.length == 0) {
		var i = document.createElement("i");
		i.innerHTML = "None.<br/>"
		div.appendChild(i);
	}
	for(var i = 0; i < entries.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = [entries[i][0], ": ", entries[i][1], " <b>[X]</b>"].join("");
		li.id = entries[i][0];
		li.style.cursor = "pointer";
		li.setAttribute("onmouseout", "this.style.color='';");
		li.setAttribute("onmouseover", "this.style.color='#999999';");
		li.addEventListener("click", function() {
			removeEnt(this.id);
		}, true);
		ul.appendChild(li);
	}

	var b = document.createElement("b");
	b.innerHTML = "<br/>Show buttons."
	b.style.cursor = "pointer";
	b.setAttribute("onmouseout", "this.style.color='';");
	b.setAttribute("onmouseover", "this.style.color='#999999';");
	b.addEventListener("click", function() {
			try {
				var snap = document.evaluate("//div[contains(@id, 'div_story')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if(snap != null) {
					for(var i = 0; i < snap.snapshotLength; i++) {
						var div = document.createElement("div");
						var fbid = -1;
						try {
							fbid = parseInt(snap.snapshotItem(i).getAttribute("data-ft").match(/"fbid":"(\d+)"/i)[1]);
						}
						catch(e) {
							fbid = -1;
						}
						div.id = fbid;

						var sty = -1;
						try {
							sty = parseInt(snap.snapshotItem(i).getAttribute("data-ft").match(/"sty":"(\d+)"/i)[1]);
						}
						catch(e) {
							sty = -1;
						}

						if(sty > 0) {
							var a = document.createElement("a");
							a.id = sty;
							a.style.color = "#ff0000";
							a.style.fontWeight = "bold";
							a.innerHTML = " [Add #" + sty + " to the entry list] ";
							a.addEventListener("click", function() {
								var str = prompt("Please enter a description for the entry type");
								addEnt(this.id, str);
							}, true);
							div.appendChild(a);
						}

						var app_id = -1;
						try {
							app_id = parseInt(snap.snapshotItem(i).getAttribute("data-ft").match(/"app_id":"(\d+)"/i)[1]);
						}
						catch(e) {
							app_id = -1;
						}

						if(app_id > 0) {
							var a = document.createElement("a");
							a.id = app_id;
							a.style.color = "#ff0000";
							a.style.fontWeight = "bold";
							a.innerHTML = " [Add #" + app_id + " to the application list] ";
							a.addEventListener("click", function() {
								var str = prompt("Please enter a description for the application type");
								addApp(this.id, str);
							}, true);
							div.appendChild(a);
						}

						if(document.getElementById(fbid) == null)
							snap.snapshotItem(i).appendChild(div);
					}
				}
				else {
					alert("Can't find any messages.");
				}
			}
			catch(e) {
				alert(e);
			}
	}, true);
	div.appendChild(b);

	var b = document.createElement("b");
	b.innerHTML = "<br/>Clear messages."
	b.style.cursor = "pointer";
	b.setAttribute("onmouseout", "this.style.color='';");
	b.setAttribute("onmouseover", "this.style.color='#999999';");
	b.addEventListener("click", function() {
		try {
			delay = speed;
			var snap = document.evaluate("//div/a/span[@class='uiButtonText']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(snap != null) {
				b.innerHTML = "<br/>Clear messages (found " + snap.snapshotLength + " messages).";
				for(var i = 0; i < snap.snapshotLength; i++) {
					var brisanje = false;
					if(snap.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.getAttribute("data-ft") != null) {
						for(var x in applications) {
							if(snap.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.getAttribute("data-ft").match(new RegExp("\"app_id\":\"" + applications[x][0] + "\"", "i"))) {
								brisanje = true;
							}
						}
						for(var x in entries) {
							if(snap.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.getAttribute("data-ft").match(new RegExp("\"sty\":\"" + entries[x][0] + "\"", "i"))) {
								brisanje = true;
							}
						}
					}
					if(snap.snapshotItem(i).parentNode.parentNode.parentNode.getAttribute("data-ft") != null) {
						for(var x in applications) {
							if(snap.snapshotItem(i).parentNode.parentNode.parentNode.getAttribute("data-ft").match(new RegExp("\"app_id\":\"" + applications[x][0] + "\"", "i"))) {
								brisanje = true;
							}
						}
						for(var x in entries) {
							if(snap.snapshotItem(i).parentNode.parentNode.parentNode.getAttribute("data-ft").match(new RegExp("\"sty\":\"" + entries[x][0] + "\"", "i"))) {
								brisanje = true;
							}
						}
					}
					if(brisanje == true) {
						try {
							parseItem(snap, i);
						}
						catch(e) {
							alert(e);
						}
					}
				}
			}
			else {
				alert("Ne najdem objav! :(");
			}
		}
		catch(e) {
			alert(e);
		}
	}, true);
	div.appendChild(b);
}

function simulateClick(element) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var canceled = !element.dispatchEvent(evt);
	if(canceled) {
		// A handler called preventDefault
		//alert("canceled");
	} else {
		// None of the handlers called preventDefault
		//alert("not canceled");
	}
}

function parseItem(snap, i) {
	setTimeout(function() {
		simulateClick(snap.snapshotItem(i));
		setTimeout(function() {
			var snap2 = document.evaluate("//div/div/label/input[@name='delete_story']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(snap2 != null) {
				for(var j = 0; j < snap2.snapshotLength; j++) {
					simulateClick(snap2.snapshotItem(j));
				}
			}
		
		}, speed);
	}, delay);
	delay += speed * 2;
}

var div = document.createElement("div");
div.setAttribute("style", "position: fixed; bottom: -1px; left: -1px; background-color: #FFFFFF; border: #999999 solid 1px; padding: 5px;");
document.body.appendChild(div);

var storage = new Storage("local", "Facebook.Delete");
 
var applications = storage.getItem("applications", []);
applications = typeof(applications) == "object" ? applications : [];

var entries = storage.getItem("entries", []);
entries = typeof(entries) == "object" ? entries : [];

var speed = 1000;
var delay = speed;

text();