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
// @name          Sina News Ad Remover
// @namespace     http://gnor.net/
// @description   Removes the box ads in the news page and cleans up the start page of news.sina.com.cn.
// @include       http://*.sina.com.cn/*
// @version       0.0.8
// ==/UserScript==

// ChangeLog
// 0.0.8 : delete fAD (finance ad?)
// 0.0.7 : In 2007, sina news changed the news content page, which makes us easier to clean up :)

(function() {
  if (!document.location.href.match('.?html')) {
    // delete top tables
    deleteall("//BODY/CENTER/comment()[contains(string(), 'Sina_News_Head_End')]/preceding-sibling::TABLE");
    
    //delete banners between columns
    //deleteall("//EMBED[contains(@src, 'ad4.sina')]/ancestor::TABLE[1]");
    deleteall("//OBJECT[contains(@codebase, 'download.macromedia.com')]");
    deleteall("//IFRAME[contains(@src, 'adsina')]/ancestor::TABLE[1]");
    deleteall("//A[contains(@href, 'http://ad.cn')]");
    //delete marqueen ad
    deleteall("//IFRAME[contains(@src, 'iframe/ad/marqueen')]//parent::TD");
  }else{
    //clean up news item page

    deleteall("//*[contains(@id, 'PublicRelation')]");
    //delete right side bar
    deleteme( getObject( document, "//DIV[@class='rightShell']//parent::TD"));
    //delete top bar
    deleteme( getObject( document, "//DIV[@class='top_bar']"));

    deleteme( getObject( document, "//DIV[@class='fAD']"));

    //deleteall("//IMG[contains(@src, 'sina_xwzx.GIF')]/ancestor::TABLE[2]");
    //deleteme( getObject( document, "//CENTER/TABLE[1]"));
    //deleteme( getObject( document, "//DIV[@id='outer']/TABLE[1]/TBODY/TR[1]/TD[3]"));
    //delete iask bar
    //deleteme( getObject( document, "//FORM[contains(@action, 'iask.com')][3]/ancestor::TABLE[1]"));
  }

  function deleteme( obj) {
    try { obj.parentNode.removeChild( obj); }
    catch( e) {GM_log("failed delete object");}
  }

  function deleteall(xpath) {
    try {
      var matches = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      var d = new Array();
      for (i = 0; i <= matches.snapshotLength; i++ ) {
	thisMatch = matches.snapshotItem(i);
	thisMatch.style.display = 'none';
      }
    }
    catch (e) {}
  }

  function getObject( obj, xpath) {
    try { val = document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
    catch( e) {} 
    if (!val) {GM_log("cannot find " + xpath); }
    return val;
  }
}
)();



