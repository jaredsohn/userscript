// ==UserScript==
// @name          Reddit more
// @namespace     http://jeffpalm.com/redditmore/
// @description   Adds an ajax paginator on posts
// @include       http://*.reddit.com*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

const TESTING = false;
const SCROLL_Y_DIFF = 500;
var maxY = 0;
var loadingDiv = null;

function findPosX(obj) {
	var curleft = 0;
  if (!obj) return curtop;
	if(obj.offsetParent)
		while(1) 
			{
				curleft += obj.offsetLeft;
				if(!obj.offsetParent)
					break;
				obj = obj.offsetParent;
			}
	else if(obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj) {
	var curtop = 0;
  if (!obj) return curtop;
	if(obj.offsetParent)
		while(1)
			{
				curtop += obj.offsetTop;
				if(!obj.offsetParent)
					break;
				obj = obj.offsetParent;
			}
	else if(obj.y)
		curtop += obj.y;
	return curtop;
}

function getLastNextLink() {
  var as = document.getElementsByTagName("A");
  var res = null;
  for (var i in as) {
    var a = as[i];
    if (a.href.match(/\?count=/)) res = a;
  }
  return res;
}

function getContentDiv() {
  var divs = document.getElementsByTagName("DIV");
  for (var i in divs) {
    var div = divs[i];
    if (div.className == 'content') {
      return div;
    }
  }
  return null;
}

function addPage(resp) {
  var text = resp.responseText;
  //     <div class="content">
  //     <div class="footer-parent">
  var res;
  if (res = text.match(/<div class="content">(.*)\s*<\/div>\s*<div class="footer-parent">/)) {
    var innards = res[1];
    var div = getContentDiv();
    if (div) {
      var newDiv = document.createElement("div");
      newDiv.innerHTML = innards;
      removeLoadingDiv();
      div.appendChild(newDiv);
    }
  }
}

function removeLoadingDiv() {
  if (loadingDiv && loadingDiv.parentNode) {
    loadingDiv.parentNode.removeChild(loadingDiv);
  }
}

function expandLink(nextLink) {
  //
  // Put a loading div before we actually expand it
  //
  removeLoadingDiv();
  loadingDiv = document.createElement("div");
  loadingDiv.innerHTML = "Loading the next 25...";
  var div = getContentDiv();
  if (div) div.appendChild(loadingDiv);
    GM_xmlhttpRequest({
          method  : "GET",
          url     : nextLink.href,
          headers : {
          "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml,text/plain",
            },
          onload  : function (resp) {
          try {
            addPage(resp);
          } catch (e) {if (TESTING) alert(e);}
        }
          });
}

function checkMaxY() {
  //
  // Find the next link and calculate the next Y coordinate that will
  // trigger a load
  //
  var nextLink = getLastNextLink();
  if (!nextLink) return;
  var y = findPosY(nextLink);
  var curY = window.scrollY;
  if (y > maxY) maxY = y;
  if (curY+SCROLL_Y_DIFF >= maxY) expandLink(nextLink);
}

function main() {
  checkMaxY();
  setInterval(checkMaxY,3000);
}

try {main();} catch (e) {if (TESTING) alert('Error: ' + e);}
