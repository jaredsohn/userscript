// Gmail Strikethrough button
// Copyright, benleevolk, 2013
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
// @name           Gmail Strikethrough Button
// @namespace      http://userscripts.org/scripts/show/57725
// @description    Adds strikethrough button to Gmail rich text editor
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==


var gmailStrikeThroughButton = {

	strikethroughButton: null,
	underlineButton: null,
	activeButtonClassName: null,
	canvas_frame_document: null,
	text_editor: null,
	compose_method: '',

	getIcon: function() {
		var icon="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE"+
        "JmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczpt"+
        "ZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS4xLjIiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0"+
        "dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRl"+
        "c2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5h"+
        "ZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxMi0wOS0wMlQx"+
        "MzowOTo4NDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxt"+
        "YXRvciAyLjE8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAg"+
        "IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0"+
        "dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+"+
        "MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzI8L3RpZmY6"+
        "WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Np"+
        "b24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+"+
        "CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICA8"+
        "L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAg"+
        "ICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAg"+
        "ICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAg"+
        "ICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxl"+
        "eGlmOlBpeGVsWURpbWVuc2lvbj4xNjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRm"+
        "OkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoWmbtZAAAA0klEQVQ4EcVS"+
        "2w3CMAwkqAt0BVZghXYVJgCxQhiBrsAIWaGM0BVghHBX7MhtU0DKB5ZOfp3PaRoXY9yU2LZkmLP/"+
        "F6hyn+Ccq1H3wB1gvCNwXy381HiJc4DxAM5aZwwgzXDnRRAPJAPe9pAHm2uc296IAEWuwJ5kWKND"+
        "1i8EhBwwwClF/1EAzZMh69A3fxyX2ePI9trWIMw7GWRBb3sjf1F4D6Q/oH0RGDRXv/YSvbwFzCV7"+
        "IupSJkH2IaFHcoDITWI+pg5bL/ATczxKia19ws+aL+i4Az4HM0r5AAAAAElFTkSuQmCC";
		return icon;
	},

	getActiveButtonClassName: function() {
		this.activeButtonClassName = "J-Z-I-Jp";
	},

	setStrikeThrough: function() {
		gmailStrikeThroughButton.text_editor.execCommand("strikethrough", false, '');
		gmailStrikeThroughButton.checkForStrikes();
	},

	addButton: function() {
		this.strikethroughButton=this.underlineButton.cloneNode(true);
		this.strikethroughButton.setAttribute("title", "Strikethrough");
		this.strikethroughButton.setAttribute("data-tooltip", "Strikethrough");
		this.strikethroughButton.setAttribute("command", "+strikethrough");
		this.strikethroughButton.setAttribute("id", "strikethroughbutton");
		
		var bgImage = this.strikethroughButton.firstChild.firstChild.firstChild;
		bgImage.style.backgroundImage="url(data:image/png;base64," + gmailStrikeThroughButton.getIcon() + ")";
		bgImage.style.backgroundRepeat="no-repeat";
		bgImage.style.backgroundPosition="0px 0px";

		this.strikethroughButton.addEventListener("click", gmailStrikeThroughButton.setStrikeThrough, false);
		
		this.underlineButton.parentNode.insertBefore(this.strikethroughButton, this.underlineButton.nextSibling);

	},

	checkForStrikes: function() {
		var classRegEx = new RegExp(" " + gmailStrikeThroughButton.activeButtonClassName, "g");
		if (gmailStrikeThroughButton.text_editor.queryCommandState("strikethrough")) {
			if (!gmailStrikeThroughButton.strikethroughButton.className.match(classRegEx)) {
				gmailStrikeThroughButton.strikethroughButton.className+=" " + gmailStrikeThroughButton.activeButtonClassName; // add active state
			}
		} else {
			gmailStrikeThroughButton.strikethroughButton.className=gmailStrikeThroughButton.strikethroughButton.className.replace(classRegEx, ""); // remove active state
		}
	},

	bindTextEditorEvents: function() {
		gmailStrikeThroughButton.text_editor.addEventListener("click", gmailStrikeThroughButton.checkForStrikes, false);
		gmailStrikeThroughButton.text_editor.addEventListener("keyup", gmailStrikeThroughButton.checkForStrikes, false);
	},
	

	detectComponents: function(e) {
		var composing = false;
		var fix_width = false;
		var is_firefox = (navigator.userAgent.indexOf('Firefox') != -1);
		var is_chrome = (navigator.userAgent.indexOf('Chrome') != -1);
		if (e != null) {
			// old compose
			if (e.target.nodeName=='IFRAME' &&
				e.target.className.indexOf('editable')!=-1) {
				gmailStrikeThroughButton.compose_method = 'old';
				composing = true;
				gmailStrikeThroughButton.text_editor = e.target.contentDocument;
				gmailStrikeThroughButton.canvas_frame_document = e.target.ownerDocument;
			// new compose - firefox
			} else if (e.target.nodeName=='IFRAME' && 
				e.target.parentNode.className.indexOf('editable') != -1 && is_firefox) {
				composing = true;
				fix_width = true;
				gmailStrikeThroughButton.compose_method = 'new_firefox';
				gmailStrikeThroughButton.text_editor = e.target.contentDocument;
				gmailStrikeThroughButton.canvas_frame_document = e.target.ownerDocument;
			// new compose - chrome
			} else if (e.target.innerHTML && 
				e.target.innerHTML.indexOf('+underline')!=-1 &&
				/*e.target.innerHTML.indexOf('+justifyLeft')==-1 */ true && is_chrome) {
				composing = true;
				fix_width = true;
				gmailStrikeThroughButton.compose_method = 'new_chrome';
				gmailStrikeThroughButton.text_editor = e.target.ownerDocument;
				gmailStrikeThroughButton.canvas_frame_document = e.target.ownerDocument;
			}
		} else if (e == null) {
				composing = true;
				gmailStrikeThroughButton.compose_method = 'new_chrome';
				gmailStrikeThroughButton.text_editor = document;
				gmailStrikeThroughButton.canvas_frame_document = document;			
		}
		if (composing) {

			var xPathResult = gmailStrikeThroughButton.canvas_frame_document.evaluate("//div[@command='+underline']", gmailStrikeThroughButton.canvas_frame_document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			if (gmailStrikeThroughButton.underlineButton=xPathResult.snapshotItem(0)) { // =!
				gmailStrikeThroughButton.getActiveButtonClassName();
				gmailStrikeThroughButton.addButton();
				setTimeout(gmailStrikeThroughButton.bindTextEditorEvents, 1);
			}
		}
		
	},
	
	init: function() {
		if (document.body.innerHTML.indexOf("+underline") != -1) {
			gmailStrikeThroughButton.detectComponents(null);
		}
		window.addEventListener("DOMNodeInserted", gmailStrikeThroughButton.detectComponents, false);
	}
}


gmailStrikeThroughButton.init();
