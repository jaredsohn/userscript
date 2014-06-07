// ==UserScript==
// @id             豆瓣音乐下载
// @name           豆瓣音乐本周热门单曲下载
// @version        1.0
// @namespace      http://www.zfanw.com/blog
// @author         chenxsan
// @description    提供豆瓣音乐本周热门单曲下载
// @include        http://music.douban.com/
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/136144.user.js
// ==/UserScript==
$("<style type='text/css'> .yl-download{ margin-left:20px;} </style>").appendTo("head");
var dMusicButton;
var aUrl;
var re;
dMusicButton=document.createElement("a");
dText=document.createTextNode("下载");
dMusicButton.appendChild(dText);
dMusicButton.setAttribute("class","yl-download");
$("#song-chart>ul>li.clearfix>.artist").append(dMusicButton);
$("a.yl-download").each(function(){
re=/%/g;
aUrl=$(this).parent().parent().attr("data-url");
aUrl="http://"+aUrl.replace(re,"mp3");
$(this).attr("href",aUrl);
});