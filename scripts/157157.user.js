// ==UserScript==
// @name       LKnovel showImages
// @version    0.1
// @match      http://lknovel.lightnovel.cn/main/view/*
// @match      http://lknovel.lightnovel.cn/touch/view/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description 用于直接显示轻之国度在线小说的插图
// ==/UserScript==
$(".lazy").each(function(i){
   this.src = $(this).attr("data-original")
 });
$(".ui-line > img").removeAttr("style").css("width","600px");