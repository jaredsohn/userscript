// ==UserScript==
// @name           RTM finger friendly
// @namespace      http://www.relationer.info
// @description    This script makes the mobile version of rememberthemilk a bit more fingerfriendly. Made for Nokia N800/N810
// @include        http://m.rememberthemilk.com/*
// Version 0.2
// By: Samuel Bågfors samuel@bagfors.nu
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    return;
}

// statics
pagewidth =document.body.clientWidth;

// remove the t1 classes
var allLinks, thisLink;
allLinks = document.evaluate(
    '//*[@class="t1"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.style.display='none';
    // do something with thisLink
}

// set width of t2 classes
var allLinks, thisLink;
allLinks = document.evaluate(
    '//*[@class="t2"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.style.width='500px';
    // do something with thisLink
}

// set style of b classes (navigation)
var allLinks, thisLink;
allLinks = document.evaluate(
    '//*[@class="b"]/*',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.style.color ='#555555';
    // do something with thisLink
}

// set style of h classes (navigation)
var allLinks, thisLink;
allLinks = document.evaluate(
    '//*[@class="h"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.style.background = '#000000';
    // do something with thisLink
}

addGlobalStyle('a { font-size: 20px; ! important; color:#ffffff;}');
addGlobalStyle('br { display:none;}'); // Remove all br
addGlobalStyle('select { font-size: 20px; }'); 
addGlobalStyle('input { font-size: 20px; }'); 
addGlobalStyle('table { margin-left:auto; margin-right:auto;}');
addGlobalStyle('tr {width:100px; height:30px; padding:4px; border:0px;border-style:solid;background-color:#555555; ! important; }');
addGlobalStyle('body {box-sizing: border-box; margin: 0; padding: 10px; background-color:#000000; line-height: 20px; font-size: 20px; font-weight: bold; text-align: center; text-shadow: rgba(0, 0, 0, 0.6) 0px -1px 0; text-overflow: ellipsis; color: #FFFFFF;  border-bottom: 1px solid #2d3642;center;}'); 