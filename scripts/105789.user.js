// ==UserScript==
// @name           Gmail - Pop Out Reply/Compose
// @namespace      http://skoshy.com
// @include        http*://mail.google.com/*
// ==/UserScript==

var frame;
var count;
var interval = setInterval(checkFrame, 1000);

// Check to see which Gmail frame we're in
function checkFrame() {
	if (document.getElementsByClassName('cP')[0]) {
		frame = 'canvas';
		clearInterval(interval);
		go();
	}
	if (document.getElementById('loading')) {
		frame = 'outside';
		clearInterval(interval);
	}
	count++;
	if (count > 10) {
		clearInterval(interval);
	}
}

function go() {
	document.addEventListener('keyup', keyBind, false);
}

function keyBind(e) {
	if (e.ctrlKey && e.shiftKey && e.keyCode == 90) {
        popOut();
    }
}

function popOut() {
	eventFire(document.getElementsByClassName('eI')[0], "click");
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