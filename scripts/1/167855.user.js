// ==UserScript==
// @name        楼中楼回复自动加@
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @copyright   谷哥卫士
// @updateURL      https://userscripts.org/scripts/source/167855.meta.js
// @downloadURL    https://userscripts.org/scripts/source/167855.user.js
// @icon           http://himg.bdimg.com/sys/portrait/item/ca80e8b0b7e593a5e58dabe5a3abb020
// @version     1.3

// ==/UserScript==
for(var e=document.querySelectorAll('.j_lzl_s_p'),i=e.length-1;i>-1;i--)e[i].setAttribute('data-field',e[i].getAttribute('data-field').replace('e":"','e":"@'));