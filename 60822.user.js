// ==UserScript==
// @name          Google List
// @namespace     http://jeffpalm.com/goodlist/
// @description   Keeps a list of google results that started this quest
// @include       *
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

const TESTING = false;

// ----------------------------------------------------------------------
// State
// ----------------------------------------------------------------------

var urls;
var ul;

// ----------------------------------------------------------------------
// Values
// ----------------------------------------------------------------------

const KEY_PREFIX = "_googlist_";
const QUERY_KEY = "query";
const URLS_KEY = "urls";
const SEP = "\t";

function getValue(key,defaultValue) {
  if (!defaultValue) defaultValue = "";
  return GM_getValue(KEY_PREFIX+key,defaultValue);
}

function setValue(key,value) {
  GM_setValue(KEY_PREFIX+key,value);
}

function getQueryURLs() {
	var s = getValue(URLS_KEY,'');
	if (!s) return null;
	return s.split(SEP);
}

	
// ----------------------------------------------------------------------
// Misc
// ----------------------------------------------------------------------

function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  if (arguments.length > 2) setId(e,arguments[2]);
  return e;
}

function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

function $(id) {
  if (typeof id == "string") {
    var el = document.getElementById(id);
    return el;
  }
  return id;
}

// ----------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------

function toggleListState() {
	if (ul.style.display == "none") {
		ul.style.display = "inline";
	} else {
		ul.style.display = "none";
	}
}

function showMenu(loc) {
	//
	// See if the current location is in the location list.
	// If it is show the menu of other queries
	//
	urls = getQueryURLs();
	if (!urls) return;
	var found = false;
	loc = loc.replace(/#.*/,"");
	for (var i in urls) {
		var u = urls[i];
		u = u.replace(/#.*/,"");
		if (u == loc)  {
			found = true;
			break;
		}
	}
	if (!found) return;
	var div = $n("div");
	div.style.position = "absolute";
	div.style.top = "2px";
	div.style.left = "2px";
	div.style.zIndex = "1000";
	document.body.appendChild(div);
	var a = $n("a",div);
	a.innerHTML = "[G]";
	a.style.color = "#000077";
	a.href = "#";
	a.addEventListener("click",function(e) {toggleListState();},true);
	var subDiv = $n("div",div);
	subDiv.style.backgroundColor = "#000";
	subDiv.style.opacity = "0.7";
	subDiv.style.filter = "alpha(opacity=70)";
	subDiv.padding = "5px";
	ul = $n("ul",subDiv);
	ul.style.margin = "5px";
	ul.style.display = "none";
	for (var i in urls) {
		var u = urls[i];
		var li = $n("li",ul);
		var lia = $n("a",li);
		lia.style.color = "#fff";
		lia.innerHTML = u;
		lia.href = u;
	}
}

function storeQuery(query) {
	//
	// Look for all the urls and store them to this query
	//
	var as = document.getElementsByTagName("A");
	var urls = [];
	for (var i in as) {
		var a = as[i];
		if (a.className != "l" ) continue;
		var url = a.href;
		urls.push(url);
	}
	setValue(QUERY_KEY,query);
	setValue(URLS_KEY,urls.join(SEP));
}

function main() {

	var shouldShowMenu= true;
	var loc = String(document.location);

	// On a google search, save the list of urls for this query
	if (loc.match(/google.com\/search/)) {
		var pairs = document.location.search.replace(/\?/,'').split(/&/);
		var query = null;
		for (var i in pairs) {
			var pair = pairs[i];
			var param = pair.split(/=/);
			var key = param[0];
			var val = param[1];
			if (key == 'q') {
				query = val.replace(/\+/,' ');
			}
		}
		if (query) {
			shouldShowMenu = false;
			storeQuery(query);
		}
	}

	if (shouldShowMenu) {
		showMenu(loc);
	}
	
}

try {main();} catch (e) {if (TESTING) alert("ERROR:" + e);}