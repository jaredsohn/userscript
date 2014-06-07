// ==UserScript==
// @name           Yahoo Sports Classic Box Scores
// @namespace      http://userscripts.org/users/Trecetratops/ysclassicboxscores
// @description    Rewrites links to point classic layout for box scores
// @include        http://sports.yahoo.com/*
// @include        http://rivals.yahoo.com/*
// @include        http://*.fantasysports.yahoo.com/*
// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0 España License
// @author         Trecetratops
// @version        0.2
// @date           2010-Nov-08

// ==/UserScript==
/*   If anyone else hates new Yahoo layout for box scores, use this script to see classic ones.

     Change log:
        2010-Nov-08  Fixes iframe autoload bug. Excludes links already pointing to old box scores.
        2010-Nov-05  Initial version. 
	  
    Known issues:
        Needs to be tuned to inspect only those new nodes of interest.

*/

(function() {
      document.body.addEventListener("DOMNodeInserted",rewriteLinx,false);
      function rewriteLinx() {
	  var psearchLinx, oneLink, addFilter;
	  addFilter = '&old_bs=1';
      psearchLinx = document.evaluate( "//a[contains(@href,'boxscore') \
                                        and not(contains(@href,'old_bs'))]", 
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null
                                      ); 
      for (var i = 0; i < psearchLinx.snapshotLength; i++) {
         oneLink = psearchLinx.snapshotItem(i);
         oneLink.href = oneLink.href + addFilter;
      }
    }
})();