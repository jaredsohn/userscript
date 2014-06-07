// ==UserScript==
// @name           新浪微博增加显示原创图片
// @namespace    新浪微博
// @description    新浪微博增加显示原创图片
// @include        http://*t.sina.com.cn/*
// @include        http://*weibo.com/*
// @include        http://*t.house.sina.com.cn/*

// ==/UserScript==
var target = document.getElementById("filter_nav_panel")
var ori_link = document.getElementById("filter_nav_panel").childNodes[3];
var new_href = ori_link.href + "&filter_pic=1";
var link_obj = document.createElement("a");
link_obj.setAttribute("title", "原创图片");
link_obj.setAttribute("href", new_href);
link_obj.innerText="原创图片";
target.appendChild(link_obj);