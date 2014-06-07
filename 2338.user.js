// ==UserScript==
// @name	heise-direct-to-print
// @description Points heise newsticker article links to the print version	
// @include	http://www.heise.de/*
// @include	http://heise.de/*
// ==/UserScript==
//
// *****************************************************************
// * this is an altered version of the SPon-direct-to-print-script *
// * http://userscripts.org/scripts/show/1750                      *
// * http://userscripts.org/scripts/source/1750.user.js            *
// *****************************************************************


(function() {
 
  // filter for links
  // URL contains 5 numbers
  // a typical link is: /newsticker/meldung/11111
  // this splits the link into $1= "/newsticker/meldung/" and $2= "11111"
  var articlelinkre = /(.*meldung.)(\d+)/;

  var sp_a = document.evaluate('//a[@href]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var i, link;
  for (i = 0; link = sp_a.snapshotItem(i); i++) {
    
    //set link as $1print/$2 i.e. /newsticker/meldung/print/11111
    if (index = link.href.search(articlelinkre) >= 0) {
       link.href=link.href.replace(articlelinkre,"$1print/$2");
    }
  }
})();


