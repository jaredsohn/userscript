// ==UserScript==
// @name        MSDN zh -> en
// @namespace   http://userscripts.org/users/525550
// @description Change Chinese MSDN into English by rewriting the URL
// @include     http://msdn.microsoft.com/zh-cn/*
// @version     1
// ==/UserScript==

var address = window.location.href;
address = address.replace("zh-cn", "en-us");
window.location.href = address;
