// ==UserScript==
// @name           rpoints_retro
// @namespace      www.oddcat.org
// @description    Undo the badness of the new Rpoints forum layout
// @include        http://www.rpoints.com/bb/*
// ==/UserScript==


// add a CSS style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Find the left column and remove it
var leftcol = document.getElementById('leftcol');
if (leftcol) {
    leftcol.parentNode.width = '0%';
    leftcol.parentNode.removeChild(leftcol);
}

// Find all the social bookmarks and hide them
var items, item;
items = document.evaluate(
    "//td[@class='socialbookmarks']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < items.snapshotLength; i++) {
    item = items.snapshotItem(i);
    item.parentNode.removeChild(item);
}

// Increase the font size
addGlobalStyle('.postbody { ' + 
	       'font-size: 14px ! important;' +
	       '}');
