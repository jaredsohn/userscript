// ==UserScript==
// @name           PopUnderSniper
// @author	   Andy Norris
// @description    Close known popunder windows by URL
// @permissions    ["tabs", "http://*/*"]
// @include        *
// ==/UserScript==

var badUrlArray = new Array(
  "livejasmin.com",
  "sampleurl.com",
  "pictureturn.com/go.htm"
  );

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status == "loading"){
      for (var i = 0, iLen = badUrlArray.length; i < iLen; i++) {
      if (tab.url.indexOf(badUrlArray[i]) > -1) {
        chrome.tabs.remove(tabId);
        break;
      }
    }
  }
});