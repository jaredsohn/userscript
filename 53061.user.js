// ==UserScript==
// @name           Google Reader Collapse/Expand Button
// @namespace      gminuses
// @description    Add a collapse/expand button next to "next item" button
// @include        http://www.google.*/reader/view*  
// @include        https://www.google.*/reader/view* 
// ==/UserScript==

var collapseText = "Collapse item";
var expandText = "Expand item";

var modeElement = document.getElementById('chrome-view-links');
var listElement = document.getElementById('entries');
var nextItemButton = document.getElementById('entries-down');

var list = {
	getSelectedItem: function() {
		return document.getElementById('current-entry') || listElement.getElementsByClassName('entry')[0];
	},

	toggleItem: function(item) {
		var mouseEvent = document.createEvent('MouseEvents');
		mouseEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		item.childNodes[0].dispatchEvent(mouseEvent);
	},

	isItemExpanded: function(item) {
		return item.className.indexOf('expanded') !== -1;
	},

	isListMode: function() {
		if(!this.listModeElement) {
			this.listModeElement = document.getElementById('view-list');
		}
		return this.listModeElement.className.indexOf('link-selected') !== -1;
	}
};

var button = {
	show: function() {
		if(!this.button) {
			this.button = nextItemButton.cloneNode(true);
			this.button.id = 'entries-collapse';
			this.setText(expandText);
			this.button.addEventListener('click', function() {
				var selectedItem = list.getSelectedItem();

				if(!selectedItem) {
					return;
				}

				if(list.isItemExpanded(selectedItem)) {
					button.setText(expandText);
					list.toggleItem(selectedItem);
				} else {
					button.setText(collapseText);
					list.toggleItem(selectedItem);
				}
			}, false);

			nextItemButton.parentNode.insertBefore(this.button, nextItemButton.nextSibling);
		} else {
			this.button.style.display = 'block';
			this.setText(expandText);
		}
	},

	hide: function() {
		if(this.button) {
			this.button.style.display = 'none';
		}
	},

	setText: function(text) {
		if(!this.buttonBody) {
			this.buttonBody = this.button.getElementsByClassName('goog-button-body')[0];
		}
		this.buttonBody.textContent = text;
	}
};

// Collapse/Expand button should only work in list mode
var isListMode = false;

modeElement.addEventListener('DOMSubtreeModified', function() {
	if(list.isListMode()) {
		// Switch to list mode
		if(!isListMode) {
			isListMode = true;

			button.show();
		}
	} else {
		// Switch to another mode
		if(isListMode) {
			isListMode = false;

			button.hide();
		}
	}
}, false);

if(list.isListMode()) {
	isListMode = true;
	button.show();
}

// Toggle button text when an item is clicked
listElement.addEventListener('DOMSubtreeModified', function() {
	if(list.isItemExpanded(list.getSelectedItem())) {
		button.setText(collapseText);
	} else {
		button.setText(expandText);
	}
}, false);
