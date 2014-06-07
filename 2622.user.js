// ==UserScript==
// @namespace     http://dezro.com/userscripts/
// @name          phpBB Reply Button
// @description   Adds a direct reply button to the topic list of phpBBs.
// @include       */viewforum.php*
// ==/UserScript==

//posting.php?mode=reply&t=9999
//viewtopic.php?t=9999

var link, reply, newMom;
var allTopicLinks = document.evaluate(
    "//a[@class='topictitle']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTopicLinks.snapshotLength; i++) {
    link = allTopicLinks.snapshotItem(i);
    reply = document.createElement('a');
    reply.href = link.href.replace(/viewtopic\.php\?/, "posting.php?mode=reply&");
    reply.appendChild(document.createTextNode("(R)"));
    newMom = link.parentNode.parentNode.parentNode.childNodes[5];
    newMom.appendChild(document.createTextNode(" "));
    newMom.appendChild(reply);
}