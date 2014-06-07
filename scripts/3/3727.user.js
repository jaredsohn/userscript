// Easynews Shift-Click
// version 0.1
// 2006-03-31
// Copyright (c) 2006, Mike Cao
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// Notice:
//
// This script is third party software and is not affiliated with
// Easynews in any way. Easynews has not reviewed nor endorsed this
// software. Use at your own risk.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Easynews Shift-Click
// @description    Adds shift-click functionality to easynews.com.
// @include        http://members.easynews.com/*
// ==/UserScript==

var shiftClick = false;
var lastClick = 0;
var lastCheck = false;
var clickBoxes = new Array();

window.keyDown = function(e) {
    var key = (window.event) ? event.keyCode : e.keyCode;
    if (key == 16) {
		shiftClick = true;
    }
}

window.keyUp = function(e) {
    var key = (window.event) ? event.keyCode : e.keyCode;
    if (key == 16) {
		shiftClick = false;
    }
}

window.checkClick = function() {

	var thisClick = parseInt(this.name);

	var e = document.getElementById(this.id);
	lastCheck = e.checked;

	if (shiftClick && thisClick != lastClick) {
		var start = lastClick;
		var end = thisClick - 1;
		var allChecked = true;

		if (thisClick < lastClick) {
			start = thisClick;
			end = lastClick - 1;
		}
	
		for (var i = start; i < end; i++) {
			if (clickBoxes[i].checked == false) {
				allChecked = false;
				break;
			}
		}

		if (allChecked) {
			checkRange(start, end, false);
		}
		else {
			checkRange(start, end, true);
		}
	}

	lastClick = thisClick;
}

window.checkRange = function(start, end, checked) {
	for (var i = start; i < end; i++) {
		clickBoxes[i].checked = checked;
	}
}

window.isInt = function(str) {
	var i = parseInt(str);

	if (isNaN (i)) return false;
	if (i.toString() != str) return false;

	return true;
}

window.loadCheckboxes = function() {
	var index = 0;
	var elements = document.getElementsByTagName("input");

	for (var i = 0; i < elements.length; i++) {
		var e = elements[i];
		if (e.type == "checkbox" && isInt(e.name)) {
			index++;
			e.addEventListener('click', checkClick, true);
			clickBoxes[clickBoxes.length] = e;
		}
	}
}

window.document.addEventListener('keydown', keyDown, false);
window.document.addEventListener('keyup', keyUp, false);

loadCheckboxes();
