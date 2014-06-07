// ==UserScript==
// @name          	saidit
// @description   	Emphasizes unread comments on reddit.com.
// @include       	http://*.reddit.com/*comments/*
// @version       	0.4
// ==/UserScript==

//
// Copyright (C) 2009 Chromakode
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

var PROFILE = false;
if (PROFILE) {
  var startTime = Date.now();
}

//
// === Globals ===
//

// Keep SLOT_COUNT "slots" for seen comment storage, freeing storage of the oldest slot if none are empty.
// This prevents disk storage from slowly creeping up for hardcore redditors.
const SLOT_COUNT = 2500;

var pageThingID = getThingID(getPageThing());
if (!pageThingID) { return; } // Bail if for some reason we can't get an id for the page

var localStorage;
if (!localStorage) {
  localStorage = globalStorage.namedItem(window.location.hostname);
}
var seenArray = [];
var seenObject = {};

//
// === Utility functions ===
//
function getChildByClassName(element, className) {
  var res = element.ownerDocument.evaluate('descendant::*[contains(concat(" ",normalize-space(@class), " "), " '+className+' ")]', element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return res.singleNodeValue;
}

function getThingID(thingElement) {
  var match;
  match = match || thingElement.className.match(/\s*id-(\S+)\s*/); // New method
  match = match || thingElement.id.match(/thingrow\_(\S+)/); // Old method
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

function getPageThing() {
  return document.getElementsByClassName("link")[0] || document.getElementsByClassName("linkcompressed")[0];
}

function isCollapsed(commentElement) {
  var collapsed = getChildByClassName(commentElement, "collapsed");
  return collapsed.style.display != "none";
}

function isVisible(element) {
  return element.clientHeight != 0;
}

function eachWithClass(cls, callback, parent) {
  if (parent === undefined) { parent = document }
  var comments = parent.getElementsByClassName(cls);
  
  Array.prototype.forEach.call(comments, function(commentElement) {
    callback(commentElement);
  });
}

function eachComment(callback, parent) {
  eachWithClass("comment", callback, parent);
}

//
// === Main logic functions ===
//
function loadSeen() {
  var seenData = localStorage.getItem("seen-"+pageThingID);
  // XXX Strangely, if you remove a Storage item in another tab, it ends up as "" in the other tab, and if removed, remains as "". Bug in Mozilla code?
  if (seenData == null || seenData == "") {
    // No stored seen comment data
    var slot = (GM_getValue("lastSlot", -1) + 1) % SLOT_COUNT;
    
    // Free the slot, if filled
    var oldID = GM_getValue("slot-"+slot);
    if (oldID !== undefined) {
      localStorage.removeItem("seen-"+oldID);
    }
    
    GM_setValue("slot-"+slot, pageThingID);
    GM_setValue("lastSlot", slot);
  } else {
    // Load the seen data
    seenArray = seenData.value.split(",");
    
    // Build an object for faster access
    seenArray.forEach(function(element) {
      seenObject[element] = true;
    });
  }
}

function saveSeen() {
  localStorage.setItem("seen-"+pageThingID, seenArray.join(","));
}

function checkComment(commentElement) {
  if (isVisible(commentElement)) {
    if (isCollapsed(commentElement)) {
    
      // When a collapsed element is expanded, check it and its children.
      var expand = getChildByClassName(commentElement, "expand");
      function update() {
        expand.removeEventListener("click", update, false);
        checkComment(commentElement);
        eachComment(checkComment, commentElement);
      }
      expand.addEventListener("click", update, false);
      
    } else {
    
      // The comment is visible and not collapsed.
      // Display it as unread, and mark it as read.
      var commentID = getThingID(commentElement);
      if (seenObject[commentID] != true) {
        commentElement.className += " unread";
        seenArray.push(commentID);
      }
      
    }
  }
}

//
// === Main ===
//
loadSeen();
eachComment(checkComment);
saveSeen();

GM_addStyle(".comment.unread .tagline { font-weight:bold; background-color:#fea; display:inline; }");

document.addEventListener("DOMNodeInserted", function(e) {
  if (e.target.className && e.target.className.match(/comment/)) {
    checkComment(e.target);
  }
}, false);

window.addEventListener("beforeunload", function() {
  saveSeen();
}, true);

if (PROFILE) {
  var endTime = Date.now();
  alert((endTime - startTime) + " ms");
}
