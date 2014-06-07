// ==UserScript==
// @name           Google Reader - Auto Open & Fold Sidebar
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.com/reader/view/*
// @version        1.0
// @description    Automatically open and fold the sidebar with mouseover.
// ==/UserScript==

var nav = document.evaluate('//div[@id="main"]/div[@id="nav"]',document,null,7,null).snapshotItem(0);
var chrome = document.evaluate('//div[@id="main"]/div[@id="chrome"]',document,null,7,null).snapshotItem(0);

function foldSidebar(){
nav.style.width='0px';
chrome.style.marginLeft='0';
}
function openSidebar(){
nav.style.width='260px';
chrome.style.marginLeft='260px';
}

var container = document.evaluate('//div[@id="main"]/div[@id="chrome"]//div[@id="viewer-container"]',document,null,7,null).snapshotItem(0);
//container.addEventListener('mousedown', foldSidebar, false);
//container.addEventListener('DOMMouseScroll', foldSidebar, false);
container.addEventListener('mouseover', foldSidebar, false);

var bar = document.evaluate('//div[@id="main"]/div[@id="chrome"]//td[@id="chrome-lhn-toggle"]',document,null,7,null).snapshotItem(0);
bar.addEventListener('mouseover', openSidebar, false);