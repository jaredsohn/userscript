// ==UserScript==
// @name       AntiTiebaLogin
// @version    0.1
// @match      http://tieba.baidu.com/p/*
// ==/UserScript==
var islogin = document.createElement('script');
islogin.innerHTML = "PageData.user.is_login = true;";
document.head.appendChild(islogin);