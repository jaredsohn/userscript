// ==UserScript==
// @namespace     http://noandwhere.com/userscripts
// @name          RojoExpandUnread
// @description   Expands collapsed unread stories in Rojo
// @include       http://www.rojo.com/*stories*
// @include       http://rojo.com/*stories*
// @include       http://www.rojo.com/today*
// @include       http://rojo.com/today*
// @include       http://www.rojo.com/mojo*
// @include       http://rojo.com/mojo*
// @include       http://www.rojo.com/view-reading*
// @include       http://rojo.com/view-reading*
// @include       http://www.rojo.com/saved*
// @include       http://rojo.com/saved*
// @include       http://www.rojo.com/?feed-id*
// @include       http://rojo.com/?feed-id*
// ==/UserScript==

function ExpandUnread() {
    read = document.evaluate('//div[@isunread="unread"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < read.snapshotLength; i++) {
        d = read.snapshotItem(i);
        // can't seem to do xpath query in the context of an xpath result?
        //toggles = document.evaluate('//div[@title="Expand/Collapse"]',d.wrappedJSObject, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        //t = toggles.snapshotItem(0);
        t = d.wrappedJSObject.getElementsByTagName("div")[1];
        t.onclick();
    }
}

window.addEventListener("load", function(e) {
    expcol = document.evaluate('//span[@class="expcollall"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    ecspan = expcol.snapshotItem(0);
    bar = document.createTextNode(" | ");
    ecspan.appendChild(bar);
    newlink = document.createElement("a");
    newlink.innerHTML = "Expand unread stories";
    newlink.href = "#"
    newlink.addEventListener("click", ExpandUnread, false);
    ecspan.appendChild(newlink);
}, false);//.user.js
