// ==UserScript==
// @name       UCLA AutoLogon
// @namespace  gqqnbig
// @version    1.0
// @description  UCLA账户登录页面允许记住密码。
// @match      https://auth.ucla.edu/index.php
// @run-at     window-load
// @require    http://code.jquery.com/jquery-1.7.1.min.js
// @delay      100
// ==/UserScript==

$("input[type=text]").attr("autocomplete", "on");
$("input[type=password]").attr("autocomplete", "on");