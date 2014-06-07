// ==UserScript==
// @name           Google Scholar quick switch
// @namespace      tag:tilman.vogel@web,2007:userscripts
// @description    Add google scholar to google search quick switch bar
// @include        http://*.google.*/*
// @exclude        http://scholar.google.*/*
// ==/UserScript==

function getXP(q) {
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// new google bar has this feature anyway:
if(getXP('//DIV[@id="gbar"]').snapshotLength > 0)
  return;

var searchLink = getXP('//A[@class="q"][1]');

if(searchLink.snapshotLength < 1)
  return;

searchLink = searchLink.snapshotItem(0);

var switchBar = searchLink.parentNode;

var insertionPoint = searchLink;
searchLink = searchLink.cloneNode(true);
searchLink.href = searchLink.href.replace(/\w+\.google\.(\w+)\/\w+/,"scholar.google.$1/scholar"); 
searchLink.innerHTML = "Scholar";

var newSpan = document.createElement("SPAN");

newSpan.appendChild(searchLink);
newSpan.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";


while(insertionPoint && insertionPoint.nodeName != "B")
  insertionPoint = insertionPoint.nextSibling;

if(insertionPoint)
  switchBar.insertBefore(newSpan, insertionPoint);
