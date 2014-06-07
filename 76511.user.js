// ==UserScript==
// @name			Google Reader - Maximize Vertical Space
// @version			0.5
// @description		Gets rid of the Google bar on the top. Ideal for full screen mode. 
// @include			http://www.google.com/reader/*
// @include			https://www.google.com/reader/*
// @require			http://usocheckup.dune.net/76511.js
// ==/UserScript==

/*jshint curly: true, eqeqeq: true, nomen: true, onevar: true, undef: true, sub: true, white: false */
/*global unsafeWindow: true, GM_addStyle: true  */
var whatDone = {},
intervalIDs = {};

function isDone(mapKey) {
	if (whatDone[mapKey] === null) {
		whatDone[mapKey] = false;
	} else if (whatDone[mapKey] === true) {
		//all done!
		clearInterval(intervalIDs[mapKey]);
		return true;
	}
	return false;
}

function removeElemById(elemId) {
	var elem = document.getElementById(elemId);
	if (elem) {
		return elem.parentNode.removeChild(elem);
	}
	return null;
}

function moveUpDownButton() {
	var MAPKEY = "moveUpDownButton",
	entriesDown,
	entriesUp,
	topControlls;
	if (isDone(MAPKEY)) {
		return;
	}
	
	// Move next and previous to the top controls
	entriesDown = removeElemById("entries-down");
	entriesUp = removeElemById("entries-up");
	topControlls = document.getElementById('viewer-top-controls');
	if (entriesDown && entriesUp && topControlls) {
		topControlls.appendChild(entriesUp);
		topControlls.appendChild(entriesDown);
		whatDone[MAPKEY] = true;
	}
}

function moveMainUp() {
	var MAPKEY = "moveMainUp",
	mainArea;
	if (isDone(MAPKEY)) {
		return;
	}
	mainArea = document.getElementById("main");
	if (mainArea) {
		mainArea.style.top = "0px";
		whatDone[MAPKEY] = true;
	}
}

function addStyle() {
	GM_addStyle([
		".entry-likers, .entry-likers-n {",
		"	display: inline;",
		"}",
		".entry-likers {",
		"	margin-left: 50px;",
		"}",
		"#gb {",
		"	display:none !important;",
		"}",
		"#chrome-header{",
		"	display:none !important;",
		"}",
		"#friend-interruption{",
		"	display:none !important;",
		"}",
		"#top-bar{",
		"	display:none !important;",
		"}",
		"#search{",
		"	display:none !important;",
		"}",
		"#lhn-add-subscription-section{",
		"	display:none !important;",
		"}",
		".friends-tree-following-info{",
		"	display:none !important;",
		"}",
		"#viewer-footer{",
		"	display:none !important;",
		"}",
		".entry-comments{",
		"	display:none !important;",
		"}",
		"friend-interruption{",
		"	display:none !important;",
		"}",
		"#chrome.search-stream #viewer-single-parent{",
		"	float:right;",
		"}",
		"#main{",
		"	margin-top: 0 !important;",
		"}"].join("\n")
	);
}

function prepareSearch() {
	var MAPKEY = "prepareSearch",
	topBar = document.getElementById('top-bar'),
	searchBar = document.getElementById('search'),
	searchInput = document.getElementById('search-input');
	if (isDone(MAPKEY)) {
		return;
	}
	
	if (topBar && searchBar) {
		document.body.insertBefore(topBar.removeChild(searchBar), topBar);
		whatDone[MAPKEY] = true;
	}
	
	searchInput.addEventListener('keydown', function(evt) {
			if (evt && evt.keyCode && evt.keyCode === 27) {	//esc
				hideSearch();
			}
		}, true);
	
	topBar = null;
}

function showSearch() {
	document.getElementById('search').setAttribute('style','display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px; display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;display: block ! important; background: none repeat scroll 0% 0% white; border: 1px solid black; padding: 2px; left: 10px;');
	document.getElementById('search-input').focus();
}

function hideSearch() {
	document.getElementById('search').setAttribute('style','');
}

function searchButton() {
	var MAPKEY = "searchButton",
	target,
	a,
	showOn;
	if (isDone(MAPKEY)) {
		return;
	}
	
	target = document.getElementById('sub-tree-subscriptions');
	
	if (target) {
		target = target.parentNode;
		a = document.createElement('a');
		a.textContent = "Search!";
		a.setAttribute('style', 'float: right; margin-right: 5px;');
		target.appendChild(a);
		showOn = true;
		a.addEventListener('click', function() {
			if (showOn) {
				showSearch();
			} else {
				hideSearch();
			}
			showOn = !showOn;
		}, true);
		whatDone[MAPKEY] = true;
	}
	
	target = a = null;
}

function updateWindow() {
	var MAPKEY = "updateWindow",
	evt;
	if (isDone(MAPKEY)) {
		return;
	}
	evt = document.createEvent("HTMLEvents");
	evt.initEvent("resize", true, true);
	document.dispatchEvent(evt);
	whatDone[MAPKEY] = true;
}

if (location.protocol === 'http:') {
	location.replace('https'+location.href.substr(4));
} else {
	intervalIDs["moveUpDownButton"] = setInterval(moveUpDownButton, 1000*10);
	intervalIDs["searchButton"] = setInterval(searchButton, 1000*10);
	intervalIDs["updateWindow"] = setInterval(updateWindow, 1000*10);
	intervalIDs["prepareSearch"] = setInterval(prepareSearch, 1000*10);
	
	moveMainUp();
	addStyle();
	moveUpDownButton();
	searchButton();
	//updateWindow();
	prepareSearch();
}
