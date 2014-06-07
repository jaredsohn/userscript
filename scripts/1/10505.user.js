// ==UserScript==
// @name          Reddit filter
// @namespace     http://jeffpalm.com/redditfilter/
// @description	  Filters out reddit.com articles based on regular expressions.
// @include       http://*reddit.com/*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.1;
var PREFIX = "*redditfilter*.";
var KEY = "re";

// --------------------------------------------------
// misc
// --------------------------------------------------

function isFalse(s) {
  return s == "false";
}

function getValue(key) {
  return GM_getValue(PREFIX+key);
}

function setValue(key,val) {
  GM_setValue(PREFIX+key,val);
}

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
	return e;
}

function $t(text,on) {
	var e = document.createTextNode(text);
	if (on) on.appendChild(e);
	return e;
}


function insertAfter(parent, node, referenceNode) {
  if (referenceNode.nextSibling) {
    parent.insertBefore(node, referenceNode.nextSibling);
  } else {
    parent.appendChild(node);
  }
}

// --------------------------------------------------
// main
// --------------------------------------------------

function addFilter() {
  var filter = getValue(KEY);
  if (!filter) filter = "";
  var ans = prompt("Please set your filter",filter);
  if (isFalse(ans)) return;
  setValue(KEY,ans);
  document.location = document.location;
}

var addedCallback = false;

function main() {

	if (!addedCallback) {
		GM_registerMenuCommand("Reddit Filter", addFilter);
		addedCallback = true;
	}

  // make the regexps
  var res = getValue(KEY);
  if (!res) res = "";

  var removed = 0;

  var reStrings = res.split(/,/);
  var regexps = new Array();
  for (var i in reStrings) {
    var re = reStrings[i];
    re = re.replace(/^\s+/,"");
    re = re.replace(/\s+$/,"");
    regexps.push(new RegExp(re,"im"));
  }

  // find all the a's with class title
  as = document.getElementsByTagName("a");
  for (var i=0; i<as.length; i++) {
    a = as[i];
    if (!a.className.match(/\btitle\b/)) continue;

    var title = a.innerHTML;
    
    // check for a match
    var remove = false;
    for (var ir in regexps) {
      var re = regexps[ir];
      if (re.exec(title)) {
        remove = true;
        break;
      }
    }

    if (!remove) continue;



    // find the nearest TR parent
    p = a;
    while (p && p.nodeName.toUpperCase() != "TR") p = p.parentNode;
    p.parentNode.removeChild(p);

    removed++;
  }

  // Display the results
  var tab = document.getElementById("topbar");
  var tr = $n("tr",tab);
  var td = $n("td",tab);
  var span = $n("div",td);
  span.innerHTML = "<b>" + removed++ + "</b> removed";
  if (removed > 0) span.style.color = "#770000";
  tab.insertBefore(tr,tab.firstChild);
  
}

main();

