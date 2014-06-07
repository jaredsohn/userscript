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
// @name          OnlyLady News Ad Remover
// @namespace     http://gnor.net/
// @description   Removes the ads in the pages of onlylady.com
// @include       http://www.onlylady.com/Cgi-Bin_2004/Client/BBS/BBS_ShowTitle.asp*
// @include       http://www.onlylady.com/Cgi-Bin_2004/Client/BBS/BBS_Zone.asp*
// @version       0.0.3
// ==/UserScript==

(function() {
  deleteall("//TD[@bgcolor='#f7b2ce']/ancestor::TR[1]/preceding-sibling::TR[1]");
  deleteall("//TD[@bgcolor='#f1b3c8']/ancestor::TR[1]/preceding-sibling::TR[1]");
  deleteall("//MARQUEE/ancestor::TR[1]");
  deleteall("//IMG[@name='Top_2004_r2_c1']/ancestor::TR[1]");
  deleteall("//OBJECT[contains(@codebase, 'download.macromedia.com')]/..");

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

