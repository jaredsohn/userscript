// ==UserScript==
// @name           My Episodes Image Resizer
// @namespace      http://www.uninvisible.co.uk
// @description    resize images on myepisodes
// @include        http://*myepisodes.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('td.cal_today { background-image: none; ! important; background-color: #FF99FF; ! important; }');

var allImg, thisImg;
allImg = document.evaluate(
    "//img[@src='img/icon_watch.gif']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImg.snapshotLength; i++) {
    thisImg = allImg.snapshotItem(i);
    thisImg.style.width = '33px';
    thisImg.style.height = '35px%';
}


allImg = document.evaluate(
    "//img[@src='img/icon_acquire.gif']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImg.snapshotLength; i++) {
    thisImg = allImg.snapshotItem(i);
    thisImg.style.width = '33px';
    thisImg.style.height = '35px%';
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.shows { font-size: 120% ! important; }');


