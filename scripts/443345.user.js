// ==UserScript==
// @name       OP-info remove sidebar
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @icon http://staging.op-insight.co.uk/images/opDealer/favicon.ico
// @description  slims down the OP Info staging site
// @match      http://staging.op-insight.co.uk/*
// @copyright  2012+, You
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

var div = document.getElementById("left");
if (div) {
    div.style.display = "none"; // Hides it
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}

var div = document.getElementById("right");
if (div) {
    div.style.display = "none"; // Hides it
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}

addGlobalStyle('#container { width:auto!important; }');