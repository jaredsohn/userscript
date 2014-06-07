// ==UserScript==
// @name          User-controlled Google Adsense
// @namespace     http://joshuamckenty.blogspot.com
// @description   Rewrites the URL in adsense iframes to a user-specified value, changing the ads
// @include       *
// ==/UserScript==


// You need an online page full of the keywords that you like
// Ideally you'd keep this updated, perhaps dynamically populated from either
// your twitter stream, blogging, or google search results.

// I'm not trying to steal ad rev from the page, so I don't rewrite any of the client codes
// Just the URL and ref, which I hope doesn't break anything


var mykeywordURL =  GM_getValue("keywordURL");//"www.gamasutra.com";
if (!mykeywordURL) {
  mykeywordURL = prompt("What URL would you like to use for adsense keywords?");
  if (mykeywordURL) {
    GM_setValue("keywordURL", mykeywordURL);
  } else {
    mykeywordURL = "www.gamasutra.com"; 
  }
}

excludeList = ["",""];

var gMop = function mopUpFunc() {
  allAds = document.evaluate(
    "//a[@class='adt']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for (var i = 0; i < allAds.snapshotLength; i++) {
      thisAd = allAds.snapshotItem(i);
      adRE = /&adurl\=([^&]*)\&/ ;
      adUrl = thisAd.getAttribute("href");
      adUrl = adUrl.match(adRE)[1];
      // http://pagead2.googlesyndication.com/pagead/iclk?sa=l&ai=BJYXdLTZiR7LZB6L0qwODoaHdDNDsiSi4qN_MAsCNtwHA_BUQARgBINid9AIoBTgAULuIucQEYP2w-4DMA6oBCjEwODc0NjMyOTmyARFibG9nLmJvdW50eXVwLmNvbboBCjE2MHg2MDBfYXPIAQHaARlodHRwOi8vYmxvZy5ib3VudHl1cC5jb20vyALwzeECqAMByAMH6APUAugDIugDiAToA8sC9QMIAAAA&num=1&adurl=http://www.pronto.com/user/search.do%3FdisplayQuery%3Dnatures%2Bbounty%2Bnatural%26query%3D_MB_natures_bounty%2B_STYLE_natural%26preAnnotated%3Dtrue%26topLevelCategories%3Dhlthbeaut%26adid%3Dgc2-s10-154-10319-0_gc%26SEM%3Dtrue%26creativeid%3D606412900%26site%3Dblog.bountyup.com%26ref%3Dnatures%2520bounty%2520natural&client=ca-pub-5298590580582059&nm=15
      
      // Give us a delete button
      delButton = document.createElement("A");
      delButton.addEventListener("click", function(event) { GM_log("Remove this Ad: " + adUrl ); event.target.parentNode.removeChild(event.target.parentNode.firstChild); }, true);  
      delButton.innerHTML = "X";
      thisAd.parentNode.appendChild(delButton);
      
      // TODO:
      
      // Push all these bad URLs back into my keywords page, in some exclusionary (micro)format
  }
};

window.addEventListener("load", function(event) { gMop(); } , true );
var allIFrames, thisIFrame;
allIFrames = document.evaluate(
    "//iframe[@name='google_ads_frame']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allIFrames.snapshotLength; i++) {
    thisIFrame = allIFrames.snapshotItem(i);
    GM_log("JMC - erased the iframe that used to contain... " + thisIFrame.src);
    currentSrc = thisIFrame.src;
    var re = /(.*\&url\=)([^&]*)\&(.*)/;
    oldUrl = currentSrc.match(re)[2];
    GM_log("Old url is " + oldUrl);
    currentSrc = currentSrc.replace(re, "$1http%3A%2F%2F" + mykeywordURL + "\&$3");
    var newUrl = /(.*\&ref\=)([^&]*)\&(.*)/;    
    
    thisIFrame.src = currentSrc.replace(newUrl, "$1" + oldUrl + "\&$3");
}
