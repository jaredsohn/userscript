// ==UserScript==
// @name           Ubuntu中文论坛自动登录
// @namespace      http://lilydjwg.is-programmer.com/
// @description    Ubuntu中文论坛自动登录
// @include        http://forum.ubuntu.com.cn/ucp.php?mode=login*
// @include        http://forum.ubuntu.com.cn/viewtopic.php*
// @include        http://forum.ubuntu.org.cn/ucp.php?mode=login*
// @include        http://forum.ubuntu.org.cn/viewtopic.php*
// ==/UserScript==
 
window.addEventListener("load", function(){
  setTimeout(function(){
    var links = document.querySelectorAll('a[onfocus]');
    if(links){
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window,
             0, 0, 0, 0, 0, false, false, false, false, 0, null);
      for(var i=0, len=links.length; i<len; i++){
        if(links[i].innerHTML == '展开'){
          links[i].dispatchEvent(evt);
        }
      }
    }
    if(document.querySelector('input[name=autologin]')){
      document.querySelector('input[name=autologin]').checked = true;
      document.querySelector('input[name=login]').click();
    }
  }, 1000);
}, false);