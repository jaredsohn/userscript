// ==UserScript==
// @name       快传内网链接BUG修正
// @version    1.0
// @description  修正下载自己上传的快传文件时下载链接变为内网地址的BUG
// @match      http://kuai.xunlei.com/d/*
// @copyright  2013,Allor
// ==/UserScript==

var x = document.getElementsByTagName("a");
for (var i=0;i<x.length;i++){
    if (x[i].className === "file_name general_btn_file") {
        x[i].href = x[i].href.replace(/(192.168.[0-9]{1,3}.[0-9]{1,3}|172.[0-6]{2}.[0-9]{1,3}.[0-9]{1,3}|10.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})/,x[i].href.match(/dl[0-9].t[0-9]*/)+".sendfile.vip.xunlei.com")
        i = x.length;
    }
}