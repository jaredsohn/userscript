// ==UserScript==
// @name 知乎阅读链接加到导航条
// @include	http://www.zhihu.com/*
// @exclude http://www.zhihu.com/read
// @version 1
// @author s
// @description 知乎阅读链接加到导航条
// ==/UserScript==

this.unsafeWindow && unsafeWindow.jQuery && function($){
  $('#zg-top-nav').length && $('li.zu-top-nav-li:last').after('<li class="zu-top-nav-li "><a class="zu-top-nav-link" href="/read">阅读</a></li>')
}(unsafeWindow.jQuery);