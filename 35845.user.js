// ==UserScript==
// @name          Annotate web pages
// @namespace     http://jeffpalm.com/annotate/
// @description   Annotates web pages that you view
// @include       http://*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

/** This is the prefix so we can identify our parameters */
var PREFIX = "_x:";

/** Lazily init the dispatchers. */
var dispatchers = null;

/** Message boxes to save to send. */
var mboxes = [];

/** Dispatches on our param 'name' and value 'val' */
function dispatchOnParam(name,val) {
  ds = initDispatchers();
  fn = ds[name];
  if (fn) fn(val);
}

/** 
 * Returns a mapping from commands to lambda(val)
 * Example:
 *   'scroll': function(val) { ... val is of the form x,y ... }
*/
function initDispatchers() {
  if (!dispatchers) {
    /*
     * In describing the dispatchers I give the name of the command
     * and then refer to binding that I pull out.  For example in the
     * scroll example, I'm saying that the value passed in should have
     * the form:
     *
     *    <x> ',' <y>
     *
     * and then I'm refering to the name bindings 'x' and 'y' in the
     * description.
     */
    dispatchers = {
      /*
       * scroll(x,y) : scroll to coords 'x' and 'y'
       */
      'scroll': function(val) {
        coords = val.split(/,/);
        x = coords[0];
        y = coords[1];
        if (x && x>0 && y && y>0) {
          window.scrollTo(x,y);
        }
      },
      /*
       * alert(msg) : alerts message 'msg'
       */
      'alert': function(val) {
        alert(val);
      },
      /*
       * mbox(x,y,msg) : puts 'msg' and location 'x' and 'y'
       */
      'mbox': function(val) {
        parts = val.split(/,/);
        x = parts[0];
        y = parts[1];
        msg = unescape(parts[2]);
        showMessage(msg,x,y);
      }
    };
  }
  return dispatchers;
}

function promptForMbox(e) {

  // Get the point and a message
  var p = newPoint(e);
  var msg = prompt("Please type a message.");
  if (!msg) return;
  
  // Place a box here
  var x = p.getX();
  var y = p.getY();
  showMessage(msg,x,y);

  // Save the message box
  mboxes.push(Mbox(msg,x,y));
}

// --------------------------------------------------
// Misc
// --------------------------------------------------

/**
 * @param mail should we mail this, also?
 */
function reloadWithAnnotations(mail) {

  var loc      = document.location;
  var proto    = loc.protocol;
  var url      = loc.pathname;
  var host     = loc.host;
  var search   = loc.search;
  var hash     = loc.hash;

  // Reconstruct the new search
  var newSearch = search;
  var haveParam = newSearch;
  for (var i=0; i<mboxes.length; i++) {
    var mbox = mboxes[i];
    if (newSearch) {
      newSearch += "&";
    } else {
      newSearch += "?";
    }
    var x = mbox.getX();
    var y = mbox.getY();
    var msg = mbox.getMessage();
    newSearch += PREFIX + "mbox=" + x + "," + y + "," + escape(msg);
    haveParam = true;
  }

  // Construct the new location
  var newLocation = proto + "//" + host + url + newSearch;
  if (hash) newLocation += hash;

  // If we're mailing this link, then add a param saying on the next
  // we'll mail it in stead of simply reloading it
  var theLocation;
  if (mail) {
    theLocation = 'http://jeffpalm.com/annotate/mail.php?tag=1&link=1&url=' + escape(newLocation);
    var to = prompt('Would you like to say to whom you are sending this (this can be blank)?');
    if (to) {
      theLocation += '&to=' + escape(to);
    }
    var from = prompt('Would you like to say who you are (this can be blank, too)?');
    if (from) {
      theLocation += '&from=' + escape(from);
    }
  } else {
    theLocation = newLocation;
  }
  document.location = theLocation;
}

function Mbox(msg,x,y) {
 var _x = x;
  var _y = y;
  var _msg = msg;
  return {
  getX: function() {return _x;},
      getY: function() {return _y;},
      getMessage: function () {return _msg;},
      toString: function() {return _msg + "@" + _x + "," + _y;}
  };
}

/** A Simple 2-d Point with 'x' and 'y' coordinates. */
function Point(x,y,node) {
  var _x = x;
  var _y = y;
  var _node = node;
  return { 
  getX: function() {return _x;},
      getY: function() {return _y;},
      getNode: function () {return _node;},
      toString: function() {return _x + "," + _y;},
      eq: function(other) {
      var x = other.x;
      var y = other.y;
      return x && y && x == _x && y == _y;
    }
  };
}

function newPoint(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft + 
      document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop  + 
      document.documentElement.scrollTop;
	}
  return Point(posx,posy);
}

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
  if (arguments.length > 2) setId(e,arguments[2]);
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

function br(el) {
  var n = $n("br");
  if (el) el.appendChild(n);
  return n;
}

// --------------------------------------------------
// Commands
// --------------------------------------------------

function showMessage(msg,x,y) {
  var box = createMessageBox(x,y);
  $t(msg,box);
  br(box);
  br(box);
  var a = $n("a",box);
  a.href = "#";
  a.innerHTML = "close";
  a.style.fontSize = ".9em";
  a.addEventListener('click', newCloseFunction(box), true);
  return box;
}

function newCloseFunction(box) {
  var _box = box;
  return function(e) {
    _box.parentNode.removeChild(_box);
  };
}

function createMessageBox(x,y) {
  var box = $n("div",document.body);
  box.style.position = "absolute";
  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.backgroundColor = "#FFFF66";
  box.style.color = "#1a1a1a";
  box.style.padding = "10px";
  box.style.border = "1px solid black";
  box.style.width = "250px";
  return box;
}

// --------------------------------------------------
// Main
// --------------------------------------------------

/** Main entry point. */
function main() {
  
  // Search for the parameters
  var paramString = document.location.search;
  
  // Remove the ? and create a list of params
  paramString = paramString.replace(/^\?/,'');
  params = paramString.split(/&/);
  for (var i=0; i<params.length; i++) {
    var pair = params[i].split(/=/);
    var key = pair[0];
    var val = pair[1];
    var iprefix = key.indexOf(PREFIX);
    if (iprefix != 0) continue;
    var name = key.substring(iprefix+PREFIX.length);
    dispatchOnParam(name,val);
  }

  // Add the handler to prompt for a message box
  // and to reload the page with mboxes
  window.addEventListener('dblclick', promptForMbox, true);
  GM_registerMenuCommand("Reload with annotations", reloadWithAnnotations);
  GM_registerMenuCommand("Reload + mail with annotations", function(e) {reloadWithAnnotations(true);});
}

main();
