// ==UserScript==
// @author        Marco Deviato
// @name          Remove Recommended Page Ads from Facebook
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @grant         none
// ==/UserScript==
document.addEventListener('DOMNodeInserted',function (e) {
  els=document.getElementsByClassName("uiUnifiedStory");
  for (i=0;i<els.length;i++){
    el=els[i];
    if(el.getElementsByClassName("uiStreamEdgeStoryLineTx").length>0||el.getElementsByClassName("uiStreamAdditionalLogging").length>0)
      el.parentNode.removeChild(el);
  }
},true);
