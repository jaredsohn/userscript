// ADV Picture Once-inator
// version 1.3
// Release Date: 2010-12-20
// http://bolty.net/from/advrider
// Copyright (c) 2009, Stacy Brock, All Rights Reserved (unless otherwise noted...)
//
// You may modify this script for your own personal use,
// but please contact me first before releasing any changes.
// Don't be an asshat.
//
// ***** INSTRUCTIONS *****
//
// 
// ==UserScript==
// @name           ADV Picture Once-inator
// @namespace      http://bolty.net/from/advrider
// @description    I only needed to see that once, thanks, i.e hide pictures on ADVrider from appearing multiple times on the same page.
//
// @include        http://www.advrider.com/*
// @include        http://advrider.com/*
// ==/UserScript==


/* Querystring class
 *
 * Copyright (c) 2008, Adam Vandenberg
 * All rights reserved.
 * http://adamv.com/dev/javascript/querystring
 *
 * Client-side access to querystring name=value pairs
 * Version 1.3
 * 28 May 2008
 *
 * License (Simplified BSD):
 * http://adamv.com/dev/javascript/qslicense.txt
*/
function Querystring(qs) { // optionally pass a querystring to parse
  this.params = {};

  if (qs == null) qs = location.search.substring(1, location.search.length);
  if (qs.length == 0) return;

  // Turn <plus> back to <space>
  // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
  qs = qs.replace(/\+/g, ' ');
  var args = qs.split('&'); // parse out name/value pairs separated via &

  // split out each name=value pair
  for (var i = 0; i < args.length; i++) {
    var pair = args[i].split('=');
    var name = decodeURIComponent(pair[0]);

    var value = (pair.length==2)
      ? decodeURIComponent(pair[1])
      : name;

    this.params[name] = value;
  }
}

Querystring.prototype.get = function(key, default_) {
  var value = this.params[key];
  return (value != null) ? value : default_;
}

Querystring.prototype.contains = function(key) {
  var value = this.params[key];
  return (value != null);
}
/* end of Querystring class */

/* xpath helper function
 * from http://wiki.greasespot.net/Code_snippets
 */
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
/* end of xpath helper function */

/* Begin ADV Once-inator code */

var advPO = {
  getImages: function () {
    var hostname = window.location.hostname;
    var advImgRE = new RegExp('^http:\/\/'+hostname+'\/forums');
    var awsImgRE = new RegExp('^http:\/\/s3\.amazonaws\.com\/advrider');
    var cloudImgRE = new RegExp('^http:\/\/d26ya5yqg8yyvs\.cloudfront\.net');
    

    var tmpArr = $x("//img", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    tmpArr.forEach(
      function(image) { if (!awsImgRE.test(image.src) && !advImgRE.test(image.src) && !cloudImgRE.test(image.src)) advPO.images.push(image); }
    );
  },
  getToggleLink: function (id, state) {
    return '<a href="#" onClick="toggleADVPic('+id+');return false;">[click to '+state+' pic]</a>';
  },
  images: [],
} // end advPO

// add functions to global window
if (typeof(unsafeWindow) == "undefined") { unsafeWindow = window; }
// I always wanted to write a function called "onceinate"...
unsafeWindow.onceinate = function() {
  var seen = [];

  var counter = 1;
  advPO.images.forEach( function(image) {
      // have we seen this image before?
      if (seen.indexOf(image.src) == -1) {
        // nope, make a note that we saw it
        seen.push(image.src);
      } else {
        // yep, this is a dupe, so hide it
        
        // get parent div...
        var parentDiv = image.parentNode;

        // create div to wrap around image
        var wrapperDiv = document.createElement("div");
        wrapperDiv.id = "advPO_image_" + counter;
        wrapperDiv.appendChild(image.cloneNode(true));
        wrapperDiv.style.display = "none";

        // create div containing visibility toggle
        var toggleDiv = document.createElement("div");
        toggleDiv.id = "advPO_toggle_" + counter;
        toggleDiv.className = "smallfont";
        toggleDiv.innerHTML = advPO.getToggleLink(counter, 'show');

        // add toggle div
        parentDiv.insertBefore(toggleDiv, image);
        // wrap image
        parentDiv.replaceChild(wrapperDiv, image);

        counter++;
      }
    });
}

unsafeWindow.toggleADVPic = function(id) {
  var toggleDiv = document.getElementById('advPO_toggle_' + id);
  var wrapperDiv = document.getElementById('advPO_image_' + id);
  if (wrapperDiv.style.display == "none") {
    wrapperDiv.style.display = "";
    toggleDiv.innerHTML = advPO.getToggleLink(id, 'hide');
  } else {
    wrapperDiv.style.display = "none";
    toggleDiv.innerHTML = advPO.getToggleLink(id, 'show');
  }
}

// get current query string
var queryStr = new Querystring();

// are we even viewing a thread or creating a reply?
if (!queryStr.contains("t") && !queryStr.contains("p")) {
  if (queryStr.get("do") !== 'newreply') {
    // nope, so GTFO
    return;
  }
}

advPO.getImages();
unsafeWindow.onceinate();
