// Add Comment Edit Link
// version 0.1
// 2005-09-24
// Choong Yong, Koh
// http://www.jroller.com/page/dunpanic
//
// ==UserScript==
// @name           Add Comment Edit Link in Blogger
// @namespace      http://www.choongyong.com/projects/userscripts
// @description    Adds an edit link beside the trash can icon in Blogger comments.  This link will only be visible to the blog owner when the owner views the comments
// @include        http://*.blogspot.com/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//span[@class='delete-comment-icon']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i).parentNode;
    var hrefStr = thisDiv.getAttribute("href");
    var newHrefStr = hrefStr.replace("delete-comment", "post-edit");
    newElement = document.createElement("a");
    newElement.style.border="none";
    newElement.href=newHrefStr;
    imgElement=document.createElement("span");
    imgElement.className="quick-edit-icon";
    newElement.appendChild(imgElement);
    thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);
}
