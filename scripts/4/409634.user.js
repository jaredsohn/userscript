// ==UserScript==
// @name           YoukuAD88
// @namespace  buzhidao
// @include        
// ==/UserScript==
var bofangqi = document.getElementById("movie_player");
var tishi = document.getElementById("playBox");

if (bofangqi != undefined) {
    var dz = "http://lprmyy.dahuaddns.com:8080/antiad/loader.swf";
    bofangqi.data = dz;

    if (tishi != undefined) {
        var shijian = new Date();
        var h = shijian.getHours();
        var m = shijian.getMinutes();
        var s = shijian.getSeconds();
        var shijian_WZ = h + ":" + m + ":" + s + "秒";
        var para = document.createElement("p");
        var node = document.createTextNode("⊙o⊙_____☆优酷去广告(咿呀学语の唤生灵版)，在今天" + shijian_WZ + "的时候去掉啦☆_____⊙o⊙");
        para.appendChild(node);
        para.setAttribute("id", "wbts");
        tishi.appendChild(para);
        var wbts = document.getElementById("wbts");
        wbts.style.cssText = "color:#d2d2d2;text-align:center;font-size:110%";
        bofangqi.setAttribute("id", "bofangqi");//避免优酷js脚本暂停播放。
        bofangqi.setAttribute("height", "100%");//替换播放器第一种方法。
        //bofangqi.height = "100%";//替换播放器第二种方法。
        //bofangqi.width = "100%";//替换播放器第三种方法。
    }
}