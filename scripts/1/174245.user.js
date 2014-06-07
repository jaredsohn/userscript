// ==UserScript==
// @name       	    磁力工厂脚本
// @author          DotNeter
// @namespace  	    cnnovice@gmail.com
// @version    	    1.06
// @create          2013-07-26
// @lastmodified    2013-08-08
// @description     磁力工厂云点播替换
// @include         http://www.torrentmao.com/*
// @include         http://www.cilimao.com/*
// @copyright       2013+, DotNeter
// @homepage	    http://userscripts.org/scripts/show/174245
// @updateURL       https://userscripts.org/scripts/source/174245.meta.js
// @downloadURL     https://userscripts.org/scripts/source/174245.user.js
// ==/UserScript==
//免费云点播地址 
var playsite = "http://rs.huoyan.tv/index.php#!u=";

//磁力工厂云点播地址替换
if(/yun-/.test(location.href)){
    var links = document.getElementById("barframe");
    window.location.href=links.src.replace("http://vod.lixian.xunlei.com/share.html?from=un_20369&url=", playsite);
}
//增加在线观看种子
if(/bt-/.test(location.href)){
    var d = document.getElementsByClassName('mr20');
    var s = document.getElementsByClassName('btn_success');
    d[4].innerHTML = '<a class="btn btn_big btn_submit" href="'+playsite+s[0].href+'" target="_blank" >在线观看</a> ';
}