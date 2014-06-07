// ==UserScript==
// @name          DeviantART Wide
// @namespace     http://www.litzke.com
// @description   Strips away the annoying right-hand bar that has ads and other useless stuff
// @include       http://*.deviantart.*
//@include	      http://deviantart.*
// ==/UserScript==

//remove the right-hand bar
var right_bar = document.evaluate(
    '//div[@id="nav-east"]', document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var right_bar_main = right_bar.snapshotItem(0);
right_bar_main=right_bar_main.parentNode.removeChild(right_bar_main);

//Insert two styles, reducing the bar to nothing and widening the main content area
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#nav-east { width:0px ! important; }');
addGlobalStyle('#content { width:100% ! important; }');