// ==UserScript==
// @name         贴吧去登陆提示
// @version      0.1
// @match        http://tieba.baidu.com/p/*
// @include      http://tieba.baidu.com/*
// @exclude      http://tieba.baidu.com/i/
// ==/UserScript==

var islogin = document.createElement('script');
islogin.innerHTML = "PageData.user.is_login = true;";
document.head.appendChild(islogin); 