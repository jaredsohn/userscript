// ==UserScript==
// @id             tieba_url_no_jump
// @name           百度贴吧不可能会跳转！
// @version        1.2
// @namespace      jiayiming
// @author         jiayiming
// @description    去除贴吧帖子里链接的跳转
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct*
// @updateURL      https://userscripts.org/scripts/source/485233.meta.js
// @downloadURL    https://userscripts.org/scripts/source/485233.user.js
// @run-at         document-end
// ==/UserScript==


window.addEventListener('DOMContentLoaded', function () {
        //var urls=document.querySelectorAll('div[id^="post_content_"]>a');
        var urls = document.querySelectorAll('a[href^="http://jump.bdimg.com/safecheck"]');
         for(var i=0;i<urls.length;i++){
                var url=urls[i].innerHTML;
                if(url.indexOf("http")<0)
                        url="http://" + urls[i].innerHTML;
                urls[i].setAttribute("href", url);
	}

}, false);