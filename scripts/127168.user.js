// ==UserScript==
// @name			Google Reader new/all items kb shortcut
// @sourcescript	http://userscripts.org/scripts/review/114745
// @sourcescript	http://userscripts.org/scripts/review/48220
// @include			http*://www.google.*/reader/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL		https://userscripts.org/scripts/source/127168.user.js
// @version			0.6
// ==/UserScript==

jQuery.noConflict();

(function() {
	var re = /\d+/;
	var vvo = document.getElementById('viewer-view-options');
	
	function toggle() {
		if (vvo.firstChild.textContent.search(re) == -1) {
			doClick(':8');
		} else {
			doClick(':7');
		}
	}

	function doClick(id) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('mousedown',1,1);
		vvo.dispatchEvent(evt);
		evt = document.createEvent('MouseEvents');
		var obj = document.getElementById(id);
		evt.initEvent('mouseover',1,1);
		obj.dispatchEvent(evt);
		evt = document.createEvent('MouseEvents');
		evt.initEvent('mouseup',1,1);
		obj.dispatchEvent(evt);
		obj.dispatchEvent(evt);
		vvo.blur();
	}
	
	var spm = document.getElementById('stream-prefs-menu');
	
	function doClick_spm(el) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('mouseover',1,1);
		el.dispatchEvent(evt);
		evt = document.createEvent('MouseEvents');
		evt.initEvent('mousedown',1,1);
		el.dispatchEvent(evt);
		evt = document.createEvent('MouseEvents');
		evt.initEvent('mouseup',1,1);
		el.dispatchEvent(evt);
		spm.blur();
	}

	
	function hasClass(el, class_to_match) {
	    var c;
	    if (el && el.className && typeof class_to_match === "string") {
	        c = el.getAttribute("class");
	        c = " "+ c + " ";
	        return c.indexOf(" " + class_to_match + " ") > -1;
	    } else {
	        return false;
	    }
	}
	
	function toggleSort() {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('mousedown',1,1);
		spm.dispatchEvent(evt);

		var sfm = document.getElementsByClassName('goog-menu goog-menu-vertical subscription-folders-menu');
		var fc = sfm[0].firstChild;
		
		if (hasClass(fc, 'goog-option-selected')) {
			doClick_spm(fc.nextSibling);
		} else {
			doClick_spm(fc);
		}
	}

	jQuery(document).keydown(function (e) {
		element = e.target;
		if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;//if cursor on a textarea or input, disable hotkey
		tecla = String.fromCharCode(e.which).toLowerCase();
		if (tecla == "z" && !e.shiftKey && !e.ctrlKey && !e.altKey) { toggle(); }
		else if (tecla == "q" && !e.shiftKey && !e.ctrlKey && !e.altKey) { toggleSort(); }
	});

})();
