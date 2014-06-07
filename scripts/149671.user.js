// ==UserScript==
// @name           github fixes
// @namespace      http://lilydjwg.is-programmer.com/ 
// @description    下载默认 gzip 格式，新建项目时使用 ssh 协议
// @include        https://github.com/*
// @version        1.4
// @grant          none
// ==/UserScript==
  
var dl = document.querySelector('[icon_class=octicon-cloud-download]');
if(!dl){
  dl = document.querySelector('a[title^=Download]');
}
if(dl){
  dl.title = dl.title.replace('zip', 'gzip');
  dl.href = dl.href.replace(/archive\/[^\/]+.zip/, 'tarball/master');
  var infotext = dl.childNodes[dl.childNodes.length-1];
  infotext.textContent = infotext.textContent.replace('ZIP', 'GZIP');
}
 
var repourl = document.querySelectorAll('.js-live-clone-url');
var re = /https:\/\/github\.com\/([^\/]+)\/(.*)/;
var span, m;
var i, len;
for(i=0, len=repourl.length; i<len; i++){
  span = repourl[i];
  m = re.exec(span.textContent);
  if(m){
    span.textContent = 'git@github.com:'+m[1]+'/'+m[2];
  }
}