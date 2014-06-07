// Hide Personal Messages on RtBoard, 2007-06-21T19:40:00Z
// Copyright (c) 2008, rtboard
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// Changelog:
// 2007-06-21T19:40:00Z -- Original release.
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/firefox/748/
// Then restart Firefox and revisit this script.
// Under Tools/GreaseMonkey, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/GreaseMonkey/Manage User Scripts, select this script,
// and click Uninstall.
// --------------------------------------------------------------------
// ==UserScript==
// @name           Hide Personal Messages on RtBoard
// @namespace      http://userscripts.org/users/56655/scripts
// @description    Add a 'hide' button for each personal message
// @include        http://board.rt.mipt.ru/?persmsg*
// @include        http://zlo.rt.mipt.ru/?persmsg*
// ==/UserScript==

function $x(p, context) {
  // http://wiki.greasespot.net/Code_snippets#XPath_helper
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function createElement(type, attributes){
  // http://wiki.greasespot.net/Code_snippets#Build_a_DOM_node_with_attributes
 var node = document.createElement(type);
 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
  node.setAttribute(attr, attributes[attr]);
 }
 return node;
}

function digest(p) {
  // return unique identifier for a personal message `p' (urlencoded date/time in this case)
  return encodeURIComponent(p.firstChild.textContent);  
}

function hideNode(node) {
  node.setAttribute('style', 'display: none !important;');  
}

function hide() {
  // callback for a 'hide' button
  var p = this.parentNode;
  GM_setValue(digest(p), true);
  hideNode(p);
  return false;
}

function insertBefore(what, where) {
  where.parentNode.insertBefore(what, where);
}

function addHideButtons() {
  // find all personal messages on the page and add a 'hide' button to each of them
       
  // hide previously hidden persmsg
  $x("//div[@class='pr_info']").forEach(function(e){
    if (GM_getValue(digest(e))) {
      hideNode(e);
    }
  });

    // add hide button
  $x("//div[@class='pr_from']").forEach(function(e) {    
	    var objHide = createElement("a", {href: "#", style: "color: gray;", 
        title: "Hide Personal Message (NO UNDO!!)"});
      objHide.appendChild(document.createTextNode("[Hide]"));
      objHide.addEventListener('click', hide, false);
	    insertBefore(objHide, e);
      insertBefore(document.createTextNode(" "), objHide);
	});
} // end addHideButtons()

window.addEventListener('load', addHideButtons, false);

