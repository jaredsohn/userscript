// ==UserScript==
// @name           Reddit Blacklist
// @namespace 
// @description    Hides links from sites defined in an array inside of the userscript
// @include        *reddit.com/*
// ==/UserScript==
//By Benni Austin//
//Benniaustin.com//

var blackList=new Array();
blackList[0]='dailykos.com';
blackList[1]='huffingtonpost.com';

redditLinks=document.getElementsByTagName('a');
for (var i=0;i<redditLinks.length;i++) {
  for (var j=0;j<blackList.length;j++) {
    if(redditLinks[i].href.indexOf(blackList[j])!=-1) {
      thisLinkId=redditLinks[i].id.replace('title_','');
      document.getElementById('thingrow_'+thisLinkId).style.display="none";
      document.getElementById('pre_'+thisLinkId).style.display="none";
    }
  }
}

