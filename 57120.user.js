// FlickrNav user script
// 2009-09-04
// Copyright (c) 2009, Joy Dutta
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          FlickrNav
// @version 	  0.1
// @namespace     http://joydutta.com/blog
// @description   Arrow key navigation of flickr photostream
// @include       http://www.flickr.com/photos/*
// ==/UserScript==

(function() {
  var uw = unsafeWindow;
  var inputHasFocus = false;
  var nextprev = uw.YAHOO.util.Dom.getElementsByClassName("nextprev_contextThumbsDiv");
  var nextprevlinks = uw.YAHOO.util.Dom.getElementsBy(function(x){return true;}, "a", nextprev[0])
  // uw.console.log("hi");
  
  // can use YUI since flickr has YUI
  /*
  if(uw.document.addEventListener) { //code for Moz 
    uw.document.addEventListener("keydown", keyCapt, false); 
  } 
  */
  uw.YAHOO.util.Event.addListener(uw.document, "keydown", function(ev) {
    // uw.console.log("input has focus: " + inputHasFocus);
    if(inputHasFocus) { return; }

    if(ev.keyCode === 37) {  // left arrow
      var href = nextprevlinks[0].href;
      if(href) { location.href = href; }
      // if(uw.console) { uw.console.log("left href:" + href); }
    } else if(ev.keyCode === 39) { // right arrow
      var href = nextprevlinks[1].href;
      if(href) { location.href = href; }
      // if(uw.console) { uw.console.log("right href:" + href); }
    }
  });

  uw.YAHOO.util.Event.addListener(uw, "load", function(ev) {
    var ta = uw.YAHOO.util.Dom.get("message");
    uw.YAHOO.util.Event.addListener(ta, "focus", function(){ inputHasFocus = true; });
    uw.YAHOO.util.Event.addListener(ta, "blur", function(){ inputHasFocus = false; });
  });
}());
