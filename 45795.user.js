// ==UserScript==
// @name           DiggBar Killer
// @namespace      http://www.shaungrady.com/
// @description    Kill the DiggBar for those who don't have a user account and/or deny Digg cookies. You'll never see the bar again. Rewrites URLs on Digg on link hover.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

var t = document.getElementById('t');
if (!!t){
  t.parentNode.removeChild(t);
  var diggiFrame = document.getElementById('diggiFrame');
  if (typeof(diggiFrame.src) === 'string'){
    location.replace(diggiFrame.src);
  }
} else {
  var anchors = document.getElementsByClassName('offsite');
  var i = anchors.length; while (i--) {
    var matched = anchors[i].href.match(/http:\/\/digg.com\/(\w{5,8})/i);
    if (!!matched){ anchors[i].addEventListener('mouseover',eventHandler,true); }
  };
}
function eventHandler(){ replaceHref(this); }
function replaceHref(target){
  var shortenedUrl = target.href.match(/http:\/\/digg.com\/(\w{5,8})/i)[1];
  if (typeof(shortenedUrl) !== 'string'){ return false; }
  GM_xmlhttpRequest({
    method: 'get',
    url: 'http://services.digg.com/url/short/'+shortenedUrl+'?type=json&appkey=http://digg.bar.killer',
    onload: function(response){
      eval('var obj = '+response.responseText);
      target.href = obj.shorturls[0].link;
      target.removeEventListener('mouseover',eventHandler,true);
    }
  });
}