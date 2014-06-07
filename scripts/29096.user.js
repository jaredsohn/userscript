// ==UserScript== 
// @name           Pixiv Lazy
// @namespace      pixivlazy
// @description    provide a direct link to original image ([s] link), as well as a link to its page ([b] link).
// @include        http://www.pixiv.net/*
// ==/UserScript==
// version 0.4 - updated to filter new thumbnails
// version 0.3 - fix a bug, hat-tip to syosyo
// version 0.2 - updated on 2008-06-25

function pixivlink(event){
  Items = document.getElementsByTagName('img');
  rexa = /\?mode\=medium\&illust_id|\?mode\=big\&illust_id/i;
  rexb = /source.pixiv.net/i;
  for (var i = 0; i < Items.length; i++) {
    var imgR = Items[i];
    var aR = imgR.parentNode;
    if(rexa.test(aR.href)) {
      var srcR = imgR.src.replace(/_s\.|_m\.|_100\./i, ".");
      var hrefR = aR.href.replace(/medium/i, "big");
      var tdR = aR.parentNode;
      var linkB = document.createElement('a');
      linkB.href = hrefR;
      linkB.target = '_blank';
      linkB.appendChild(document.createTextNode('[b]'));
      tdR.appendChild(linkB);
      if(!rexb.test(srcR)) {
        var linkS = document.createElement('a');
        linkS.href = srcR;
        linkS.target = '_blank';
        linkS.appendChild(document.createTextNode('[s]'));
        tdR.appendChild(linkS);
      }
    }
  }
}

pixivlink();