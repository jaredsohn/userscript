// ==UserScript==
// @name           TRAC Hebrew (RTL) support
// @author			(David *)Frenkiel
// @namespace      http://intelligym.com
// @description    Add Hebrew (RTL) support to TRAC ticket pages
// @include			*/trac/*/ticket/*
// @include			*/trac/*/newticket
// @version        1.0
// TRAC Wiki Hebrew (RTL) support
// ==/UserScript==

function myTrace() {
	var len = arguments.length;
	if (0 == len) {
		return;
	}
	var arr = new Array(len);
	for (var i = 0; i < len; i++) {
		arr[i] = arguments[i];
	}
	GM_log(arr.join(' '));
}

var ltrLabel = '<span style="color: #999999;">&gt;</span><span style="color: #444444;">&gt;</span><span style="color: #000000;font-weight:bold;">&gt;</span>';
var	rtlLabel = '<span style="color: #000000;font-weight:bold;">&lt;</span><span style="color: #444444;">&lt;</span><span style="color: #999999;">&lt;</span>';

function hasHeb(str) {
	return str && str.match(/[\u0591-\u05F4]/);
}


function cancelEvent(e) {
	if (e.preventDefault) {
		e.preventDefault();
	} 
	else {
		e.returnValue = false;
	}
	if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function processDescription(div) {
	if (hasHeb(div.innerHTML)) {
		div.setAttribute("dir", "rtl");
	}
}

function toggleDir(t, div) {
	var dir = t.getAttribute("dir");
	if ("rtl" == dir) {
		t.setAttribute("dir", "ltr");
		div.innerHTML = rtlLabel;
	}
	else {
		t.setAttribute("dir", "rtl");
		div.innerHTML = ltrLabel;
	}
}

function processToolbar(div) {
	var doc = window.document;
	var te = div.nextSibling;
	div.style.width = "300px";
	myTrace("found toolbar, next sibling is",te, "parent is", div.parentNode);
	var btn = doc.createElement('div');
	btn.setAttribute("style", "border: 1px outset black; float: right; cursor: pointer;");
	var f = function(e) {
		cancelEvent(e);
		var div = e.currentTarget;
		var t = arguments.callee["te"];
		if (t) {
			toggleDir(t, div);
		}
		return false;
	};
	f["te"] = te;
	btn.addEventListener("mouseup", f, false);
	btn.innerHTML = rtlLabel;
	div.appendChild(btn);
	if (hasHeb(te.value)) {
		toggleDir(te, btn);
	}
//	div.parentNode.insertBefore(btn, te);
}

function tracHeb() {
	var doc = window.document;
	var te = doc.getElementById("field-description");
	myTrace("found textarea " + String(te));

	var divs = doc.getElementsByTagName("div");
	var len = divs.length;
	myTrace("found", len, "divs");
	for (var i = len - 1; i >= 0; i--) {
		var div = divs[i];
		var cname = div.className;
		if (null == cname || "" == cname) {
			continue;
		}
		if (cname == 'wikitoolbar') {
			processToolbar(div);
		}
		else if (cname.indexOf("searchable") >= 0) {
			processDescription(div);
		}

	}
}

window.setTimeout(tracHeb, 500);
