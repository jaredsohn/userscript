// ==UserScript==
// @author         shyangs
// @contributor    Dark Shenada
// @name           99770漫畫網修正
// @description    修正 99770漫畫網圖片、頁選單、翻頁問題
// @namespace      http://userscripts.org/scripts/show/31460
// @version        0.5
// @include        http://dm.99770.com/*
// @include        http://dm.99manga.com/*
// @include        http://*.99770.cc/*
// ==/UserScript==

////使用 location hack //// http://wiki.greasespot.net/Location_hack
location.href = "javascript:(" +function(){
    /*圖片*/
    document.getElementById("ComicPic").src=ServerList[server-1]+picurl;
    document.getElementById("ComicPic1").src=ServerList[server-1]+picurl1;
    /*頁選單*/
    document.getElementsByName("select1")[0].value=page;
    document.getElementsByName("select2")[0].value=page;
    /*下一頁*/
    document.getElementById("next").onclick=function onclick(event){page++;showpic(page);};
    document.getElementById("Submit22").onclick=function onclick(event){page++;showpic(page);};
    /*上一頁*/
    document.getElementById("prev").onclick=function onclick(event){page--;showpic(page);};
    document.getElementById("Submit2").onclick=function onclick(event){page--;showpic(page);};
} + ")()";