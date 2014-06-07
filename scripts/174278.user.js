// ==UserScript==
// @name       GMail Editor Toolbar
// @namespace  http://www.smartthing.co.uk/
// @version    0.1
// @description  I am always using the toolbar in Gmail to remove formating, indent or add dots. This just automatically expands it as if you had clicked the 'A' symbol in the new compose area.
// @match      https://mail.google.com/*
// @copyright  2013+, Warren Sherliker - info@smartthing.co.uk
// ==/UserScript==

setInterval(function() {
	var editorButton = document.querySelectorAll('[data-tooltip="Formatting options"]');
	if (editorButton) {
		var editorButton = editorButton[0].firstChild;
		if (editorButton) {
			var toolBar = document.querySelectorAll('[data-tooltip="Font"]')[0].parentNode.parentNode.parentNode;
			if (toolBar.style.display == 'none') {
				fireEvent(editorButton, 'mousedown')      
			}
		}
	}
}, 1000);

function fireEvent(element, event) {
   if (document.createEvent) {
       // dispatch for firefox + others
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent(event, true, true ); // event type,bubbling,cancelable
       return !element.dispatchEvent(evt);
   } else {
       // dispatch for IE
       var evt = document.createEventObject();
       return element.fireEvent('on'+event,evt)
   }
}