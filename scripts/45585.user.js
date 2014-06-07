// ADV Ride Report De-crufter (IE Edition)
// version 1.0
// Release Date: 2009-03-29
// http://bolty.net/from/advrider
// Copyright (c) 2009, Stacy Brock, All Rights Reserved (unless otherwise noted...)
//
// You may modify this script for your own personal use,
// but please contact me first before releasing any changes.
// Don't be an asshat.
//
// ***** INSTRUCTIONS *****
//
// This is an IE7Pro user script.
//
// To use this script, get IE7Pro: http://www.ie7pro.com
//
// Next, save this script to your computer. You should now have a file
// called "adv_ride_report_de-cruft.ieuser.js". Copy this file to
// C:\Program Files\IEPro\userscripts
// Now, start up IE and go to Tools->IE7Pro Preferences. Click on "User
// Scripts" from the list on the left. Make sure the checkboxes next to
// "Enable User Scripts" and "ADV Ride Report De-Crufter (IE Edition)"
// are CHECKED. Click Ok and you should be good to go.
//
// To uninstall, go to Tools->IE7Pro Preferences, click on "User Scripts"
// in the list on the left, select "ADV Ride Report De-crufter" from the
// list, and click Uninstall.
//
// 
// ==UserScript==
// @name           ADV Ride Report De-crufter (IE Edition)
// @namespace      http://bolty.net/from/advrider
// @description    Remove cruft from ride reports on ADVRider, i.e. only show posts from the member who started the thread.
//
// @include        http://www.advrider.com/*
// @include        http://advrider.com/*
// ==/UserScript==

(function() {

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

/*
 Developed by Robert Nyman, http://www.robertnyman.com
 Code/licensing: http://code.google.com/p/getelementsbyclassname/
 */
var getElementsByClassName = function (className, tag, elm){
  if (document.getElementsByClassName) {
    getElementsByClassName = function (className, tag, elm) {
      elm = elm || document;
      var elements = elm.getElementsByClassName(className),
	  nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
	  returnElements = [],
	  current;
      for(var i=0, il=elements.length; i<il; i+=1){
	current = elements[i];
	if(!nodeName || nodeName.test(current.nodeName)) {
	  returnElements.push(current);
	}
      }
      return returnElements;
    };
  }
  else if (document.evaluate) {
    getElementsByClassName = function (className, tag, elm) {
      tag = tag || "*";
      elm = elm || document;
      var classes = className.split(" "),
	  classesToCheck = "",
	  xhtmlNamespace = "http://www.w3.org/1999/xhtml",
	  namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
	  returnElements = [],
	  elements,
	  node;
      for(var j=0, jl=classes.length; j<jl; j+=1){
	classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
      }
      try	{
	elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
      }
      catch (e) {
	elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
      }
      while ((node = elements.iterateNext())) {
	returnElements.push(node);
      }
      return returnElements;
    };
  }
  else {
    getElementsByClassName = function (className, tag, elm) {
      tag = tag || "*";
      elm = elm || document;
      var classes = className.split(" "),
	  classesToCheck = [],
	  elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
	  current,
	  returnElements = [],
	  match;
      for(var k=0, kl=classes.length; k<kl; k+=1){
	classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
      }
      for(var l=0, ll=elements.length; l<ll; l+=1){
	current = elements[l];
	match = false;
	for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
	  match = classesToCheck[m].test(current.className);
	  if (!match) {
	    break;
	  }
	}
	if (match) {
	  returnElements.push(current);
	}
      }
      return returnElements;
    };
  }
  return getElementsByClassName(className, tag, elm);
};
/* end ultimate getElementsByClassName code */


var advRR = {
showOptionsDiv: function() {
		  // get current settings, if any
		  var settings = PRO_getValue(queryStr.get("t"), false);
		  if (settings) {
		    settings = settings.split(/:/);
		    advRR.author = settings[0];
		    advRR.filter = (settings[1] == "1" ? true : false);
		    var op_username = settings[0];
		    var advRR_chk = (settings[1] == "1" ? "checked " : "");
		  } else {
		    // are we on the first page?
		    if (!queryStr.contains("page") || queryStr.get("page") == "1") {
		      // this is the first page, so get the thread author from the first post
		      var allLinks = document.getElementsByTagName("a");
		      for (var i=0; i < allLinks.length; i++) {
			if (allLinks[i].className == "bigusername") {
			  var op_username = allLinks[i].innerHTML;
			  break;
			}
		      }
		      var advRR_chk = "";
		    } else {
		      // on a subsequent page, and we have no saved settings, so GTFO
		      return;
		    }
		  }

		  if (typeof(op_username) != "undefined") {
		    var tmpTDs = getElementsByClassName("smallfont", "td");
		    var navTD = tmpTDs[0];

		    var newNode = document.createElement("div");
		    var innerHTML = "only show <strong>" + op_username + "</strong>'s posts? <input type='checkbox' name='advRR_chk_show' " + advRR_chk + "onclick='return advRRToggle(\"" + op_username + "\");'>";
		    newNode.innerHTML = innerHTML;
		    navTD.appendChild(newNode);
		  }
		},
getPosts: function () {
	    var allTables = document.getElementsByTagName('table');
	    for (var i=0; i < allTables.length; i++) {
	      if (/^post/.test(allTables[i].id)) {
		advRR.posts.push(allTables[i]);
	      }
	    }
	  },
author: "",
filter: false,
posts: []
} // end advRR

// add functions to global window
if (typeof(unsafeWindow) == "undefined") { unsafeWindow = window; }
unsafeWindow.deCruftify = function() {
  if (advRR.author == "") {
    return;
  }
  for (var i=0 ; i < advRR.posts.length; i++) {
    var post = advRR.posts[i];

    var match = post.id.match(/post(\d+)/);
    var post_id = match[1];

    var postmenu = document.getElementById("postmenu_" + post_id);
    rexp = new RegExp(advRR.author);
    if (!rexp.test(postmenu.innerHTML)) {
      if (advRR.filter) {
	post.parentNode.parentNode.parentNode.style.display = "none";
      } else {
	post.parentNode.parentNode.parentNode.style.display = "";
      }
    }
  }
}

unsafeWindow.advRRToggle = function(username) {
  var allInputs = document.getElementsByTagName('input');
  for (var i=0; i < allInputs.length; i++) {
    if (allInputs[i].name == "advRR_chk_show") {
      var advRR_chk_show = allInputs[i];
      break;
    }
  }

  var doSave = false;

  // get query string
  var queryStr = new Querystring();

  // are we on the first page?
  if (!queryStr.contains("page") || queryStr.get("page")=="1") {
    // yes, so save the settings via GM persistent data mechanism
    doSave = true;
  }

  if (advRR_chk_show.checked) {
    if (doSave) {
      PRO_setValue(queryStr.get("t"), username + ":1");
      advRR.author = username;
    }
    advRR.filter = true;
  } else {
    if (doSave) {
      PRO_setValue(queryStr.get("t"), username + ":0");
      advRR.author = username;
    }
    advRR.filter = false;
  }

  // refresh display of posts
  unsafeWindow.deCruftify();
}

// This script requires the PRO_getValue function
if(PRO_getValue) { 
  // get current query string
  var queryStr = new Querystring();

  // are we even viewing a thread?
  if (!queryStr.contains("t")) {
    // nope, so GTFO
    return;
  }

  advRR.getPosts();
  advRR.showOptionsDiv();
  unsafeWindow.deCruftify();
} else {
  alert("ADV de-cruft error: PRO* functions not found");
}

})();
