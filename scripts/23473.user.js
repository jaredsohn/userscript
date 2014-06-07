// ==UserScript==
// @name            HdrScroll
// @namespace       tag:alserkli@inbox.ru,2008:gmscript
// @description     Scroll to header:
//  Ctrl-Up/Down to scroll to the previous/next highest header title;
//  Ctrl-Left/Right to scroll to previous/next header (what is considered
//  a header can be adjusted with XPath).
//
//  Each first navigation in a series pushes the mark, to return to that
//  place use Ctrl-Home. You can also mark current position with Ctrl-End.
//
//  If order of headers is changed (due to layout change, etc.), use
//  "Update header list" user menu command.
// ==/UserScript==

// XPath for headers navigated with Ctrl-Left/Right
// usual headers and "<strong> outside <p>"
var headersXPath = "//h1|//h2|//h3|//h4|//h5|//h6|//strong[not(ancestor::p)]";

var h = []; // array of highest header elements
var ha = []; // array of all header elements

function fullOffset(n){ // not cached due to possible layout changes
	var r = n.offsetTop;
	while(n = n.offsetParent)
		r += n.offsetTop;
	return r;
}
function compareOffset(a,b){ return fullOffset(a) - fullOffset(b); }
var initialized = false;
function init(){
	var hnames = ['h1','h2','h3','h4','h5'];
	for(var i in hnames){
		var t = document.body.getElementsByTagName(hnames[i]);
		if(t.length > 1){
			for(var j = 0; j < t.length; ++j)
				h[j] = t[j];
			break;
		}
	}
	var t = document.evaluate(headersXPath, document,
			  null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < t.snapshotLength; i++)
		ha[i] = t.snapshotItem(i);

	h.sort(compareOffset);
	ha.sort(compareOffset);
	initialized = true;
}

var prevPos = []; // scrollY before the series of header moves
function markPosition(){ prevPos.push(window.scrollY); }
function popPosition(){
	var y = prevPos.pop();
	if(y) window.scrollTo(0, y);
}

var lastSY = 0, lastCollection = null, lastI = -1;
function scrollToPrevious(h){ // scroll to previous item in collection h
	if(!initialized) init();
	if(lastSY == window.scrollY && lastCollection == h){
		// no scroll since last command in this collection
		if(lastI > 0)
			window.scrollTo(0, lastSY=fullOffset(h[--lastI]));
	}else for(var i = h.length - 1; i >= 0; --i){ // linear search is fast enough
		var t = fullOffset(h[i]);
		if(t < window.scrollY){
			markPosition();
			window.scrollTo(0, t);
			lastSY = t; lastCollection = h; lastI = i;
			break;
		}
	}
}
function scrollToNext(h){
	if(!initialized) init();
	if(lastSY == window.scrollY && lastCollection == h){
		if(lastI + 1 < h.length)
			window.scrollTo(0, lastSY=fullOffset(h[++lastI]));
	}else for(var i = 0; i < h.length; ++i){
		var t = fullOffset(h[i]);
		if(t > window.scrollY){
			markPosition();
			window.scrollTo(0, t);
			lastSY = t; lastCollection = h; lastI = i;
			break;
		}
	}
}

function keypress(e){
	// change key-bindings if you do not like them
	if(!e.altKey && e.ctrlKey && !e.shiftKey){
		if(e.keyCode == e.DOM_VK_UP){
			scrollToPrevious(h);
			e.preventDefault(true);
		}else if(e.keyCode == e.DOM_VK_DOWN){
			scrollToNext(h);
			e.preventDefault(true);
		}else if(e.keyCode == e.DOM_VK_LEFT){
			scrollToPrevious(ha);
			e.preventDefault(true);
		}else if(e.keyCode == e.DOM_VK_RIGHT){
			scrollToNext(ha);
			e.preventDefault(true);
		}else if(e.keyCode == e.DOM_VK_HOME){
			popPosition();
			e.preventDefault(true);
		}else if(e.keyCode == e.DOM_VK_END){
			markPosition();
			e.preventDefault(true);
	    	}
	}
}
window.addEventListener('keypress', keypress, false);
GM_registerMenuCommand("Update header list", init, "u", "alt", "u");

