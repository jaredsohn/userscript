// ==UserScript==
// @name           Detect Caps Lock
// @namespace      http://userscripts.org/
// @description    detects caps lock when typing into password fields
// @include        http://*
// @include        https://*
// ==/UserScript==

(function () { // GM script wrapper

function init() {
	var inputs = document.getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type.toLowerCase() == 'password') {
			AttachEvent(inputs[i], 'keypress', caps, true);
			
		}
	}
}

function caps(e) {
	e = e || event;
	var key = e.keyCode || e.which;
	var sh = e.shiftKey || (key == 16);
	var el = e.srcElement || e.target;
	var warning = document.getElementById('capswarning');
	if ((!sh && key > 64 && key < 91) || (sh && key > 96 && key < 123)) {
		if (warning) return;
		if (el.offsetParent) {
			var el_x = el.offsetLeft + Math.round(el.offsetWidth / 2) - 55,
			el_y = el.offsetTop + Math.round(el.offsetHeight / 2) - 8;
			if (el_x < 3) el_x = 3;
			if (el_y < 3) el_y = 3;
			while (el = el.offsetParent) {
				el_x += el.offsetLeft;
				el_y += el.offsetTop;
			}
		} else var el_x = el_y = 3;
		warning = document.createElement('div');
		with (warning) {
			style.position = 'absolute';
			style.left = el_x + 'px';
			style.top = el_y + 'px';
			style.color = 'red';
			style.backgroundColor = 'white';
			style.fontFamily = 'Veranda,Arial,Tahoma,Serif';
			style.size = '12px';
			style.fontWeight = 'bold';
			style.zIndex = 1000;
			innerHTML = 'Check Caps Lock';
			id = 'capswarning';
		}
		document.body.appendChild(warning);
		setTimeout(function() {
			var warning;
			if (warning = document.getElementById('capswarning'))
				warning.parentNode.removeChild(warning);
		}, 1500);
	} else {
		if (warning) {
			warning.parentNode.removeChild(warning);
		}
	}
}

//*** This code is copyright 2003 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
//*** Reuse or modification is free provided you abide by the terms of that license.
//*** (Including the first two lines above in your source code satisfies the conditions.)


//***Cross browser attach event function. For 'evt' pass a string value with the leading "on" omitted
//***e.g. AttachEvent(window,'load',MyFunctionNameWithoutParenthesis,false);

function AttachEvent(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
	else{
		MyAttachEvent(obj,evt,fnc);
		obj['on'+evt]=function(){ MyFireEvent(obj,evt) };
	}
} 

//The following are for browsers like NS4 or IE5Mac which don't support either
//attachEvent or addEventListener
function MyAttachEvent(obj,evt,fnc){
	if (!obj.myEvents) obj.myEvents={};
	if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
	var evts = obj.myEvents[evt];
	evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
	if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
	var evts = obj.myEvents[evt];
	for (var i=0,len=evts.length;i<len;i++) evts[i]();
}

//*** end Gavin Kistner's AttachEvent code

// The timeout allows attachment of events to elements loaded
// dynamically after page load.  Hotmail is an example of a page
// that requires the delay.
setTimeout(init, 1000);

})(); // end GM script wrapper