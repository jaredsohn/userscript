// ==UserScript==
// @name           add keyboard shortcuts to forum's editor
// @namespace      j2ck
// @include        http://velokrivbass.com/forum/*
// @exclude        http://velokrivbass.com/forum/chat/*
// ==/UserScript==
function isMac() {
	return (navigator.platform.match(/Mac/i) != null);
}
if (isMac()) {
	document.addEventListener('keypress', function(e) {keydownCallback(e);}, true);
} else {
	document.addEventListener('keydown', function(e) {keydownCallback(e);}, true);
}
function keydownCallback(e) {
	var buttonName = 'addbbcode';
	if (window.traceKeyCode) {
		alert('Keycode is ' + e.keyCode);
	}
	switch(true) {
		case ((e.keyCode == 66) && e.ctrlKey) || (isMac() && e.keyCode == 98): // ctrl + b; bold text
			buttonName += '0';
			break;
		case (e.keyCode == 73) && e.ctrlKey: // ctrl + i; italic text
			buttonName += '2';
			break;
		case (e.keyCode == 85) && e.ctrlKey: // ctrl + u; undelined text 
			buttonName += '4';
			break; 
		case (e.keyCode == 72) && e.ctrlKey: // ctrl + h; hyperlink 
			buttonName += '16';
			break; 
		case (e.keyCode == 77) && e.ctrlKey: // ctrl + m; external image  
			buttonName += '14';
			break; 
		case (e.keyCode == 71) && e.ctrlKey: // ctrl + g; google maps frame 
			buttonName += '22';
			break; 
		case (e.keyCode == 81) && e.ctrlKey: // ctrl + q; quote block 
			buttonName += '6';
			break; 
		case (e.keyCode == 76) && e.ctrlKey: // ctrl + alt + l; show every keyCode
			buttonName = false;
			break;
		default:
			return;
	}
	e.preventDefault(); 
	if (buttonName == false) { // alt + ctrl + l pressed
		if (window.traceKeyCode)
			window.traceKeyCode = false;
		else 
			window.traceKeyCode = true;
	}
	var container = document.getElementById('format-buttons');
	if(container) {
		var buttons = container.getElementsByTagName('input');
		for(var i= 0; i< buttons.length; i++) {
			if (buttons[i].name == buttonName) {
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
				buttons[i].dispatchEvent(evt);
				break;
			}
		}
	}
}
