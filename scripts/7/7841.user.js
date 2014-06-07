// ==UserScript==
// @name          Image reddit preview
// @namespace     http://jeffpalm.com/imagereddit
// @description	  Shows a preview of reddit images underneath the article
// @include       http://*reddit.com/*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
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

function main() {
  findImages();
}

function isImage(s) {
  if (!s) return false;
  ilast = s.lastIndexOf(".");
  if (ilast == -1) return false;
  ext = s.substr(ilast+1).toLowerCase();
  exts = new Array("jpg","jpeg","bmp","png","gif");
  for (j=0; j<exts.length; j++) {
    if (ext == exts[j]) return true;
  }
  return false;
}


function findImages() {
  //
  // find all the a's with class title
  //
  as = document.getElementsByTagName("a");
  for (i=0; i<as.length; i++) {
    a = as[i];
    if (a.className != "title") continue;
    if (!isImage(a.href)) continue;
    //
    // find the nearest TR parent
    //
    p = a;
    while (p && p.nodeName.toUpperCase() != "TR") p = p.parentNode;
    tr = $n("tr");
    td = $n("td",tr);
    img = $n("img",td);
    img.src = a.href;
    img.style.width = "150px";
    insertAfter(p.parentNode,tr,p);
  }
  
}

try {main();} catch (e) {alert(e);}

