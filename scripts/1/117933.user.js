// ==UserScript==
// @name     		Gmail - Hide 'Oops!' Alert
// @version  		0.1.1
// @namespace		http://skoshy.com
// @include  		http*://mail.google.com/mail/*
// ==/UserScript==

/* Gmail has multiple frames - this ensures that the script is running on the correct one */

	function checkGmailFrame() {
		var frame;
		var count;
		
		var interval = setInterval(function() {
			if (document.getElementsByClassName('aam')[0]) {
				// We're in the "canvas" frame, this is the one with all the main Gmail elements
				frame = 'canvas';
				clearInterval(interval);
				go();
			}
			if (document.getElementById('loading')) {
				// We're in the outer frame which holds the canvas frame and some other elements (chat boxes)
				frame = 'outside';
				clearInterval(interval);
			}
			count++;
			if (count > 10) {
				// We're in some other frame, abort checking
				clearInterval(interval);
			}
		}, 1000);
	}
	
	checkGmailFrame();

/* End Gmail Frame Checking */

function go() {
	// The chatbox
	var chatBox = document.getElementById(':kn');
	
	// Adds a listener to the checkbox; anytime a node is inserted, it is checked to see if it is the 'Oops!' dialog
	chatBox.addEventListener("DOMNodeInserted", function(evt) {
		var node = evt.target;
		if (node.attributes != null && node.attributes.getNamedItem('role') != null && node.attributes.getNamedItem('role').nodeValue == 'alert') {
			// There indeed is an alert in the chatbox, must check to see if it's the 'Oops!' dialog
			if (node.textContent.startsWith('Oops!')) {
				// It's the 'Oops!' dialog!! Close it out!
				var xButton = node.getElementsByTagName('span')[0].firstChild;
				eventFire(xButton, "click");
				
			}
		}
	}, false);
}

// Adds a "startsWith" method for strings - taken from http://stackoverflow.com/questions/646628/javascript-startswith
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}

// Used from http://stackoverflow.com/questions/2705583/simulate-click-javascript
function eventFire(el, etype){
	if (el.fireEvent) {
		(el.fireEvent('on' + etype));
	} else {
		var evObj = document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}