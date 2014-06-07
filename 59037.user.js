// ==UserScript==
// @name           Tripfag Mocker
// @namespace      http://img.4chan.org/b/imgboard.html
// @include        http://*.4chan.org/*
// @description    Mocks tripfags
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//span[@class="commentpostername"] | //span[@class="postername"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
   var red = Math.floor(Math.random() * 255);
   var green = Math.floor(Math.random() * 255);
   var blue = Math.floor(Math.random() * 255); 
    thisLink.style.color = 'rgb('+red+','+green+','+blue+')';
    thisLink.innerHTML = "Anonymous";
}

allLinks = document.evaluate(
    '//span[@class="commentpostertrip"] | //span[@class="postertrip"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.style.color = "#EE00EE";
    thisLink.style.fontSize = "14";
    thisLink.innerHTML = "I'M A HUGE FAGGOT, PLEASE RAPE MY FACE";
}

