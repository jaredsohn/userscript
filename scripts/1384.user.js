//  Flickr Group Tracker
//  version 1.0.01
//  2005-04-23
//  Copyright (c) 2005, Sylvan Mably
//  Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
// What it does:
//  Highlights threads in which you've participated in Flickr groups. More info
//  and screenshots at http://www.quasi.ca/flickr/gt/
//
// A few notes:
//  Though this script should work pretty reliably, it hasn't been tested
//  thoroughly. That means you may encounter some bugs or strange behavior. If
//  you have any problems (or suggestions), please send me a FlickrMail. My
//  Flickr username is quas.
//
// Known bugs/issues:
//  - You must visit a topic you've replied to before it can be highlighted.
//    There's nothing I can do about this.
//  - No checking for cookie length limit. After 600 - 700 replies, the reply
//    cookie will be approaching the 4kb limit. After we hit that limit, really
//    weird things could happen. I'm too lazy to fix this now, and besides,
//    it'll take a really long time before anyone starts to approach the limit!
//  - :hover styles aren't preserved when changing the background color of topic
//    links, so I added them back in manually with mouseOvers and mouseOuts.
//  - Lots of other kludges... :)
// ---------------------------------------------------------------------------- 

// ==UserScript==
// @name          Flickr Group Tracker
// @namespace     http://www.quasi.ca/flickr/
// @description   Highlights threads in which you've participated in Flickr groups.
// @include       http://www.flickr.com/recent.gne*
// @include       http://flickr.com/recent.gne*
// @include       http://www.flickr.com/groups/*
// @include       http://flickr.com/groups/*
// @include       http://www.flickr.com/groups_topic*.gne*
// @include       http://flickr.com/groups_topic*.gne*
// ==/UserScript==

// ---------------------------------------------------------------------------- 

// Cookie stuff:

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/; domain=flickr.com";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// ---------------------------------------------------------------------------- 

function highlightLinks() {
  // Reset link highlighting
  unHighlightLinks();

  if (location.href.match(/flickr\.com\/recent\.gne/)) {
    listItems = document.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
        replaceLink(listItems[i]);
    }
  } else if (location.href.match(/flickr.com\/groups\/.+?/) ||
             location.href.match(/flickr.com\/groups\/topic\/[0-9]+/) || 
             location.href.match(/flickr.com\/groups_topics\.gne/) ||
             location.href.match(/flickr.com\/groups_topic\.gne/)) {
    // Ack! Inconsistent capitalization
    document.getElementById("Inbox") ? dTable = document.getElementById("Inbox") : dTable = document.getElementById("InBox");
    for (var i = 1; dTable.childNodes[1].childNodes[i]; i++) {
      if (dTable.childNodes[1].childNodes[i].tagName == "TR") {
        replaceLink(dTable.childNodes[1].childNodes[i]);
      } 
    }
  }
}

function unHighlightLinks() {
  var links = document.getElementsByTagName("A");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.className == "highlightedLink") {
      link.className = null;
      link.style.backgroundColor = "transparent";
      link.title = "";
      link.onmouseover = function() { this.style.backgroundColor = "#0063DC"; };
      link.onmouseout  = function() { this.style.backgroundColor = "transparent"; };
    }
  }
}

function replaceLink(el) {
  if (el.innerHTML.match(/<a href="\/?groups\/topic\/([0-9]+)\/(page[0-9]+\/)?"/)) {
    var threadID = RegExp.$1;
    var pageNum = RegExp.$2;
    if (highlightingIsOn(threadID)) {
      var threadMatch = new RegExp('<a href="/?groups/topic/' + threadID + '/' + pageNum + '"');
    }
  } else if (el.innerHTML.match(/<a href="groups_topic\.gne\?id=([0-9]+)"/)) {
    var threadID = RegExp.$1;
    var pageNum = "";
    if (highlightingIsOn(threadID)) {
      var threadMatch = new RegExp('<a href="groups_topic\.gne.id=' + threadID + '"');
    }
  }
  
  if (threadMatch) {
    // I'm not sure how to leave the :hover styles intact while changing the
    // background color via an inline style. For now, I'm putting a "fake" JS
    // hover effect on any modified elements
    var linkColor = generateLinkColor(threadID);
    var linkTitle = generateLinkTitle(threadID);
    el.innerHTML = el.innerHTML.replace(threadMatch,
    '<a href="/groups/topic/' + threadID + '/' + pageNum + '"' +
    ' style="background-color: ' + linkColor + ';"' +
    ' title="' + linkTitle + '"' +
    ' class="highlightedLink"' +
    ' onmouseover="this.style.backgroundColor = \'#0063DC\'"' +
    ' onmouseout="this.style.backgroundColor = \'' + linkColor + '\'"');
  }
}

function highlightingIsOn(threadID) {
  return (inTrackList(threadID)) ||
         (inThreadList(threadID) &&
          !inIgnoreList(threadID));
}

function generateLinkColor(threadID) {
  if (inTrackList(threadID)) {
    return "#FFDDDD";
  } else if (inThreadList(threadID) && !inIgnoreList(threadID)) {
    return "#FFFAAA";
  } else {
    return "transparent";
  }
}

function generateLinkTitle(threadID) {
  if (inTrackList(threadID)) {
    return "You're tracking this thread";
  } else if (inThreadList(threadID) && !inIgnoreList(threadID)) {
    return "You've posted in this thread";
  } else {
    return false;
  }
}

function inThreadList(threadID) {
  var threadCookie = readCookie(username + "Threads");
  return inCookie(threadCookie, threadID);
}

function inIgnoreList(threadID) {
  var ignoreCookie = readCookie(username + "Ignore");
  return inCookie(ignoreCookie, threadID);
}

function inTrackList(threadID) {
  var trackCookie = readCookie(username + "Track");
  return inCookie(trackCookie, threadID);
}

function inCookie(cookieText, threadID) {
  if (cookieText) {
    var threads = cookieText.split(",");
    for (var i = 0; i < threads.length; i++) {
      if (threads[i] == threadID) {
        return true;
      }
    }
  }
  return false;
}

function addThread(threadID) {
  var replyCookie = username + "Threads";
  addToCookie(replyCookie, threadID);
}

function ignoreThread(threadID) {
  var ignoreCookie = username + "Ignore";
  addToCookie(ignoreCookie, threadID);
}

function trackThread(threadID) {
  var trackCookie = username + "Track";
  addToCookie(trackCookie, threadID);
}

function unIgnore(threadID) {
  var ignoreCookie = username + "Ignore";
  deleteFromCookie(ignoreCookie, threadID);
}

function unTrack(threadID) {
  var trackCookie = username + "Track";
  deleteFromCookie(trackCookie, threadID);
}

function addToCookie(cookieName, newThread) {
  var threads = readCookie(cookieName);
  if (threads) {
    // Check to see whether the thread is already in the cookie. If so, don't
    // store it again
    if (!inCookie(threads, newThread)) {
      createCookie(cookieName, threads + "," + newThread, 90);
    }
  } else {
    createCookie(cookieName, newThread, 90);
  }
}

function deleteFromCookie(cookieName, oldThread) {
  var threads = readCookie(cookieName);
  if (threads && inCookie(threads, oldThread)) {
    threads = threads.split(",");
    // Delete the thread from the array, brute force style! :)
    var found = false;
    for (var i = 0; i < threads.length; i++) {
      if (threads[i] == oldThread) {
        found = true;
      }
      if (found && threads[i + 1]) {
        threads[i] = threads[i + 1];
      }
    }
    threads.pop();
    threads = threads.join(",");
    createCookie(cookieName, threads, 90);
  }
}

function findMyPosts(threadID) {
  for (var i = 0; document.getElementsByTagName("H4")[i]; i++) {
    urlMatch = new RegExp("<a href=\"/photos/" + username + "/\">");
    if (document.getElementsByTagName("H4")[i].innerHTML.match(urlMatch)) {
      unTrack(threadID);
      addThread(threadID);
      break;
    }
  }
}

function addThreadToggleBefore(el) {
  var cBox = document.createElement("input");
  cBox.setAttribute("type", "checkbox");
  if (highlightingIsOn(threadID)) {
    cBox.setAttribute("checked", "checked");
  }
  cBox.setAttribute("id", "cBox");
  // Fix some ugly alignment issues
  cBox.setAttribute("style", "margin-bottom: 1px;");
  cBox.setAttribute("onchange", "toggleHighlighting()");
  var cBoxLabel = document.createElement("label");
  cBoxLabel.setAttribute("id", "cBoxLabel");
  cBoxLabel.setAttribute("for", "cBox");
  cBoxLabel.appendChild(document.createTextNode("Highlight this thread"));
  var pContainer = document.createElement("p");
  pContainer.setAttribute("style", "margin: -12px 0 5px 5px;");
  pContainer.appendChild(cBox);
  pContainer.appendChild(cBoxLabel);
  // Write the checkbox code to the document
  el.parentNode.insertBefore(pContainer, el);
}

function addViewToggleAfter(el) {
  var cBox = document.createElement("input");
  cBox.setAttribute("type", "checkbox");
  if (!hideHighlighting) {
    cBox.setAttribute("checked", "checked");
  }
  cBox.setAttribute("id", "cBox");
  // Fix some ugly alignment issues
  cBox.setAttribute("style", "margin-bottom: 1px;");
  cBox.setAttribute("onchange", "toggleHighlightingDisplay()");
  var cBoxLabel = document.createElement("label");
  cBoxLabel.setAttribute("id", "cBoxLabel");
  cBoxLabel.setAttribute("for", "cBox");
  cBoxLabel.appendChild(document.createTextNode("Show highlighting"));
  var pContainer = document.createElement("p");
  pContainer.setAttribute("style", "margin: 0;");
  pContainer.appendChild(cBox);
  pContainer.appendChild(cBoxLabel);
  // Write the checkbox code to the document
  el.appendChild(pContainer);
}

function toggleHighlighting() {
  if (document.getElementById("cBox").checked) {
    if (inIgnoreList(threadID)) {
      unIgnore(threadID);
    } else if (!inTrackList(threadID)) {
      trackThread(threadID);
    }
  } else {
    if (inTrackList(threadID)) {
      unTrack(threadID);
    } else if (inThreadList(threadID)) {
      ignoreThread(threadID);
    }
  }
  highlightLinks();
}

function toggleHighlightingDisplay() {
  if (document.getElementById("cBox").checked) {
    createCookie(username + "Hidden", "false", -1);
    highlightLinks();
  } else {
    createCookie(username + "Hidden", "true", 90);
    unHighlightLinks();
  }
}

// ---------------------------------------------------------------------------- 

(
function() {
  username = document.getElementsByTagName("P")[0].childNodes[1].childNodes[1].href.split("/")[4];
  hideHighlighting = readCookie(username + "Hidden");

  if (location.href.match(/flickr.com\/groups\/topic\/([0-9]+)/) ||
      location.href.match(/flickr.com\/groups_topic\.gne.id=([0-9]+)/)) {
    threadID = RegExp.$1;
    findMyPosts(threadID);
  }

  if (!hideHighlighting) {
    highlightLinks();
  }
  
  if (location.href.match(/flickr.com\/groups\/topic\/[0-9]+/) || 
      location.href.match(/flickr.com\/groups_topic\.gne/) && dTable) {
    addThreadToggleBefore(dTable);
  } else if (location.href.match(/flickr\.com\/recent\.gne/)) {
    addViewToggleAfter(document.getElementById("Hint"));
  }

  // Uncomment to reset thread list, ignore list, and track list:
  // createCookie(username + "Threads", "", -1);
  // createCookie(username + "Ignore", "", -1);
  // createCookie(username + "Track", "", -1);
}
)();
