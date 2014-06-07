//
// Copyright (c) 2005, wwr
//
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
// select "Sina News Ad Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sohu News Ad Remover
// @namespace     http://gnor.net/
// @description   Removes the box ads in the news page and cleans up the start page of news.sohu.com
// @include       http://*.sohu.com/
// @version       0.0.6
// ==/UserScript==

(function() {
  if (document.location.pathname.match('/200.*shtml')) {
    deleteall("//*[contains(name(), 'SOHUNEWSREFILLCODE')]/ancestor::TD[1]");
    deleteall("//BODY/CENTER/TABLE[1]");
    deleteall("//TD[@class='bg_right']");
    //deleteall("//A[contains(@href, 'tb.sogou.com')]/ancestor::TR[1]");
    deleteall("//*[contains(name(), 'BACKFILL')]/following-sibling::TABLE[1]");
    deleteall("//IFRAME[contains(@src, 'sogou.com')]");
    deleteall("//IFRAME[contains(@src, '.sohu.com')]");
    //deleteall("id('commentReview')/preceding-sibling::TABLE[position() <= 2]");
    deleteall("//INPUT[@name='ENTITYID']/ancestor::TABLE[2]");
    deleteall("//A[@href='http://pic.it.sohu.com']/ancestor::TABLE[2]");
  }else{
    // delete top tables
    deleteall("//BODY/CENTER/*[contains(name(),'NEWS_HP_FRAG2')]/preceding-sibling::*");
    deleteall("//OBJECT[contains(@codebase, 'download.macromedia.com')][@width=590]/ancestor::TR[1]");
  }

  function deleteme( obj) {
    try { obj.parentNode.removeChild( obj); }
    catch( e) {GM_log("failed delete object");}
  }

  function deleteall(xpath) {
    try {
      var matches = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = 0; i <= matches.snapshotLength; i++ ) {
	thisMatch = matches.snapshotItem(i);
	//thisMatch.style.display = 'none';
	deleteme(thisMatch);
      }
      GM_log("deleted " + i + " items in deleteall " + xpath);
    }
    catch (e) {alert(e);}
  }

  function getObject( obj, xpath) {
    try { val = document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
    catch( e) {} 
    if (!val) {GM_log("cannot find " + xpath); }
    return val;
  }
}
)();

