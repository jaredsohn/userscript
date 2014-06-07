// ==UserScript==
// @name           Facebook News Feed Ad Nuker
// @author         Jordan Running
// @namespace      http://swirlee.org/2006/11/09/facebook-news-feed-ad-nuker/
// @description    Facebook has added "Sponsored" links to every user's News Feed. This nukes them.
// @include        *.facebook.com/home.php*
// ==/UserScript==

(function(){
  var offenders = document.evaluate("//div[contains(@class, 'ad_capsule')]", document,
                    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(offenders.snapshotLength > 0) {
    for(var i = 0; i < offenders.snapshotLength; i++) {
      var offender = offenders.snapshotItem(i);
      offender.parentNode.removeChild(offender);
    }
  }
})();