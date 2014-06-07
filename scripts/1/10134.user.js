// ==UserScript==
// @name          ZooomrMonkey (Stream)
// @namespace     http://www.e-chiceros.org/zooomr/
// @description   Makes a cleaner, less sofisticated user interface for zoomr
// @include       http://beta.zooomr.com/photos/*
// ==/UserScript==


if (document.getElementById("SubNav") == null) {
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

addGlobalStyle("  #content { min-height: 400px; height: auto !important; height: 125px;  border-left: 1px solid silver; padding-left: 10px;} ");

addGlobalStyle("  #youcell { background-color: white;} ");

addGlobalStyle("  .Meta { visibility : hidden; }");
addGlobalStyle("  .MetaDetail { visibility : hidden; }");

addGlobalStyle("  div.DetailBit { position: static; background-color: #ffffd0; width: 250px; height: 300px; text-align: center; margin-left : auto; margin-right: auto; display: table-cell; vertical-align: top; border: 1px solid #c0c0c0;  padding-top: 8px; } ");

addGlobalStyle("  td.DetailBit h4 { width: 250px; padding: 12px 0px 8px 0px; text-align: center;} ");


// Replace user icons location and erase the text around them.

var icons = document.getElementById("SubNav").rows[0].cells[1].getElementsByTagName("h1")[0];

var newIcons = document.createElement("span");
newIcons.innerHTML = " &middot; " +
                    "<a class='smalllink_dblue' href='/photos/ciberado/sets/'>" + 
                    "<img src='http://assets2.zooomr.com/images/silk/pictures.png' alt='sets'>" +
                    "</a>"+
                    "<a class='smalllink_dblue' href='/people/ciberado/'>" + 
                    "  <img src='http://assets2.zooomr.com/images/silk/vcard.png' alt='Profile'>" +
                    "</a>";
icons.appendChild(newIcons);                   

var oldIcons = document.getElementById("SubNav").rows[0].cells[1].getElementsByTagName("p")[0];
oldIcons.innerHTML = "";

var localeBar = document.getElementById("localebar");
localeBar.innerHTML = "";

// Chop descriptions up to MAX_DESC_LENGTH characters.

var allDescs = document.evaluate(
    "//p[@class='Desc']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var MAX_DESC_LENGTH = 80;

for (var i = 0; i < allDescs.snapshotLength; i++) {
    var currentDesc = allDescs.snapshotItem(i);
    var text = currentDesc.innerHTML;
    if (text.length > MAX_DESC_LENGTH) {
       text = text.substring(0,MAX_DESC_LENGTH);
       text = text.substring(0, text.lastIndexOf(" "));
       currentDesc.innerHTML = text + "...";
    }
}

