// Google Tracking-B-Gone - FIXED version (by Vitaliy Filippov)
// version 2.4
// Release Date: 2013-02-06
// Original link http://sbdev.org
// Now http://userscripts.org/scripts/show/120330
// See also http://userscripts.org/scripts/show/132237
//
// ===== INSTRUCTIONS =====
//
// This is a Greasemonkey user script.
// Now supports Opera.
//
// To use this script in Firefox, get Greasemonkey: http://greasemonkey.mozdev.org/
// After you've installed it, come back to this page. A dialog box will
// appear asking you if you want to install this script.
//
// To uninstall, go to Tools->Greasemonkey->Manage User Scripts, select
// "Google Tracking-B-Gone" from the list on the left, and click
// Uninstall.
//
// To use it in Opera, create a directory for userscripts, put this file into it,
// then go to Settings -> Content -> JS and point userscript directory to the
// newly created directory.
// 
// ==UserScript==
// @name           Google Tracking-B-Gone
// @namespace      http://sbdev.org
// @description    Strips click tracking from Google search results
//
// @include        http://*.google.*
// @include        https://*.google.*
// ==/UserScript==

doIt(); // make sure we run at least once, regardless of search results page version
doRTR(); // strip tracking from inital batch of real-time search results

document.addEventListener('DOMAttrModified', function (event) {
  doRTR(event.target);
  if (event.target.id == 'xfoot' || event.target.parentNode.id == 'bfoot') {
    doIt();
  }
}, false);

document.addEventListener('DOMSubtreeModified', function (event) {
  doRTR(event.target);
  if (event.target.id == 'xfoot') {
    doIt();
  }
}, false);

document.addEventListener('DOMNodeInserted', function (event) {
  if (event.target.parentNode.id == 'gsr') {
    doRTR();
  }
}, false);

function doIt() {
  var resultLinks = $x("//a[@onmousedown]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  resultLinks.forEach(function(link) {  // loop over links
    if (link.getAttribute('onmousedown')) {
      link.removeAttribute('onmousedown');
    }
  });

  resultLinks = $x("//a");
  resultLinks.forEach(function(link) {  // loop over links
    var oldLink = link.href;
    if (/^https?:\/\/www.google/.test(oldLink) || /^https:\/\/encrypted.google/.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches != null) {
        link.href = unescape(matches[2]);
      }
    }
  });
}

function doRTR() {
  if (arguments[0] == undefined) {
    // get all real-time result links
    var resultLinks = $x("//div[@id='search']//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  } else {
    // get all links from the current real-time result
    var resultLinks = $x(arguments[0], "//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  }
  resultLinks.forEach(function(link) {  // loop over every link
    var oldLink = link.href;
    if (/^http:\/\/www.google.|^\/?url/.test(oldLink) || /^https:\/\/encrypted.google./.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches != null) {
        link.href = unescape(matches[2]);
      }
    }
    if (link.getAttribute('onmousedown')) {
      link.removeAttribute('onmousedown');
    }
  });
}

// XPath helper, from
// http://wiki.greasespot.net/Code_snippets
function $x() {
  var x='',          // default values
      node=document,
      type=0,
      fix=true,
      i=0,
      toAr=function(xp){      // XPathResult to array
        var final=[], next;
        while(next=xp.iterateNext())
          final.push(next);
        return final
      },
      cur;
  while (cur=arguments[i++])      // argument handler
    switch(typeof cur) {
      case "string":x+=(x=='') ? cur : " | " + cur;continue;
      case "number":type=cur;continue;
      case "object":node=cur;continue;
      case "boolean":fix=cur;continue;
    }
  if (fix) {      // array conversion logic
    if (type==6) type=4;
    if (type==7) type=5;
  }
  if (!/^\//.test(x)) x="//"+x;            // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
  var temp=document.evaluate(x,node,null,type,null); //evaluate!
  if (fix)
    switch(type) {                              // automatically return special type
      case 1:return temp.numberValue;
      case 2:return temp.stringValue;
      case 3:return temp.booleanValue;
      case 8:return temp.singleNodeValue;
      case 9:return temp.singleNodeValue;
    }
  return fix ? toAr(temp) : temp;
}
