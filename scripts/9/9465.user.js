// ==UserScript==
// @name          Seamless Web
// @namespace     http://jeffpalm.com/seamlessweb
// @description	  Shows descriptions of food
// @include       http://*seamlessweb*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */


var BETA = true;
var DEBUG = true;

/** This separate values in the notes array */
var BOUNDARY = "_2*&"; 

// --------------------------------------------------
// Misc
// --------------------------------------------------

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

function insertBefore(newNode,target) {
	// http://lists.xml.org/archives/xml-dev/200201/msg00873.html
  var parent   = target.parentNode;
	var refChild = target; //target.nextSibling;	
	if(refChild) parent.insertBefore(newNode, refChild);
	else parent.appendChild(newNode);	
}

function insertAfter(newNode,target) {
	// http://lists.xml.org/archives/xml-dev/200201/msg00873.html
  var parent   = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild) parent.insertBefore(newNode, refChild);
	else parent.appendChild(newNode);
}

// --------------------------------------------------
// Main
// --------------------------------------------------

var showingDescriptions = false;
var newDivs = new Array();
function showDescriptions() {
  if (showingDescriptions) return;
  divs = document.getElementsByTagName("div");
  if (!divs) return;
  for (var i=0; i<divs.length; i++) {
    var div = divs[i];
    if (div.className != "MenuItemName") continue;
    var a = div.firstChild;
    var s = a.getAttribute("onmouseover");
    // onmouseover="showInfoPopup('InfoPopupProductDetail',this.parentNode.parentNode,'Combo Special (Price: $13.95)|Choose one appetizer and one entree selection.  You also get Basmati rice, nan bread, cucumber, raita (yogurt) and mango chutney, with your order.  NO SUBSTITUTIONS WILL BE HONORED.|');"
    if (res = s.match(/parentNode.parentNode,\'[^\|]*\|([^\']+)\|\'/)) {
      if (res.length != 2) continue;
      var newDiv = $n("div",div);
      newDiv.style.fontSize = ".8em";
      newDiv.style.color = "#666";
      newDiv.innerHTML = res[1];
      newDivs.push(newDiv);
    }

    
  }
  showingDescriptions = true;
}

function hideDescriptions() {
  for (var i=0; i<newDivs.length; i++) {
    var d = newDivs[i];
    d.parentNode.removeChild(d);
  }
  newDivs = new Array();
  showingDescriptions = false;
}

function toggle() {
  if (showingDescriptions) {
    hideDescriptions();
  } else {
    showDescriptions();
  }
}

function main() {
  // find the order history node and insert a new node here
  var lis = document.getElementsByTagName("li");
  var li = 0;
  for (var i=0; i<lis.length; i++) {
    if (lis[i].className == "first") {
      li = lis[i];
      break;
    }
  }
  if (li) {
    var newLi = $n("li",li.parentNode);
    var newA = $n("a",newLi);
    newA.href = "#";
    newA.addEventListener("click",toggle,true);
    newA.innerHTML = "Toggle descriptions";
  }
}

try {main();} catch (e) {}

