// ==UserScript==
// @name          Gmail - Find Thread in Google Groups
// @namespace     http://dunck.us/code/greasemonkey/
// @description	  Search for Google Group thread.
// @include       *mail.google.com*

// ==/UserScript==

/*
Shamelessly hacked from Aaron Boodman's Forward Thread script.

It works by searching the group for the thread's subject,
ordering by date descending.

#tt is assumed to contain the thread subject, and 
it uses the reply-to for the last message in the thread to get the group
(and ensure it's from a google group).

It probably should be changed to use the mailed-by header instead.

*/


//find the win and doc for the messages.
var main = window.top.frames[0].document;
var win = null;
var iframe;
var vnum = 0;

while (iframe = main.getElementById("v" + ++vnum)) {
  if (iframe.style.left == "0pt") {
    break;
  }
}

if (!iframe) {
  return;
}

var win = iframe.contentWindow;
var doc = win.document;

window.setTimeout(function() { 
  var controlPanel = doc.getElementById("ap");

  if (!controlPanel) { //a heuristic that we're viewing a thread.
    return;
  }

  var div = doc.getElementById("gm-ggs"); //replace if it already exists.

  if (div) {
    div.parentNode.removeChild(div);
  }

  div = doc.createElement("DIV");
  div.id = "gm-ggs";
  div.innerHTML = "<span class='l'><img src='chrome://greasemonkey/content/status_on.gif' class='ai'>&nbsp;<u>Find GGroup Thread</u></span>";
  div.style.marginTop = "5px"; 
  controlPanel.appendChild(div);
  
  var u = div.getElementsByTagName("u")[0];
  u.addEventListener("click", findThread, false);
}, 500); //wait a bit for the thread to render.

function getLastMsg() { //grabbing the last msg to get the group later.
  var msgs = xpath("//*[@id='msgs']//*[@class='msg']");
  return msgs.snapshotItem(msgs.snapshotLength-1); 
} 

function ensureDetails() { //forces the details of the message to be shown
  var msg = getLastMsg();  // this is simpler (and probly more stable) than
                           // using the thread's js objs (if any).
  var divs = msg.getElementsByTagName('div');
  var i,l;
  for (i=0,l=divs.length;i<l;i++) {
    if (divs[i].textContent == 'show details') { //details weren't shown, so 
      fireEvent(divs[i], "mousedown");           //force them to be shown and
      setTimeout(findThread, 500);               // try again in a bit.
      return false;
    } 
  }
  return msg;
}

function findThread() {
  var group = "";
  var msg;

  if (!(msg = ensureDetails())) { //make sure we have the details.
    return;
  }

  //grab the first header w/ a generic value, assumed to be reply-to.
  //fixme: change to find tr with td class hn w/ content "mailed-by"
  //  then grab the value for that header instead.  fall back to reply-to if no mailed-by.
  var replyTo = xpath("//*[contains(concat(' ', @class, ' '),' hw ') and contains(concat(' ', @class, ' '),' hv ')]", msg).snapshotItem(0).textContent;

  if (-1 == replyTo.indexOf('@googlegroups.com')) {
    alert("This isn't a googlegroups.com thread.");
    return;
  } else {
    group = replyTo.split('@')[0];
  }


  //open a new tab to do the search.
  var threadSearchUrl = ["http://groups-beta.google.com/group/",
                         group,
                         "/search?start=0&scoring=d&q="].join('');
  threadSearchUrl += '"' + escape(doc.getElementById('tt').firstChild.textContent) + '"';
  GM_openInTab(threadSearchUrl);
}

function xpath(query,root) {
  if (!root) {
    root=doc;
  }
  return doc.evaluate(query, root, null,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function fireEvent(node, evType) {
  var ev = doc.createEvent("MouseEvents");
  ev.initMouseEvent(evType, true, true, win, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
  node.dispatchEvent(ev);
}

