// ==UserScript==
// @name           QQ空间链接转换
// @namespace      http://lilydjwg.is-programmer.com/
// @description    将QQ空间链接从Javascript转换到普通链接
// @include        http://*.qzone.qq.com/*
// ==/UserScript==

var changeLinks = function(links){
  for(var i=0, len = links.length; i<len; i++){
    var link = links[i];
    if(link.href == 'javascript:;'){
      var id = link.getAttribute('onclick').match(/\d+/)[0];
      link.href = 'http://' + window.location.host + '/blog/' + id;
      console.log(link.href);
    }
  }
}

var do_it = function(){
  try{
    var links = document.getElementById('tblog').contentDocument.getElementsByClassName('blog_link');
    changeLinks(links);
    var links = document.getElementsByClassName('tx_fix');
    changeLinks(links);
  }catch(e){
    GM_log(e);
  }
}

GM_registerMenuCommand("转换js链接", do_it, '', '', 'j');