// ==UserScript==
// @name          O'Reilly Safari Beautifier
// @namespace     http://TreesAndClouds.net/Safari
// @description   Make O'Reilly Safari pages easier to read
// @include       http://safari.oreilly.com/*
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

function stripSection(xpath) {
   var a = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var toc = a.snapshotItem(0);
   toc.parentNode.removeChild(toc);
}

//use Verdana for body text
addGlobalStyle('.docText, .docList { font-family:Verdana,Verdana,sans-serif; color:black; font-size:small; font-weight: normal; }');

// hide the picture of the book and pub data above the topic body
stripSection("//html//body//table[3]//tbody//tr[1]//td[3]//table//tbody//tr//td//div[@id='section']//table[1]//tbody//tr//td[1]//table[1]");

// hide the black and maroon menus beneath the logos
stripSection("//html//body//table[2]");

// hide the O'Reilly and Safari Bookshelf logos on top of the page
stripSection("//html//body//table[@id='headerTable']");

// to hide other parts, find the XPath expression for the part (using the DOM Inspector
// or similar) and put it in another stripSection() call after escaping "/" to "//"
