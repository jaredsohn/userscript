// ==UserScript==
// @name        TaoBao Login
// @namespace   Dary
// @include     https://login.taobao.com/*
// @include     http://login.taobao.com/*
// @description 使淘宝在登录时自动去掉"使用安全控件登录"
// @version     1
// ==/UserScript==

var safe = document.querySelector('html body.chl-reg div#page div#content div.login div#J_LoginBox.login-box div.bd div.taobao-box div#J_Static.static form#J_StaticForm div.safe span.safe-login input#J_SafeLoginCheck');

window.setTimeout(function() {safe.click()}, 1000);