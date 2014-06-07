// ==UserScript==
// @name          Gmail - Forward Thread
// @namespace     http://youngpup.net/userscripts
// @description	  Forward an entire thread
// @include       *mail.google.com*

// ==/UserScript==

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

if (!controlPanel) {
  return;
}

var div = doc.getElementById("gm-ft");

if (div) {
  div.parentNode.removeChild(div);
}

div = doc.createElement("DIV");
div.id = "gm-ft";
div.innerHTML = "<span class='l'><img src='chrome://greasemonkey/content/status_on.gif' class='ai'>&nbsp;<u>Forward Thread</u></span>";
div.style.marginTop = "5px"; 
controlPanel.appendChild(div);

var u = div.getElementsByTagName("u")[0];
u.addEventListener("click", forwardThread, false);

}, 500);

var lastNumForwardLinks;

function forwardThread() {
  var expandAllWrap = doc.getElementById("ec");
  var expandAllImg = expandAllWrap.getElementsByTagName("img")[0];
  if (expandAllImg && expandAllImg.src.indexOf("expand") > -1) {
    lastNumForwardLinks = xpath("//td[@id='sm_4']").snapshotLength;
    GM_log(lastNumForwardLinks);
    fireEvent(expandAllWrap.getElementsByTagName("u")[0], "mousedown");
    window.setTimeout(checkForwardLinks, 500);
    return;
  }
  
  var forwardLinks = xpath("//td[@id='sm_4']");
  for (var i = 0; i < forwardLinks.snapshotLength; i++) {
    var link = forwardLinks.snapshotItem(i);
    fireEvent(link, "mousedown");
  }

  var boxen = xpath("//textarea[@class='tb']");
  var msg = [];

  for (var i = boxen.snapshotLength - 1; i >= 0; i--) {
    msg.push(boxen.snapshotItem(i).value);
  }

  msg.push("====== http://youngpup.net/userscripts/gmail-forwardthread.user.js ======\n\n");
  msg.push("\n\n\n====== Thread Forwarding by Greasemonkey ======");

  msg.reverse();
  
  boxen.snapshotItem(0).value = msg.join("\n");

  var discardButtons = xpath("//button[@id='x']");
  for (var i = 2; i < discardButtons.snapshotLength; i+=2) {
    fireEvent(discardButtons.snapshotItem(i), "click");
  }
}

function checkForwardLinks() {
  var newNumLinks = xpath("//td[@id='sm_4']").snapshotLength;
  GM_log(newNumLinks);
  if (newNumLinks != lastNumForwardLinks) {
    forwardThread();
  } else {
    window.setTimeout(checkForwardLinks, 500);
  }
}

function xpath(query) {
  return doc.evaluate(query, doc, null,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function fireEvent(node, evType) {
  var ev = doc.createEvent("MouseEvents");
  ev.initMouseEvent(evType, true, true, win, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
  node.dispatchEvent(ev);
}
