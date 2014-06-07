// ==UserScript==
// @name          Google Maps Zoom
// @namespace     http://jeffpalm.com/gzoom
// @description   Easily zoom Google maps beyond the normal limits
// @include       http://maps.google.com/*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
// --------------------------------------------------

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

function insertAfter(target,node) {
  par = target.parentNode;
  if (!par) return;
  if (target.nextSibling) {
    par.insertBefore(target.nextSibling,node);
  } else {
    par.appendChild(node);
  }
}

// --------------------------------------------------
// main
// --------------------------------------------------

function changeZoom(combo) {

  // First get the "Link to this page" link
  a = document.getElementById("link");
  if (!a) return;
  href = a.href;
  if (!href) return;

  // Find the selected index of the combo
  idx = combo.options[combo.selectedIndex].value;

  // Find the 'z=' part of the string
  if (res = href.match(/(.*z=)\d+(.*)/)) {
    newHref = res[1] + idx + res[2];
    document.location = newHref;
  }
}

function main() {

  // Find the search maps thing and insert a combo box
  inputs = document.getElementsByTagName("input");
  input = 0;
  for (i=0; i<inputs.length; i++) {
    if (inputs[i].value && inputs[i].value == "Search Maps") {
      input = inputs[i];
      break;
    }
  }

  if (!input) return;

  // Try to find the zoom value so far
  zoom = -1;
  if (res = (""+document.location).match(/z=(\d+)/)) {
    zoom = res[1];
  }

  txt = $t(" Zoom to: ");
  insertAfter(input,txt);
  combo = $n("select");
  for (i=19,j=0; i<=30; i++,j++) {
    opt = $n("option",combo);
    opt.value = ""+i;
    opt.innerHTML = ""+i;
    if (i == zoom) {
      combo.selectedIndex = j;
    }
  }
  insertAfter(txt,combo);
  combo.addEventListener('change',function() {changeZoom(combo);},true);
}

main();
