// tested with GreaseMonkey 0.8.20080609.0 and DGS 0.14

// ==UserScript==
// @name           Unread DGS Forum Indicator
// @namespace      http://www.dmwit.com
// @description    Add the red "new" indicator to forums with new messages
// @include        *dragongoserver.net/forum/index.php
// @include        *dragongoserver.net/forum/
// ==/UserScript==

function xpath(query, node) {
    if(node == null) node = document;
    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathSingle(query, node) { return xpath(query, node).snapshotItem(0); }
function xpathText  (query, node) { return xpathSingle(query, node).textContent; }

function updatePostCount(ev) {
    elem = ev.target.parentNode.parentNode;
    postCount = xpathText(postCountXPath, elem) * 1;
    forumName = xpathText(forumNameXPath, elem);
    GM_setValue(account + forumName, postCount);
}

function munge(elem) {
    postCount = xpathText(postCountXPath, elem) * 1;
    forumName = xpathText(forumNameXPath, elem);
    oldCount  = GM_getValue(account + forumName, 0);

    if(postCount > oldCount)
        xpathSingle("./td[@class='Name']", elem).innerHTML += ' <font color="red" size="-2">new</font>';

    // "mouseup" doesn't catch keyboard clicks and "click" doesn't catch middle clicks
    forumLink = xpathSingle(forumNameXPath, elem);
    forumLink.addEventListener("mouseup", updatePostCount, false);
    forumLink.addEventListener("click"  , updatePostCount, false);
}

postCountXPath = "./td[@class='PostCnt']/strong";
forumNameXPath = "./td[@class='Name']/a";

account = xpathText("//a[@id='loggedId']");
forums  = xpath("//table[@id='forumIndex']//tr[@class='Row1']");

for(i = 0; i < forums.snapshotLength; i++)
    munge(forums.snapshotItem(i));