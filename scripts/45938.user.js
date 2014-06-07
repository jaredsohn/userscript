// ==UserScript==
// @name          CraigTrack
// @namespace     http://jeffpalm.com/craigtrack
// @description   Tracks the listings to which you've mailed
// @include       http://*.craigslist.org/*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

var TESTING = true;

// Constants
var PREFIX = "*craigtrack*.";

function findReplyLink() {
  //
  // http://newyork.craigslist.org/mnh/sub/1107816961.html
  //
  var loc = document.location + '';
  if (!loc.match(/http.*\/\d+.html/)) {
    return null;
  }
  var as = document.getElementsByTagName('A');
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (!a.href.match(/^mailto.*/)) {
      continue;
    }
    return a;
  }
  return null;
}

function addHighlights() {
  //
  // http://newyork.craigslist.org/mnh/sub/
  //
  var loc = document.location + '';
  if (!loc.match(/http.*\/\w\w\w\/\w+\/?$/)) {
    return null;
  }
  var as = document.getElementsByTagName('A');
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (a.href.match(/.*\d+.html/)) {
      var key = PREFIX + a.href;
      var val = GM_getValue(key);
      if (val) {
        a.style.color = '990000';
        a.style.fontWeight = 'bold';
      }
    }
  }
}

function main() {

  // Look for a Reply to: link, if found add some action to record
  // if it's clicked
  var replyLink = findReplyLink();
  if (replyLink) {
    replyLink.addEventListener('click', function() {
        var loc = document.location + '';
        GM_setValue(PREFIX+loc,true);
      }, true);
    return;
  }

  // Otherwise check to see that we're on a listing page, and
  // highlight all the listings to which we've sent messages
  addHighlights();
}

try {main();} catch (e) {if (TESTING) alert(e);}
