// ==UserScript==
// @name          Bloglines filter
// @namespace     http://jeffpalm.com/bloglinesfilter
// @description	  Filters out bloglines blogs with no articles
// @include       http://*bloglines.com/myblogs_subs*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
// --------------------------------------------------

function makeA(div,html,callback) {
  var a = $n("a",div);
  return makeLink(a,html,callback);
}

function makeLink(a,html,callback) {
  a.href = "#";
  a.innerHTML = html;
  a.addEventListener("click",callback,true);
  return a;
}

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
  if (arguments.length > 2) e.id = arguments[2];
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

function doFilter() {

  // remove those blogs with no articles
  var lis = document.getElementsByTagName("li");
  var toRemove = new Array();
  for (var i in lis) {
    // sub dragHandle
    if (lis[i].className && lis[i].className.match(/sub/) && lis[i].className.match(/dragHandle/)) {
      toRemove.push(lis[i]);
    }
  }

  for (var i in toRemove) {
    var li = toRemove[i];
    var nodeId = li.id;
    // treelsub_9607641_1150013
    var id = nodeId.replace(/treelsub_/,"");
    var a = document.getElementById("treeasub_"+id);
    if (!a) continue;
    if (!a.className || a.className == "") {
      li.parentNode.removeChild(li);
    }
  }

}

function main() {
  
  // find the target for the link
  var target = 0;
  var divs = document.getElementsByTagName("div");
  for (var i in divs) {
    var d = divs[i];
    if (d.className == "hnav_navbar") {
      target = d;
      break;
    }
  }

  if (!target) return;

  // insert the link
  $t(" | ",target);
  var a = makeA(target,"Filter",doFilter);
  a.className = "navbar";
}

main();

