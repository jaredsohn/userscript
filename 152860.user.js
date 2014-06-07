// ==UserScript==
// @name        2chToLogsoku-Vip
// @namespace   ねこさん
// @description 2chにアクセスした時にログ速へ飛ばす
// @include		http://hayabusa.2ch.net/test/read.cgi/news4vip/*
// @version     1
// ==/UserScript==

//pageurlに現在のURLを入れる
var pageurl =window.location.href; 

var mojisu = pageurl.length;
var tes = mojisu - 47;
var suuji = pageurl.substring(47,46 + tes);
//suujiはURLの中の数字
//accessにログ速用のURLを入れる
var access = "http://www.logsoku.com/r/news4vip/" + suuji + "/";
location.href = access;