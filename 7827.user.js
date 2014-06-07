// ==UserScript==
// @name	mlb.com top plays
// @description	changes links on top plays page to point directly to video location
// @include	http://*.*.mlb.com/*
// @include	http://*.mlb.com/*
// @include	http://mlb.com/*
// ==/UserScript==

javascript:
(function(){
  var k,x,t;
  for(k=0;x=document.links[k];k++){
    if(x.href.indexOf("playMedia2")!=-1){
      t=x.href.substring(x.href.indexOf("w:'")+3,x.href.indexOf("',pid"));
      x.href="mms://a1503.v108692.c10869.g.vm.akamaistream.net/7/1503/10869/v0001/mlb.download.akamai.com/10869/"+t;
    }
  }
}
)();