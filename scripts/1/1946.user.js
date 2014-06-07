// ==UserScript==
// @name          Google Reader Framer
// @namespace     http://www.kushaldave.com
// @description	  Puts item content in a scrolling div
// @include       http://www.google.com/reader/*
// @include       http://reader.google.com/reader/*
// ==/UserScript==

function byid(n) {
  return document.getElementById(n);
}

var skip = 0;
function focus(el) {
  if (typeof(el.focus) == "function") {
    if (skip == 0) {
      el.focus();
      return true;
    } else {
      skip--;
    } 
  }
  for (var i = 0; i < el.childNodes.length; ++i) {
    if (focus(el.childNodes[i])) {
      return true;
    }
  }
}

function getTopOffset(el) {
  if (el && typeof(el.offsetTop) != "undefined") {
    return el.offsetTop + getTopOffset(el.parentNode);
  }
  return 0;
}

function getBottomOffset() {
  return byid("keys-help").offsetHeight +
         byid("footer").offsetHeight;
}

var viewer = byid("viewer");
var firstTime = true;
viewer.onmouseover = function() {
  if (firstTime){
    handleResize();
    firstTime = false;
  }
  // bug workaround from http://www.sitepoint.com/forums/showthread.php?t=285181
  var s = viewer.scrollTop;
  skip = 1;
  focus(viewer.childNodes[0]);
  viewer.scrollTop = s;
};

function handleResize() {
  var t = getTopOffset(viewer);
  var b = getBottomOffset();
  GM_log(t + "and" + b);
  viewer.style.height = (window.innerHeight - t - b) + "px";  
}

window.addEventListener('resize', handleResize, false);

var styleNode = document.createElement("style");  
document.body.appendChild(styleNode);
document.styleSheets[document.styleSheets.length-1].insertRule(
  "#viewer { overflow: auto }",0);
  

