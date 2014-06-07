// ==UserScript==
// @name           top100.cnDTA
// @description    top100.cn DownThemAll. 显示巨鲸音乐“下载此专辑”页面所有歌曲链接，方便你批量下载。
// @include        http://www.top100.cn/download/download.php?Productid=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyleft       Wooooo
// @version        1.0.1
// ==/UserScript==

var all = "";
$('ul.Listen_downloadtop2 li.No6 a').each(
function(){ all += "http://www.top100.cn" + $(this).attr("href") + '\n'; }
);

$("ul.Listen_downloadtop2").parent().prev().before("<textarea id='allLinks'>" + all + "</textarea>");
$("ul.Listen_downloadtop2").parent().prev().before("<style>#allLinks{-moz-transition: color 1s; color:#ccc;} #allLinks:hover{color: #000;} </style>");

$("#allLinks")
	.width("100%")
	.height(($('ul.Listen_downloadtop2 li.No6 a').length+1)*14+"px")
	.after("<h5 style='color:#E51C62'>拷贝全部链接（共 " + $('ul.Listen_downloadtop2 li.No6 a').length + " 首），用其它下载工具下载。</h5>");