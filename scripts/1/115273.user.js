// ==UserScript==
// @name LOLTW Redirector
// @namespace http://userscripts.org/users/57630
// @version 1.0
// @description 自動轉址回英雄聯盟官網
// @include http://lol.garena.tw/pre_index/*
// ==/UserScript==

function redirect(){
    window.location.href = "http://lol.garena.tw/index/index.php"
}

window.addEventListener("load", redirect, false);
