// ==UserScript==
// @name           Adopt-A-Bull New Colors
// @namespace      srawlins
// @include        http://www.adopt-a-bull.com/
// @include        http://www.adopt-a-bull.com/*
// ==/UserScript==

var hfmsHymnRoyale  = "#2A044A;";
var hfmsCornerstone = "#0B2E59;";
var hfmsRedeemed    = "#0D6759;";
var hfmsNewLife     = "#7AB317;";
var hfmsNewLife_half = "#BCD98B;";
var hfmsEden        = "#A0C55F;";
var hfmsEden_half   = "#CFE2AF;";

changeGlobalColors();
changeHeaderColors();
changeNavColors();
changeAnnouncementColors();
changeH3Colors();
changeTableColors();

function changeGlobalColors() {
  addGlobalStyle(
  "body {" +
  "  background-color: "+hfmsEden_half +
  "  margin: 0em;" +
  "}"
  );
}

function changeHeaderColors() {
  var titleText = select2ndUnderDocument("//table[@class='headerbgcolor']//img");
  titleText.setAttribute("src", "http://ne.cooltext.com/d.php?renderid=530140935&extension=png");
  titleText.setAttribute("height", "");
  titleText.setAttribute("width", "");

  addGlobalStyle(
  ".headerbgcolor {" +
  "  background-color: "+hfmsEden +
  "  border-right: solid 2px "+hfmsRedeemed +
  "  border-left:  solid 2px "+hfmsRedeemed +
  "}"
  );
}

function changeNavColors() {
  var navTable = selectFirstUnderDocument("//table[@summary='menu']");
  navTable.setAttribute("background", "");
  navTable.setAttribute("id", "menu-table");
  addGlobalStyle(
  "#menu-table {" +
  "  background-color: "+hfmsCornerstone +
  "}" +
  
  "ul#menu {" +
  "  padding-left: 1.0em;" +
  "}" +
  
  "ul#menu li {" +
  "  border-right: solid 2px "+hfmsNewLife +
  "}" +
  
  "ul#menu > li:first-child {" +
  "  border-left: solid 2px "+hfmsNewLife +
  "}" +
  
  "ul li a {" +
  "  margin-left: 0px;" +
  "}" +
  
  "ul li a:hover {" +
  "  background-color: "+hfmsNewLife +
  "}" +
  
  "ul li:hover a {" +
  "  background-color: "+hfmsCornerstone +
  "}" +
  
  "ul li:hover a:hover {" +
  "  background-color: "+hfmsNewLife +
  "}" +
  
  "ul li:hover li a:hover {" +
  "  background-color: "+hfmsNewLife +
  "}" +
  
  "");
  
  var navUlLis = selectUnderDocument("//ul[@id='menu']/li");
  for (var i = 0; i < navUlLis.snapshotLength; i++) {
    var li = navUlLis.snapshotItem(i);
    li.setAttribute("style", "");
  }
}

function changeAnnouncementColors() {
  var announceTable = select2ndUnderDocument("//table[@summary='menu']");
  announceTable.setAttribute("id", "announce-table");
  announceTable.setAttribute("border", "0");
  
  addGlobalStyle(
  "#announce-table {" +
  "  background-color: "+hfmsEden +
  "  border-right: solid 2px "+hfmsRedeemed +
  "  border-left:  solid 2px "+hfmsRedeemed +
  "}" +
  
  "");
}

function changeH3Colors() {
  addGlobalStyle(
  "h2 {" +
  "  background-color: "+hfmsRedeemed +
  "  border: solid 1px "+hfmsHymnRoyale +
  "}" +
  
  "h3 {" +
  "  background-color: "+hfmsRedeemed +
  "  border: solid 1px "+hfmsHymnRoyale +
  "}" +
  
  "");
}

function changeTableColors() {
  addGlobalStyle(
  "thead td {" +
  "  background-color: "+hfmsCornerstone +
  "}" +
  "thead td a {" +
  "  color: #FFFFFF;" +
  "}" +
  
  "tbody .rgPetTableRowEven td {" +
  "  background-color: "+hfmsEden +
  "}" +
  
  "tbody .rgPetTableRowOdd td {" +
  "  background-color: "+hfmsNewLife_half +
  "}" +
  
  "tbody .rgPetTableRowOver td {" +
  "  background-color: "+hfmsRedeemed +
  "}" +
  
  ".petname {" +
  "  font-size: 1.4em;" +
  "}" +
  
  ".petbreed {" +
  "  font-size: 1.2em;" +
  "}" +
  
  ".petsex {" +
  "  font-size: 1.2em;" +
  "}" +
  
  "tbody .rgPetTableRowEven img," +
  "tbody .rgPetTableRowOdd img," +
  "tbody .rgPetTableRowOver img {" +
  "  border: solid 1px "+hfmsHymnRoyale +
  "}" +
  
  "");
}


function selectUnderDocument(selector) {
  return document.evaluate(selector, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function selectFirstUnderDocument(selector) {
  return document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function select2ndUnderDocument(selector) {
  res  = document.evaluate(selector, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  return res.snapshotItem(1);
}

function selectUnder(selector, root) {
  return document.evaluate(selector, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function selectFirstUnder(selector, root) {
  return document.evaluate(selector, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function selectUnderDocumentWithin(selector, iframe) {
  return iframe.contentDocument.evaluate(selector, iframe.contentDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function selectFirstUnderDocumentWithin(selector, iframe) {
  return iframe.contentDocument.evaluate(selector, iframe.contentDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function selectUnderWithin(selector, root, iframe) {
  return iframe.contentDocument.evaluate(selector, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function selectFirstUnderWithin(selector, root, iframe) {
  return iframe.contentDocument.evaluate(selector, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  } catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
      document.styleSheets[0].cssText += css;
  }
}