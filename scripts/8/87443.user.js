// ==UserScript==
// @name OTN Thread Read Marks
// @version 0.6
// @namespace http://userscripts.org/users/128116
// @description Indicates if a given thread was read before on the current browser.
// @include http://forums.oracle.com/forums/forum.jspa?*
// @include http://forums.oracle.com/forums/category.jspa?*
// @include http://forums.oracle.com/forums/thread.jspa?*
// ==/UserScript==

// Copyright (c) 2010 Joachim Sauer
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

(function() {

now = new Date();

buildLinkToFunc = function(label, func) {
  var a = document.createElement('a');
  a.setAttribute('href','#');
  a.addEventListener('click', func, true);
  a.appendChild(document.createTextNode(label));
  return a;
}

buildLinkDiv = function() {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode('[ '));
  for (var i=0; i<links.length; i++) {
    if (i!=0) {
      div.appendChild(document.createTextNode(' | '));
    }
    var link=links[i];
    div.appendChild(buildLinkToLinkInsertion(link[0], link[1], link[2]));
  }
  div.appendChild(document.createTextNode(' ]'));
  return div;
}

getThreadID = function(url) {
  var re = new RegExp('threadID=([0-9]+)($|&)')
  var reMatch = re.exec(url)
  if (reMatch == null) {
    throw 'No threadID found in URL ' + url;
    return;
  }
  return parseInt(reMatch[1]);
}

visitThread = function() {
  var threadURL = document.evaluate("//a[@title='Permlink']/@href", document, null, XPathResult.STRING_TYPE, null).stringValue;
  var threadID = getThreadID(threadURL);
  var nobrNodes = document.evaluate("//table//div[@class='jive-message-list']//tr/td/nobr", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var nobrNode
  var replyCount = null;
  var re = new RegExp('Replies:\\s+([0-9]+)');
  while (nobrNode = nobrNodes.iterateNext()) {
    reMatch = re.exec(nobrNode.textContent);
    if (reMatch != null) {
      replyCount=parseInt(reMatch[1]);
      break;
    }
  }
  if (replyCount == null) {
    GM_log('No reply count found for thread ' + threadID + '!')
    return;
  }
  GM_log('Visiting thread ' + threadID + ' with ' + replyCount + ' replies');
  newData = {
    replyCount: replyCount,
    readCount: replyCount,
    lastSeen: now
  }
  setThreadData(threadID, newData);
}

recordThreads = function() {
  var threadTRs = document.evaluate("//div[@class='jive-thread-list']//table//tr[td/@class='jive-msg-count']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
  var states = new Array();
  var seen = 0;
  var thread;
  while (thread = threadTRs.iterateNext()) {
    seen++;
    var state = recordThread(thread);
    if (state!=null) {
      if (states[state]==null) {
        states[state]=new Array();
      }
      states[state].push(thread)
    }
  }
  GM_log('Got ' + seen + ' threads');
  for (var state in states) {
    var threads = states[state];
    GM_log(threads.length + ' threads are in state ' + state);
    for (var i=0; i < threads.length; i++) {
      var thread = threads[i];
      var markImg = document.evaluate("td/div[@class='jive-bullet']/img", thread, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
      markImg.src='images/' + state + '-16x16.gif';
      markImg.alt=state;
      markImg.title=state;
    }
  }
}

setThreadData = function(threadID, data) {
  localStorage.setItem(threadID, JSON.stringify(data));
}

getThreadData = function(threadID) {
  var data;
  try {
    data = localStorage.getItem(threadID);
    if (data == null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  } catch (e) {
    GM_log('Failed to parse data for thread ' + threadID + ': <' + data + '> with error: ' + e);
    localStorage.removeItem(threadID);
    return null;
  }
}

recordThread = function(thread) {
  try {
    var threadURL = document.evaluate("td[@class='jive-thread-name']/a/@href", thread, null, XPathResult.STRING_TYPE, null).stringValue;
    var threadID = getThreadID(threadURL);
    var replyCount = parseInt(document.evaluate("td[@class='jive-msg-count']/text()", thread, null, XPathResult.STRING_TYPE, null).stringValue);
    var oldData = getThreadData(threadID);
    var readCount = (oldData == null) ? null : oldData.readCount;
    newData = {
      replyCount: replyCount,
      readCount: readCount,
      lastSeen: now
    }
    setThreadData(threadID, newData);
    var state;
    if (readCount == null) {
      state = "unread";
    } else if (readCount < replyCount) {
      state = "updated";
    } else {
      state = "read";
    }
    return state;
  } catch (e) {
    GM_log('Failed to handle thread: ' + e);
    GM_log('Input: ' + thread);
    return null
  }
}

init = function() {
  try {
  if (document.URL.indexOf('thread.jspa') != -1) {
    visitThread();
  } else {
    recordThreads();
  }
  } catch (e) { GM_log(e); }
}

init();

})();