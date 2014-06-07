// ==UserScript==
// @name           Facebook Thumbsploder
// @namespace      http://cs.ucsd.edu/
// @description    Expand News Feed and Wall thumbnails by hovering the cursor over them..
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

// Copyright 2012 Wilson Lian

setInterval(splode_init, 2000);

function splode_init()
{
  var els = document.getElementsByClassName("uiPhotoThumb");
  for (var i=0; i < els.length; i++)
  {
    els[i].removeEventListener("mouseover", function(e){splode1(e);}, true);
    els[i].addEventListener("mouseover", function(e){splode1(e);}, true);
  }

  els = document.getElementsByClassName("uiMediaThumb");
  for (var i=0; i < els.length; i++)
  {
    els[i].getElementsByTagName("i")[0].removeEventListener("mouseover", function(e){splode2(e);}, true);
    els[i].getElementsByTagName("i")[0].addEventListener("mouseover", function(e){splode2(e);}, true);
  }

  els = document.getElementsByClassName("uiScaledImageContainer");
  for (var i=0; i < els.length; i++)
  {
    els[i].getElementsByTagName("img")[0].removeEventListener("mouseover", function(e){splode1(e);}, true);
    els[i].getElementsByTagName("img")[0].addEventListener("mouseover", function(e){splode1(e);}, true);
  }
}

function splode1(e)
{
  collapse(null);
  var imgurl = e.target.src.replace(/_[as]\.jpg$/, "_n.jpg").replace(/\/s320x320/, "").replace(/\/p480x480/, "");
  
  var newel = document.createElement("img");
  newel.id = "sploded_img";
  newel.src = imgurl;
  newel.style.position = "absolute";
  newel.style.zIndex = 10000;
  
  document.body.appendChild(newel);
  
  followCursor(e);
  window.addEventListener("mousemove", followCursor, false);
  e.target.addEventListener("mouseout", function(e){collapse(e);}, false);
  window.addEventListener("click", function(e){collapse(e);}, false);
  window.addEventListener("keydown", function(e){collapse(e);}, false);
}

function splode2(e)
{
  collapse(null);
  var imgurl = e.target.style.backgroundImage.replace(/^url\(['"]/, "").replace(/"\)$/, "").replace(/_[as]\.jpg$/, "_n.jpg").replace(/\/s320x320/, "");
  
  var newel = document.createElement("img");
  newel.id = "sploded_img";
  newel.src = imgurl;
  newel.style.position = "absolute";
  newel.style.zIndex = 10000;
  document.body.appendChild(newel);
  
  followCursor(e);
  window.addEventListener("mousemove", followCursor, false);
  e.target.addEventListener("mouseout", function(e){collapse(e);}, false);
  window.addEventListener("click", function(e){collapse(e);}, false);
  window.addEventListener("keydown", function(e){collapse(e);}, false);
}

function collapse(e)
{
  var splodel = document.getElementById("sploded_img");
  if (splodel)
  {
    splodel.parentNode.removeChild(splodel);
    window.removeEventListener("mousemove", followCursor, false);
    window.removeEventListener("click", function(e){collapse(e);}, false);
    window.removeEventListener("keydown", function(e){collapse(e);}, false);
  }
}

function followCursor(e)
{
  var splodel = document.getElementById("sploded_img");
  var curPos = getPosition(e);
  var cursorPadding = 20;
  var maxHeight = getViewportHeight() - cursorPadding - 25;
  var maxWidth = getViewportWidth() - e.clientX - cursorPadding - 25;
  splodel.style.maxHeight = maxHeight + "px";
  splodel.style.maxWidth = maxWidth + "px";
  splodel.style.top = (cursorPadding + curPos.y - Math.max(0, (getComputedHeight(splodel) == 0 ? maxHeight : getComputedHeight(splodel)) + 45 - (getViewportHeight() - e.clientY)))+"px";
  splodel.style.left = (cursorPadding + curPos.x)+"px";
}

function getPosition(e)
{
  e = e || window.event;
  var cursor = {x:0, y:0};
  if (e.pageX || e.pageY)
  {
    cursor.x = e.pageX;
    cursor.y = e.pageY;
  }
  else
  {
    var de = document.documentElement;
    var b = document.body;
    cursor.x = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
    cursor.y = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
  }
  
  return cursor;
}

function getComputedHeight(el)
{
  return el.offsetHeight || document.defaultView.getComputedStyle(el, "").getPropertyValue("height").split('px')[0];
}

function getViewportHeight()
{
  var viewportheight;
 
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  
  if (typeof window.innerHeight != 'undefined')
  {
    viewportheight = window.innerHeight;
  }
  
  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  
  else if (typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientHeight != 'undefined' && 
    document.documentElement.clientHeight != 0)
  {
    viewportheight = document.documentElement.clientHeight;
  }
  
  // older versions of IE
  
  else
  {
    viewportheight = document.getElementsByTagName('body')[0].clientHeight;
  }
  
  return viewportheight;
}

function getViewportWidth()
{
  var viewportWidth;
 
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  
  if (typeof window.innerWidth != 'undefined')
  {
    viewportWidth = window.innerWidth;
  }
  
  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  
  else if (typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientWidth != 'undefined' && 
    document.documentElement.clientWidth != 0)
  {
    viewportWidth = document.documentElement.clientWidth;
  }
  
  // older versions of IE
  
  else
  {
    viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
  }
  
  return viewportWidth;
}
