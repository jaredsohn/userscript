// ==UserScript==
// @name           Habrapreview
// @version        1.00
// @namespace      dklab
// @author         Dmitry Koterov
// @description    Allows to see topic's preview at the right side of Topic Edit form (now works only for 1680x1050).
// @include        http://habrahabr.ru/edit/topic/*
// @include        http://habrahabr.ru/topic/edit/*
// ==/UserScript==

// Ctrl+Alt+P: turn preview auto-refreshing on/off (defaults to on).
// Ctrl+D: regenerate the preview.

var e = document.createElement('style');
e.innerHTML = "\
\
#main-content { \
    margin-left: -230px; \
} \
\
#preview_placeholder { \
    height: 90%; \
    right: 0; \
    overflow-y: scroll; \
    position: absolute; \
    top: 0; \
    z-index: 1000; \
    background: white; \
	width: 790px; \
	padding-left: 40px; \
} \
\
#preview_placeholder .post { \
	width: 757px; \
} \
\
textarea.large { \
    height: 30em; \
} \
\
#header { \
    display: none; \
} \
\
#footer { \
    display: none; \
} \
#layout { \
	margin: 0 10px; \
} \
\
";
document.body.appendChild(e);

var textarea = getTextarea();
var autoPreview = true;
var prevText = null;
var handler = null;
var clickAt = null;

function generatePreview() {
	var elts = document.getElementsByName("preview");
	for (var i = 0; i < elts.length; i++) {
		var elt = elts[i];
		if (elt.type == "button") {
			prevText = textarea.value;
			elt.click();
		}
	}
}

function getTextarea() {
	var elts = document.getElementsByName("text");
	for (var i = 0; i < elts.length; i++) {
		var elt = elts[i];
		if (elt.tagName == "TEXTAREA") {
			return elt;
		}
	}
	return null;
}

document.addEventListener("keypress", function(e) { 
	if (e.ctrlKey && e.altKey && e.which == 112) {
		autoPreview = !autoPreview;
		if (autoPreview) generatePreview();
	} else if (e.ctrlKey && e.which == 100) {
		generatePreview();
		e.preventDefault();
		e.returnValue = false;
		return false;
	}
}, false);

document.body.addEventListener("mousedown", function() {
	clickAt = new Date().getTime();
}, false);

textarea.addEventListener("keyup", function(e) { 
	if (handler) clearTimeout(handler);
	handler = setTimeout(function() { 
		if (textarea.value != prevText) {
			prevText = textarea.value;
			if (autoPreview) generatePreview();
		};
	}, 1000);
}, false);

textarea.addEventListener("blur", function(e) { 
	setTimeout(function() { 
		var t = document.activeElement;
		// Avoud unexpected focus loss (e.g. while preview regeneration).
		if (t.tagName == "BODY" && (new Date().getTime() - clickAt) > 100) textarea.focus();
	}, 10);
}, false);

if (autoPreview) setTimeout(function() { generatePreview() }, 1000);
