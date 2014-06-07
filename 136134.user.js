// ==UserScript==
// @id             豆瓣音乐人音乐下载
// @name           豆瓣音乐人首页音乐下载
// @version        1.0
// @namespace      http://www.zfanw.com/blog
// @author         chenxsan
// @description    提供豆瓣音乐人首页音乐下载按钮
// @include        http://music.douban.com/artists/
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/136134.user.js
// ==/UserScript==
$("<style type='text/css'> .yl-download{ width:30px;float:right;} </style>").appendTo("head");
var dMusicButton;
dMusicButton=document.createElement("a");
dText=document.createTextNode("下载");
dMusicButton.appendChild(dText);
dMusicButton.setAttribute("class","yl-download");
$("ul.mbt>li.mbtrmini>div.indentrec").append(dMusicButton);
$("a.yl-download").each(function(){
var aUrl;
var re;
re=/http:\/\/mr.*\.mp3/;
aUrl=$(this).prev("object").find('param[name="movie"]').attr("value");
aUrl=aUrl.match(re);
$(this).attr("href",aUrl);
});