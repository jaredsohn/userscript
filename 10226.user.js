// ==UserScript==
// @name           Google Bookmark Enhancements
// @namespace      http://userscripts.org/users/29790;scripts
// @description    Adds additional links next to labels to allow you to easilly add or remove labels from a query. This is something I wrote because I got tired of typing additional labels into the search field when I wanted to see things tagged with more than one label. If anyone from Google sees this, could you please add features like this to Google Bookmarks? The reason I wrote it is because I was unable to find where to submit feature requests.
// @version        1.0.200706261457
// @include        http://*.google.*/bookmarks/*
// ==/UserScript==
//
// Copyright 2007, Daniel Cormier
// daniel.cormier@gmail.com
//
// This is my first attempt at writing anything in JavaScript, so I appologise
// if I'm not following proper conventions.
//

function html_unescape(input) {
	var div = document.createElement("div");

	if (typeof(div.innerHTML != "undefined") && typeof(div.firstChild != "undefined") )
		input = input.replace(/&[a-z0-9#]+;/gi, function(s){ return div.innerHTML = s, div.firstChild.nodeValue; } );
	
	return input;
}

function textBoxContainsLabel(textBox, label, useValueServerSent) {
	var ret = false;
	var content = "";
	
	if (useValueServerSent)
		//content = textBox.getAttribute('value');
		// This is the content of the "value" property of the textbox in the HTML.
		content = textBox.defaultValue;
	else
		// This is the displayed content of the textbox.
		content = textBox.value;

	//GM_log('Checking if "' + content + '" contains "label:' + label + '"');
	// Case insensitive check.
	if (content.toLowerCase().indexOf("label:" + label.toLowerCase()) > -1)
		ret = true;

	return ret;
}

function containsLabel(label, useValueServerSent) {
	var ret = false;

	for (var i = 0; i < textBoxes.length; i++) {
		if (textBoxContainsLabel(textBoxes[i], label, useValueServerSent)) {
			ret = true;
			break;
		}
	}
	
	return ret;
}

function addLabel() {
	var label = this.getAttribute('name');
	//alert('Add ' + label);

	for (var i = 0; i < textBoxes.length; i++) {
		if (!textBoxContainsLabel(textBoxes[i], label, false)) {
			textBoxes[i].value += ' label:' + label;
			
			//GM_log('After adding ' + label + ': ' + textBoxes[i].value);
		}
	}
	
	// This next bit changes ALL the instances.
	var nodes = document.getElementsByName(label);
	
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].parentNode.replaceChild(createRemoveLabelNode(label), nodes[i]);
	}
}

function removeLabel(element) {
	var label = this.getAttribute('name');
	//alert('Remove ' + label);

	for (var i = 0; i < textBoxes.length; i++) {
		if (textBoxContainsLabel(textBoxes[i], label, false)) {
			var value = 'label:' + label.toLowerCase()
			var origLength =  textBoxes[i].value.length;
			var startIndex = textBoxes[i].value.toLowerCase().indexOf(value);
			var newQuery = textBoxes[i].value.substring(0, startIndex);
			newQuery += textBoxes[i].value.substring(startIndex + value.length, origLength).replace('  ', ' ');
			textBoxes[i].value = newQuery;

			//GM_log('After removing ' + label + ': ' + textBoxes[i].value);
		}
	}
	
	// This next bit changes ALL the instances.
	var nodes = document.getElementsByName(label);
	
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].parentNode.replaceChild(createAddLabelNode(label), nodes[i]);
	}
}

function createLabelNode(label) {
	var labelNode = document.createElement('a');
	labelNode.setAttribute('href', '#');
	//labelNode.setAttribute('storage', label);
	labelNode.name = label;
	
	return labelNode;
}

function createAddLabelNode(label) {
	var addLabelNode = createLabelNode(label);
	addLabelNode.addEventListener('click', addLabel, false);
	addLabelNode.innerHTML = '+';
	
	return addLabelNode;
}

function createRemoveLabelNode(label) {
	var removeLabelNode = createLabelNode(label);
	removeLabelNode.addEventListener('click', removeLabel, false);
	removeLabelNode.innerHTML = '-';
	
	return removeLabelNode;
}

function createSpaceNode() {
	var spaceNode = document.createElement('span');
	spaceNode.innerHTML = "&nbsp;";
	
	return spaceNode;
}

var textBoxes = [];
var temp = document.getElementsByName('q');

for (var i = 0; i < temp.length; i++) {
	if (temp[i].nodeName.toLowerCase() == 'input' &&
		temp[i].getAttribute('type').toLowerCase() == 'text' &&
		temp[i].getAttribute('name').toLowerCase() == 'q') {

		//GM_log(temp[i].getAttribute('value'));
		textBoxes[textBoxes.length] = temp[i];
	}
}

temp = null;

var count = 0;
var bkmk_info = null;

while ((bkmk_info = document.getElementById('bkmk_info_' + count++)) != null) {
	//GM_log(bkmk_info.id);
	
	var labels = bkmk_info.getElementsByTagName('a');
	//GM_log("Found " + labels.length + " labels.");
	
	// In here we have to use i*2 to access the next element
	// because we're adding new elemenets as we go.
	for (var i = 0; i*2 < labels.length; i++) {
		label = html_unescape(labels[i*2].innerHTML);
		
		if (label.indexOf(" ") > -1)
			label = '"' + label + '"';
		
		//GM_log((i*2).toString() + ' of ' + labels.length + ': ' + label);
		
		var newNode = null;

		if (containsLabel(label, true))
			newNode = createRemoveLabelNode(label);

		else
			newNode = createAddLabelNode(label);
		
		bkmk_info.insertBefore(newNode, labels[i*2]);
		newNode = null;
		
		bkmk_info.insertBefore(createSpaceNode(), labels[i*2+1]);
		
		if (labels.length > 100) {
			GM_log("There are too many labels (" + labels.length + ")!");
			break;
		}
	}
}