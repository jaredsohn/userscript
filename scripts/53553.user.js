//  Gmail Ctrl+Shift RTL/LTR toggle
// Copyright, benleevolk, 2011
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           Gmail Ctrl+Shift RTL/LTR toggle
// @namespace      http://userscripts.org/users/69486
// @description    Use Ctrl+Shift in Firefox to switch between RTL and LTR modes in gmail
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var ctrlShiftRtlToggle = {

	canvas_frame_document: null,
	text_editor: null,

	simulateClick: function(eventType, node) {
	var event = node.ownerDocument.createEvent("MouseEvents");

	event.initMouseEvent(eventType,
						 true, // can bubble
						 true, // cancellable
						 node.ownerDocument.defaultView,
						 1, // clicks
						 0, 0, // screen coordinates
						 0, 0, // client coordinates
						 false, false, false, false, // control/alt/shift/meta
						 0, // button,
						 null);
	node.dispatchEvent(event);
	},
	
	toggle: function(e) {
		if (e.ctrlKey && e.shiftKey) {
			var newState;
			var xPath = ctrlShiftRtlToggle.canvas_frame_document.evaluate("//div[@command='rtl']", ctrlShiftRtlToggle.canvas_frame_document, null, 
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xPath.snapshotItem(0)) {
				var currentClassName=xPath.snapshotItem(0).className.split(" ");
				var nextState;
				if (currentClassName.length<=3) { // current state is ltr, a dirty hack to determine whether the "ltr" button is pressed
					nextState="rtl";
				} else {
					nextState="ltr";
				}
				xPath = ctrlShiftRtlToggle.canvas_frame_document.evaluate("//div[@command='" + nextState + "']", ctrlShiftRtlToggle.canvas_frame_document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				currentButton = xPath.snapshotItem(0);
				currentButton.parentNode.setAttribute('aria-activedescendant', currentButton.id);
				ctrlShiftRtlToggle.simulateClick('mousedown', currentButton);
				ctrlShiftRtlToggle.simulateClick('mouseup', currentButton);
			}
		}
	},
	
	detectComponents: function(e) {
		if (e.target.nodeName=='IFRAME' &&
			e.target.className.indexOf('editable')!=-1) {
			ctrlShiftRtlToggle.text_editor = e.target.contentWindow;
			ctrlShiftRtlToggle.canvas_frame_document = e.target.ownerDocument;
			ctrlShiftRtlToggle.text_editor.addEventListener("keydown", ctrlShiftRtlToggle.toggle, false); 
		}
	},
	
	init: function() {
		window.addEventListener("DOMNodeInserted", ctrlShiftRtlToggle.detectComponents, false);
	}
}

ctrlShiftRtlToggle.init();