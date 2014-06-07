// ==UserScript==
// @name	SG SmallComments
// @namespace	http://www.suicidegirls.com/members/ThePants/
// @description	removes those stupid comment profiles
// @include http://*suicidegirls.com/*
// @exclude
// ==/UserScript==

(function() {

  //Grab the stuff we want to get rid of
  var xpath = "//div[@class='commentPic']";
  var xpath2 = "//div[@class='commentInfo']//p";
  var junk = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (junk.snapshotLength > 0){
    var t;
    for (i = 0; t = junk.snapshotItem(i); ++i) {
      t.style.display = "none";
    }
  }

  junk = document.evaluate(xpath2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (junk.snapshotLength > 0){
    for (i = 0; t = junk.snapshotItem(i); ++i) {
      t.style.display = "none";
    }
  }

})();
