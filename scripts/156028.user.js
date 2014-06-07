// ==UserScript==
// @name	StackExchange Chat Button Utility
// @namespace	secbu
// @version	0.42
// @description	[WORK-IN-PROGRESS] Allows creating and managing custom buttons to automatically input text into the StackExchange chat.
// @include	*://chat.stackexchange.com/rooms/*
// @copyright	2012 - present || Seth@AskUbuntu, FEichinger@AskUbuntu
// ==/UserScript==

// ========
// Constructors
// ========
function Button(title, msg, send) {
	this.title = title;
	this.msg = msg;
	this.send = send;
};

// ========
// Global vars
// ========
var buttonBlock;
var settingsButton;
var nsPrefix = "secbu-";
var buttonData = [];

// ==========
// Build functions
// ==========
var initialize = function() {
	var buttonBlockAll = document.getElementById("chat-buttons");

	// Add button to adjust button settings
	settingsButton = document.createElement('button');
	settingsButton.setAttribute('class', "button");
	settingsButton.innerHTML = "buttons";
	buttonBlockAll.appendChild(settingsButton);

	// Make nested button block to contain custom buttons
	buttonBlock = document.createElement('div');
	buttonBlock.setAttribute('id', "chat-buttons-extra");
	buttonBlock.style.margin = "0px";
	buttonBlock.style.padding = "0px 0px 0px 5px";
	buttonBlockAll.style.margin = "0px";
	buttonBlockAll.style.padding = "0px";
	buttonBlockAll.appendChild(buttonBlock);

	// Get and load button data
	reloadButtons();

	return;
};

// Renews the buttons and listeners
var reloadButtons = function() {
	retrieveButtons();

	// Clean up button bar
	document.getElementById('chat-buttons-extra').innerHTML = "";

	// Add the buttons
	var i;
	for(i = 0; i < buttonData.length; i++) {
		addButton(buttonData[i]['title']);
	}

	// Add their listeners (HAS to be done last!)
	for(i = 0; i < buttonData.length; i++) {
		addListener(buttonData[i]['title'], buttonData[i]['msg'], buttonData[i]['send']);
	}

	// Renew the settings Button's listener
	settingsButton.onclick = function() {
		toggleSettings();

		return;
	};

	return;
}

// Adds a button to the persistent storage
var createButton = function(title, msg, send) {
	var i = buttonData.length;

	buttonData[i] = new Button(title, msg, send);

	storeButtons();
	reloadButtons();

	return;
};

// Adds a button to the button bar
var addButton = function(title) {
	var newButton = document.createElement('button');
	newButton.setAttribute('class', "button");
	newButton.setAttribute('id', 'button-extra-' + title);
	newButton.innerHTML = title;
	buttonBlock.appendChild(newButton);
	buttonBlock.innerHTML += "&nbsp;";

	return;
};

// Adds a listener for the button
var addListener = function(title, msg, send) {
	// Check send flag, cast to number
	if(send*1 == 0) {
		document.getElementById('button-extra-' + title).onclick = function() {
			addmsg(msg);

			return;
		};
	}
	else {
		document.getElementById('button-extra-' + title).onclick = function() {
			addmsg(msg);
			triggerSend();

			return;
		};
	}

	return;
};

// ============
// Settings functions
// ============
var settings = false;
var toggleSettings = function() {
	settings = !settings;
	if(settings == true) {
		var settingsOverlayBg = document.createElement('div');
		settingsOverlayBg.setAttribute('id', "settings-overlay-background");
		settingsOverlayBg.style.position = "fixed";
		settingsOverlayBg.style.top = "0px";
		settingsOverlayBg.style.right = "0px";
		settingsOverlayBg.style.bottom = "0px";
		settingsOverlayBg.style.left = "0px";
		settingsOverlayBg.style.backgroundColor = "#DD4814";
		settingsOverlayBg.style.zIndex = "+100";
		settingsOverlayBg.style.opacity = 0.1;

		var settingsOverlay = document.createElement('div');
		settingsOverlay.setAttribute('id', "settings-overlay");
		settingsOverlay.style.position = "fixed";
		settingsOverlay.style.padding = "10px";
		settingsOverlay.style.backgroundColor = "#FFF";
		settingsOverlay.style.boxShadow = "0px 0px 15px #333";
		settingsOverlay.style.zIndex = "+101";
		settingsOverlay.style.fontSize = "1.2em";
		settingsOverlay.style.overflow = "auto";

		settingsOverlay.style.width = "40%";
		settingsOverlay.style.height = "70%";

		settingsOverlay.innerHTML = "";
		settingsOverlay.innerHTML += "<p id=\"" + nsPrefix + "settings-hl\" style=\"font-size: 2em; font-weight: bold; color: #DD4814;\">StackExchange Chat Button Utility</p>";

		var ul = document.createElement('ul');
		ul.setAttribute('id', nsPrefix + "settings-list");
		ul.style.listStyleType = "none";
		ul.style.fontSize = "1.2em";
		settingsOverlay.appendChild(ul);

		var i;
		for(i = 0; i < buttonData.length; i++) {
			var t;
			if(buttonData[i]['send']*1) t = "<span style=\"color: #080;\" title=\"sent automatically\">&#009993;</span>";
			else t = "<span style=\"color: #888;\" title=\"not sent automatically\">&#009993;</span>";

			var li = document.createElement('li');
			li.setAttribute('id', "buttondata-" + i);

			li.innerHTML = "<p style=\"font-weight: bold; margin: 0;\">" + buttonData[i]['title'] + "&nbsp;" + t + "</p>";

			li.innerHTML += "<p style=\"font-family: monospace; background-color: #F4F4F4; padding: 5px; margin: 0;\">" + buttonData[i]['msg'] + "</p>";

			li.style.padding = "5px";
			li.style.borderWidth = "1px 0 0 0";
			li.style.borderStyle = "dotted";
			li.style.borderColor = "#AEA79F";
			ul.appendChild(li);
		}

		settingsOverlay.style.top = "15%";
		settingsOverlay.style.left = "30%";

		document.getElementById('chat-body').appendChild(settingsOverlayBg);
		document.getElementById('chat-body').appendChild(settingsOverlay);


		var buttonNew = document.createElement('button');
		buttonNew.setAttribute('id', "button-create");
		buttonNew.setAttribute('class', "button");
		buttonNew.innerHTML = "Create New";

		buttonNew.onclick = function() {
			var len = buttonData.length;
			buttonData[len] = new Button("", "", 0);
			var li = document.createElement('li');
			li.setAttribute('id', "buttondata-" + len);
			ul.appendChild(li);

			toggleEdit(len);

			return;
		};

		ul.appendChild(buttonNew);

		settingsOverlayBg.onclick = toggleSettings;
		for(i = 0; i < buttonData.length; i++) {
			createEditListener(i);
		}
	}
	else {
		var e;
		e = document.getElementById('settings-overlay');
		e.parentNode.removeChild(e);
		e = document.getElementById('settings-overlay-background');
		e.parentNode.removeChild(e);
	}

	return;
};

var createEditListener = function(id) {
	document.getElementById('buttondata-' + id).ondblclick = function() {
		toggleEdit(id);

		return;
	};

	return;
};

var toggleEdit = function(id) {
	var e = document.getElementById('buttondata-' + id);
	var bu = e.innerHTML;

	e.innerHTML = "";
	var check = document.createElement('input');
	check.setAttribute('id', "button-edit-send-" + id);
	check.setAttribute('type', "checkbox");

	if(buttonData[id]['send']*1)
		check.checked = true;
	else {
		check.checked = false;
	}

	e.appendChild(check);

	e.innerHTML += "<input id=\"button-edit-title-" + id + "\" type=\"text\" value=\"" + buttonData[id]['title'] + "\" />";

	e.innerHTML += "<br />";

	e.innerHTML += "<input id=\"button-edit-msg-" + id + "\" type=\"text\" value = \"" + buttonData[id]['msg'] + "\" />";

	e.innerHTML += "<br />";

	e.innerHTML += "<button class=\"button\" id=\"button-save-" + id + "\">&#10003;</button>&nbsp;";
	e.innerHTML += "<button class=\"button\" id=\"button-cancel-" + id + "\">&#10007;</button>";

	document.getElementById('button-save-' + id).onclick = function() {
		var send = document.getElementById('button-edit-send-' + id).checked;

		if(send == true) send = 1;
		else send = 0;

		buttonData[id] = new Button(document.getElementById('button-edit-title-' + id).value, document.getElementById('button-edit-msg-' + id).value, send);
		storeButtons();

		toggleSettings();
		reloadButtons();
		toggleSettings();

		return;
	};

	document.getElementById('button-cancel-' + id).onclick = function() {
		if(buttonData[id]['msg'] == "" || document.getElementById('button-edit-msg-' + id).value == "") buttonData.splice(id, 1);
		storeButtons();

		toggleSettings();
		reloadButtons();
		toggleSettings();

		return;
	};

	return;
};

// ============
// Storing functions
// ============
var storeButtons = function() {
	clearStorage();

	for(var i = 0; i < buttonData.length; i++) {
		localStorage.setItem(nsPrefix + 'title-' + i, buttonData[i]['title']);
		localStorage.setItem(nsPrefix + 'msg-' + i, buttonData[i]['msg']);
		localStorage.setItem(nsPrefix + 'send-' + i, buttonData[i]['send']);
	}

	return;
};

// Retrieve
var retrieveButtons = function() {
	var k = 0;
	for(var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if(key.indexOf(nsPrefix) == 0) {
			var r = key.substring(nsPrefix.length);
			var data = [];
			data = r.split('-');
			if(typeof buttonData[data[1]*1] == 'undefined')
				buttonData[data[1]*1] = new Button("", "", 0);
			buttonData[data[1]*1][data[0]] = localStorage[key];
		}
	}

	return;
};

// Wipe to prevent unwanted dupes
var clearStorage = function() {
	for(var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if(key.indexOf(nsPrefix) == 0) {
			localStorage.removeItem(key);
		}
	}

	return;
};

// ============
// Message functions
// ============
var addmsg = function(msg) {
	var input = document.getElementById('input');
	input.value += msg;

	return;
};

// trigger send
var triggerSend = function() {
    document.getElementById('sayit-button').click();

    return;
};

// ==
// Run
// ==
initialize();