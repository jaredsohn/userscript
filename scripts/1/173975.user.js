// ==UserScript==
// @name          自动删除豆列提醒
// @namespace     http://zr.is/
// @description   自动删除豆列提醒
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// @match       http://*.douban.com/*
// ==/UserScript==

$(".lnk-doulist-add").click(function() {
    setTimeout(function() {
        console.log($(".dialog-doulist .bn-flat input[type='submit']"));
    }, 500);
});