// ==UserScript==
// @name	golem-direct-to-print
// @description Points golem newsticker article links to the print version	
// @include	http://www.golem.de/*
// @include	http://golem.de/*
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
  // a typical link is: http://www.golem.de/1111/22222.html
  // this splits the link into $1= "http://www.golem.de/1111/" and $2= "22222" ans $3= ".html"
  // var articlelinkre = /(.*meldung.)(\d+)/;
  var articlelinkre = /(.*golem.de.\d+.)(\d+)(.*)/;

  var sp_a = document.evaluate('//a[@href]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var i, link;
  for (i = 0; link = sp_a.snapshotItem(i); i++) {
    
    //set link as /print/$2 i.e. http://www.golem.de/print.php?a=22222
    if (index = link.href.search(articlelinkre) >= 0) {
       link.href=link.href.replace(articlelinkre,"http://www.golem.de/print.php?a=$2");
    }
  }
})();


