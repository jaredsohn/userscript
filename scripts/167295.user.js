// ==UserScript==
//
// @name           SMWC Search
// @description    Search bar on SMWC  
// @namespace      http://www.k3fka.net/
// @author         K3fka
// @version        1.0
//
// @include        http://www.smwcentral.net/*
// ==/UserScript==

function searchbox() {
    var cx = '002764701752847379158:enl3_er9pfa';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  };

function ReplaceContentInContainer(selector, content) {
  var nodeList = document.getElementsByClassName(selector);
  for (var i = 0, length = nodeList.length; i < length; i++) {
     nodeList[i].innerHTML = content;
  }
}

ReplaceContentInContainer("rope text right nowrap", "<gcse:searchbox-only></gcse:searchbox-only>");
searchbox();