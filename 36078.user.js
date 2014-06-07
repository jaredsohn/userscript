// ==UserScript==
// @name          PopImage
// @namespace     http://jeffpalm.com/popimage
// @description   Pops up image in inline window.
// @include       http://*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

var EXTS = ['jpg','jpeg','png','bmp','gif'];
var backgroundDiv = null;
var modalDialogDiv = null;

function isImage(link) {
  if (!link) return false;
  link = link.toLowerCase();
  for (var i=0; i<EXTS.length; i++) {
    var ext = EXTS[i];
    if (link.match(ext + '$')) return true;
  }
  return false;
}

function newClickFunction(a,src) {
  var _a = a;
  var _src = src;
  return function() {
    showImage(_src);
  };
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

function $(id) {
  if (typeof id == "string") {
    var el = document.getElementById(id);
    return el;
  }
  return id;
}

function showImage(src) {
  if (!backgroundDiv) {
    backgroundDiv                        = $n("div",document.body);
    backgroundDiv.style.position         = "absolute";
    backgroundDiv.style.top              = "0px";
    backgroundDiv.style.left             = "0px";
    backgroundDiv.style.height           = "100%";
    backgroundDiv.style.width            = "100%";
    backgroundDiv.style.backgroundColor  = "gray";
    backgroundDiv.style.opacity          = ".7";
    backgroundDiv.style.filter           = "alpha(opacity=70)";
    backgroundDiv.style.zIndexw          = "5";
  }

  if (!modalDialogDiv) {
    var WIDTH = 50;
    var MARGIN = (100 - WIDTH) / 2;
    var HEIGHT = 400;
    modalDialogDiv                         = $n("div",document.body);
    modalDialogDiv.style.position          = "absolute";
    modalDialogDiv.style.backgroundColor   = "white";
    modalDialogDiv.style.border            = "1px solid black";
    modalDialogDiv.style.top               = "20px";
    modalDialogDiv.style.minWidth          = WIDTH + "%";
    modalDialogDiv.style.marginLeft        = MARGIN + "%";
    modalDialogDiv.style.marginRight       = MARGIN + "%";
    modalDialogDiv.style.zIndex            = "10";
    modalDialogDiv.style.padding           = "20px";
    modalDialogDiv.style.minHeight         = "30%";

  }

  while (modalDialogDiv.childNodes.length > 0) {
    modalDialogDiv.removeChild(modalDialogDiv.firstChild);
  }

  var img = $n("img",modalDialogDiv);
  img.src = src;

  $n("br",modalDialogDiv);
  $n("br",modalDialogDiv);

  var b = $n("div",modalDialogDiv);
  b.style.position = "relative";
  b.style.left = "10px";
  b.style.bottom = "10px";

  var closeLink = $n("a",b);
  closeLink.innerHTML = "close";
  closeLink.href = "#";
  closeLink.addEventListener("click",closeModalDialog,true);


  $t(" | ",b);

  var openLink = $n("a",b);
  openLink.innerHTML = "view";
  openLink.href = src;
  openLink.target = "_";

  show(backgroundDiv);
  show(modalDialogDiv);

  return modalDialogDiv;
}

/**
 * Closes all element arguments passed in.
 */
function close() {
  for (var i=0; i<arguments.length; i++) {
    if (arguments[i]) arguments[i].style.display = "none";
  }
}

/**
 * Shows all element arguments passed in.
 */
function show() {
  for (var i=0; i<arguments.length; i++) {
    if (arguments[i]) arguments[i].style.display = "";
  }
}

/**
 * Closes the main dialog.
 */
function closeModalDialog(e) {
  close(backgroundDiv);
  close(modalDialogDiv);
}

function main() {
  var as = document.getElementsByTagName("a");
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (isImage(a.href)) {
      var src = a.href;
      a.href = '#';
      a.addEventListener('click', newClickFunction(a,src), true);
    }
  }
}

main();
