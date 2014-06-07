// ==UserScript==
// @name        logusoku
// @namespace   ねこさん
// @description 2chにアクセスした時にログ速へ飛ばす
// @include     http://awabi.2ch.net/test/read.cgi*
// @version     1
// ==/UserScript==

//pageurlに現在のURLを入れる
var pageurl =window.location.href; 

var mojisu = pageurl.length;
var tes = mojisu - 40;
var suuji = pageurl.substring(40,39 + tes);
//suujiはURLの中の数字
//accessにログ速用のURLを入れる
var access = "http://logsoku.com/thread/awabi.2ch.net/mog2/" + suuji + "/";

alert(suuji);
alert(mojisu);
alert("現在のURLは" + pageurl + "です");
alert("ログ速用に変換すると" + access);

location.href = access;