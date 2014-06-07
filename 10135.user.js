// ==UserScript==
// @name          ZooomrMonkey (Photo)
// @namespace     http://www.e-chiceros.org/zooomr/photos
// @description   Makes a cleaner, less sofisticated user interface for zoomr
// @include       http://beta.zooomr.com/photos/*
// ==/UserScript==


if (document.getElementById("seekr_left") == null) {
    return;
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

addGlobalStyle("  h1 { font-size: 14pt; font-weight: 100%;} ");

addGlobalStyle("  #content { min-height: 400px; width: 830px; height: auto !important; height: 125px;  border-left: 1px solid silver; padding-left: 10px;} ");

addGlobalStyle("  #youcell { background-color: white;} ");

addGlobalStyle("  .thumb { float: left;} ");
addGlobalStyle("  .text { float: right; width: 250px;} ");
addGlobalStyle("  .text h2 { float: left; } ");
addGlobalStyle("  .text h3 { float: left; } ");

var mainTable = document.getElementsByTagName("table")[1];

mainTable.rows[0].cells[1].style.visibility = "hidden";

var photoLinks = mainTable.rows[1].cells[0].getElementsByTagName("a");
for (var idx=0; idx <photoLinks.length; idx++) {
  photoLinks[idx].innerHTML = photoLinks[idx].innerHTML.substring(0, photoLinks[idx].innerHTML.indexOf(">"));
  photoLinks[idx].getElementsByTagName("img")[0].style.padding = "10px 2px 10px 0px";
}


var allThreads = document.evaluate(
    "//div[@class='thread']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allThreads.snapshotLength; i++) {
    var currentThread = allThreads.snapshotItem(i);
    currentThread.parentNode.removeChild(currentThread);
}

