// 
// Amazon Filler Item Link
// version 0.1
// 2008, Kris Brower
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google cached text", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Amazon Filler Item Finder
// @namespace     None
// @description   Add a link to products that will get you free shipping on Amazon.com when you are short of shipping.
// @include       *amazon.com*
// ==/UserScript==

var allLinks; 
allLinks = document.evaluate("//td/span[@class='sans']/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(allLinks.snapshotItem(1) && allLinks.snapshotItem(1).innerHTML == "FREE Super Saver Shipping!"){ //first try for the bigger free shipping ad
  var tochange = allLinks.snapshotItem(0).parentNode.parentNode;
  var cash = allLinks.snapshotItem(0).innerHTML.replace(/\$/,"");
  if(parseFloat(cash) < 15){
    tochange.innerHTML += "<div class=\"sans\" style=\"background-color:#F99;margin:0px;padding:3px;margin-top:3px;\"><b><a href=\"http://www.filleritem.com/?q="+cash+"\">Find items</a></b> over <b>$"+cash+"</b> that qualify for <b>free shipping</b> on <a href=\"http://www.filleritem.com/\">filleritem.com</a></div>";
  }
}else{ // then try for the smaller one
  allLinks = document.evaluate("//td/span[@class='small']/b/span[@class='price']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(allLinks.snapshotItem(0)){
    var cash = allLinks.snapshotItem(0).innerHTML.replace(/\$/,"");
    var tochange = allLinks.snapshotItem(0).parentNode.parentNode.parentNode;
    if(parseFloat(cash) < 15){
      tochange.innerHTML += "<div class=\"small\" style=\"background-color:#F99;margin:0px;padding:3px;margin-top:3px;\"><b><a href=\"http://www.filleritem.com/?q="+cash+"\">Find items</a></b> over <b>$"+cash+"</b> that qualify for <b>free shipping</b> on <a href=\"http://www.filleritem.com/\">filleritem.com</a></div>";
    }
  }

}

