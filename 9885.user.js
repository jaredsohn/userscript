// ==UserScript==
// @name          Wide Helsinginsanomat
// @namespace     http://mokki.dyndns.org/userscripts
// @description   Widens the layout of the site
// @include       http://www.hs.fi/*
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

// advertisements
addGlobalStyle('div#frameMain div#frameTopAd { display: none ! important; }');
addGlobalStyle('div#frameMain div#frameRightAd { display: none ! important; }');

// widening
addGlobalStyle('div#frameMain div#frameHeader { width: 100% ! important; }');
// background image must be turned off because it is not suitable for variable width layout
addGlobalStyle('div#frameMain div#frameArea { width: 100% ! important; background-image: none ! important; }');
addGlobalStyle('div#frameMain div#frameFooter { width: 100% ! important; }');
addGlobalStyle('div#frameArea div#frameAreaLeft { width: 115px ! important; }');
addGlobalStyle('div#frameArea div#frameAreaCenter { width: 84% ! important; }');
addGlobalStyle('div#frameAreaCenter div#frameContentMain { width: 70% ! important; }');
addGlobalStyle('div#frameAreaCenter div#frameContentRightExtras { width: 161px ! important; float: right ! important; position: relative; right -0px;}');
addGlobalStyle('div#frameAreaCenter div#frameContentWide div#frameAreaCenter div.frameContentWide  { width: 84% ! important; }');
addGlobalStyle('div#frameMain div#frameFooter { width: 100% ! important; }');

var allElements = document.evaluate("//table[@width]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var elem;
for (var i = 0; i < allElements.snapshotLength; i++) {
  elem = allElements.snapshotItem(i);
  if (elem.width == "488") {
    elem.width = "100%";
  }
}
