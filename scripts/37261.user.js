// ==UserScript==
// @name           Twitter Following List
// @namespace      http://userscripts.org/users/68839
// @description    List user names beside pictures in Twitter's Following lists.
// @include        http://twitter.com/*
// ==/UserScript==


var allContactLinks = document.evaluate(
    "//a[@rel='contact']",
    document.getElementById('following_list'),
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allContactLinks.snapshotLength; i++) {
    var thisContactLink = allContactLinks.snapshotItem(i);
    
    // Name
    var nameText = thisContactLink.title;
    var nameTextNode = document.createTextNode(nameText);
    thisContactLink.appendChild(nameTextNode);
    
    // Username
    linkHref = thisContactLink.href;
    var unameText = ' (' + thisContactLink.href.replace(/http.*twitter.com\//, '') + ')';

    var unameTextNode = document.createTextNode(unameText);
    thisContactLink.appendChild(unameTextNode);
}