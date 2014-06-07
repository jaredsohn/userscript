// ==UserScript==
// @name           Douban anti-auto-scrolling
// @namespace      http://newbdez33.blogspot.com
// @description    fuck douban photos auto-scrolling
// @include        http://www.douban.com/photos/photo/*
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery 
} 

$('#pre_photo, #next_photo, .mainphoto').each(function(){ this.href = this.href.replace(/\#next\_photo$/,'') });
