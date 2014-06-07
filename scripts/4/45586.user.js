// ADV Ride Report De-crufter
// version 2.0
// Release Date: 2011-08-17
// http://bolty.net/from/advrider
// Copyright (c) 2009-2011, Stacy Brock, All Rights Reserved (except where
// otherwise noted)
//
// You may modify this script for your own personal use,
// but please contact me first before releasing any changes.
// Don't be an asshat.
//
// ***** INSTRUCTIONS *****
//
// This is a Greasemonkey user script.
//
// To use this script, get Greasemonkey: http://greasemonkey.mozdev.org/
// After you've installed it, come back to this page. A dialog box will
// appear asking you if you want to install this script. Believe me, you do.
//
// To uninstall, go to Tools->Greasemonkey->Manage User Scripts, select
// "ADV Ride Report De-crufter" from the list on the left, and click
// Uninstall.
//
// 
// ==UserScript==
// @name           ADV Ride Report De-crufter
// @namespace      http://bolty.net/from/advrider
// @description    Remove cruft from ride reports on ADVRider, i.e. only show posts from the member who started the thread.
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


/* xpath helper
 * http://wiki.greasespot.net/Code_snippets#XPath_helper
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
  if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
  var temp=document.evaluate(x,node,null,type,null); //evaluate!
  if (fix)
    switch(type) {                   // automatically return special type
  case 1:return temp.numberValue;
  case 2:return temp.stringValue;
  case 3:return temp.booleanValue;
  case 8:return temp.singleNodeValue;
  case 9:return temp.singleNodeValue;
  }
  return fix ? toAr(temp) : temp;
}


/* begin de-crufter code... */

var advRR = {
  preload: function() {
    var styleselect = $x("//select[@name='styleid']", XPathResult.ANY_UNORDERED_NODE_TYPE);
    //GM_log(styleselect.options[styleselect.selectedIndex].value);
    advRR.style = styleselect.options[styleselect.selectedIndex].value;
  },
  showOptionsDiv: function() {
    // get current settings, if any
    var settings = GM_getValue(advRR.getThreadId(), false);
    if (settings) {
      settings = settings.split(/:/);
      advRR.author = settings[0];
      advRR.filter = (settings[1] == "1" ? true : false);
      var op_username = settings[0];
      var advRR_chk = (settings[1] == "1" ? "checked " : "");
    } else {
      // are we on the first page?
      if (advRR.isFirstPage()) {
        // this is the first page, so get the thread author from the first post
        if (advRR.style == 21) {
          var result = $x("//div[@class='dg-post-user-name']/a", XPathResult.FIRST_ORDERED_NODE_TYPE);
        } else {
          var result = $x("//*[@class='bigusername']", XPathResult.FIRST_ORDERED_NODE_TYPE);
        }
        var op_username = result.textContent;
        var advRR_chk = "";
      } else {
        // on a subsequent page, and we have no saved settings, so GTFO
        return;
      }
    }

    if (typeof(op_username) != "undefined") {
      var newNode = document.createElement("div");
      var innerHTML = "only show <strong>" + op_username + "</strong>'s posts? <input type='checkbox' name='advRR_chk_show' " + advRR_chk + "onclick='return advRRToggle(\"" + op_username + "\");'>";
      newNode.innerHTML = innerHTML;

      if (advRR.style == 21) {
        var target = $x("/html/body/div/div[7]/div/div/div/table[2]/tbody/tr/td", XPathResult.ANY_UNORDERED_NODE_TYPE);
      } else {
        var target = $x("/html/body/div/div/div/table[2]//tr/td[1]", XPathResult.ANY_UNORDERED_NODE_TYPE);
      }
      target.appendChild(newNode); 
    }
  },
  getPosts: function () {
    advRR.posts = $x("//table[contains(@id, 'post')]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  },
  getThreadId: function () {
    if (tId = queryStr.get("t")) {
      return tId;
    } else if(queryStr.contains("p")) {
      if (advRR.style == 21) {
        var nav = $x("//div[@class='dg-pagenav-pages']/a", XPathResult.FIRST_ORDERED_NODE_TYPE);
        var navHref = nav.href;
      } else {
        var nav = $x("//div[@class='pagenav']/table/tbody/tr/td[2]", XPathResult.FIRST_ORDERED_NODE_TYPE);
        var navHref = nav.firstChild.href;
      }
      matches = /t=(\d+)$/.exec(navHref);
      GM_log(matches[1]);
      return matches[1];
    }
  },
  isFirstPage: function () {
    if (/Page\s(\d+)\s-\sADVrider/.test(document.title)) {
      return false;
    } else {
      return true;
    }
  },
  showError: function (message) {
    var newNode = document.createElement("div");
    newNode.innerHTML = message;
    if (advRR.style == 21) {
      var target = $x("/html/body/div/div[7]/div/div/div/table[2]/tbody/tr/td", XPathResult.ANY_UNORDERED_NODE_TYPE);
    } else {
      var target = $x("/html/body/div/div/div/table[2]//tr/td[1]", XPathResult.ANY_UNORDERED_NODE_TYPE);
    }
    target.appendChild(newNode);
  },
  setGMOption: function (key, value) {
    window.setTimeout( function() { GM_setValue(key, value) }, 0);
  },
style: 0,
author: "",
filter: false,
posts: []
} // end advRR

// add functions to global window
if (typeof(unsafeWindow) == "undefined") { unsafeWindow = window; }
unsafeWindow.deCruftify = function() {
  for (var i=0 ; i < advRR.posts.length; i++) {
    var post = advRR.posts[i];

    var match = post.id.match(/post(\d+)/);
    if (match == null) {
        continue;
    } else {
        var post_id = match[1];
    }

    var postmenu = document.getElementById("postmenu_" + post_id);
    rexp = new RegExp(advRR.author);
    if (advRR.style == 21) {
      if (!rexp.test(postmenu.children[1].textContent)) {
        if (advRR.filter) {
          post.style.display = "none";

        } else {
          post.style.display = "";
        }
      }
    } else {
      if (!rexp.test(postmenu.textContent)) {
        if (advRR.filter) {
          post.parentNode.parentNode.parentNode.style.display = "none";
        } else {
          post.parentNode.parentNode.parentNode.style.display = "";
        }
      }
    }
  }
}

unsafeWindow.advRRToggle = function(username) {
  var advRR_chk_show = $x("//input[@name='advRR_chk_show']", XPathResult.FIRST_ORDERED_NODE_TYPE);

  var doSave = false;

  // get query string
  var queryStr = new Querystring();

  // are we on the first page?
  if (advRR.isFirstPage()) {
    // yes, so save the settings via GM persistent data mechanism
    doSave = true;
  }

  if (advRR_chk_show.checked) {
    if (doSave) {
      advRR.setGMOption(queryStr.get("t"), username + ":1");
      advRR.author = username;
    }
    advRR.filter = true;
  } else {
    if (doSave) {
      advRR.setGMOption(queryStr.get("t"), username + ":0");
      advRR.author = username;
    }
    advRR.filter = false;
  }

  // refresh display of posts
  unsafeWindow.deCruftify();
}

// This script requires the GM_getValue function implemented in GM 0.3 or above
if(GM_getValue) { 
  // get current query string
  var queryStr = new Querystring();

  // are we even viewing a thread?
  if (queryStr.contains("t") || queryStr.contains("p")) {
    if (queryStr.get("do") == "newreply") {
      return;
    }
    // yep
  } else {
    // nope, so GTFO
    return;
  }

  advRR.preload();
  advRR.getPosts();
  advRR.showOptionsDiv();
  unsafeWindow.deCruftify();
} else {
  advRR.showError("ADV de-cruft error: GreaseMonkey version 0.3 or higher required");
}

