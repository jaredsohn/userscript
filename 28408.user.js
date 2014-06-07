// ==UserScript==
// @name           Expand TinyURL
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    show tooltip on TinyURL and replace href and HTML
// @include        http://*
// @include        https://*
// @author         Constellation
// ==/UserScript==
(function(){

var replaceUrl = function(nodes){
  if (!nodes) return;
  Array.forEach(nodes, function(element){
    var links = element.getElementsByTagName('a');
    if (!links) return;
    Array.forEach(links,function(link){
      if (link.href && /^http:\/\/tinyurl\.com\//.test(link.href)){
        var opt = {
          method:'get',
          url:link.href,
          link:link,
          onload:function({finalUrl:url}){
            this.link.setAttribute('title', url);
            this.link.setAttribute('href', url);
            this.link.innerHTML = url.substring(0,23)+'...';
          }
        }
      setTimeout(GM_xmlhttpRequest, 0, opt)
      }
    });
  });
}

replaceUrl([document]);
addFilter(replaceUrl);

function addFilter(f, i){
  i = i || 4
  if (window.AutoPagerize && window.AutoPagerize.addFilter) {
    window.AutoPagerize.addFilter(f);
  }else if (i > 1) {
    setTimeout(arguments.callee, 1000, f, i-1);
  }
}
})();
